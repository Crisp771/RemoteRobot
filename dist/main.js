"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = require("./robotconfig.json");
var amqp = require("amqplib/callback_api");
var i2c = config.environment === "robot" ? require("i2c-bus") : require("./i2c-mock");
var mpu6050 = require("i2c-mpu6050");
var RabbitSettingsFactory_1 = require("./Factories/RabbitSettingsFactory");
var DummyAttitudeDataFactory_1 = require("./Factories/DummyAttitudeDataFactory");
var txQueue = "RobotTx";
var rxQueue = "RobotRx";
var chip;
var bus;
var txChannel;
var rxChannel;
var address = 0x68;
var send;
function main(compiler) {
    console.log("Hello from " + compiler);
    init();
}
function init() {
    var that = this;
    console.log("Environment set : " + config.environment);
    console.log("Frequency set : " + config.frequency);
    amqp.connect(new RabbitSettingsFactory_1.RabbitSettingsFactory().create().url(), function (err, conn) {
        conn.createChannel(function (err, channel) {
            txChannel = channel;
            txChannel.assertQueue(txQueue, { durable: false });
            console.log(" [*] Sending messages in %s. To exit press CTRL+C", txQueue);
            if (config.environment === "robot") {
                bus = i2c.openSync(1);
                chip = new mpu6050(bus, address);
                setInterval(function () {
                    chip.read(function (err, data) {
                        ProcessData(err, data);
                    });
                }, config.frequency);
            }
            else {
                setInterval(function () {
                    ProcessData(null, new DummyAttitudeDataFactory_1.DummyAttitudeDataFactory().create());
                }, config.frequency);
            }
        });
        conn.createChannel(function (err, channel) {
            rxChannel = channel;
            rxChannel.assertQueue(rxQueue, { durable: false });
            rxChannel.consume(rxQueue, function (message) {
                console.log(message.content.toString());
                rxChannel.ack(message);
            }, { noAck: false });
        });
    });
}
function ProcessData(err, data) {
    txChannel.sendToQueue(txQueue, new Buffer(JSON.stringify(err ? err : data)));
    console.log(JSON.stringify(err ? err : data));
}
main("TypeScript");

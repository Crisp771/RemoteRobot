var config: any = require("./robotconfig.json");
import amqp = require("amqplib/callback_api");
const i2c: any = config.environment === "robot" ? require("i2c-bus") : require("./i2c-mock");
var mpu6050: any = require("i2c-mpu6050");
import { AttitudeData } from "./AttitudeData";
import { RabbitSettingsFactory } from "./Factories/RabbitSettingsFactory";
import { DummyAttitudeDataFactory } from "./Factories/DummyAttitudeDataFactory";



var queueName: string = "hello";
var chip: any;
var bus: any;
var ch: amqp.Channel;
var address: number = 0x68;
var send: (queue: string, content: Buffer) => boolean;

function main(compiler: string): void {
    console.log(`Hello from ${compiler}`);
    init();
}

function init(): void {
    var that: any = this;
    console.log(`Environment set : ${config.environment}`);
    console.log(`Frequency set : ${config.frequency}`);
    amqp.connect(new RabbitSettingsFactory().create().url(), function (err: any, conn: amqp.Connection): void {
        conn.createChannel(function (err: any, channel: amqp.Channel): void {
            ch = channel;
            ch.assertQueue(queueName, { durable: false });
            console.log(" [*] Sending messages in %s. To exit press CTRL+C", queueName);
            if (config.environment === "robot") {
                bus = i2c.openSync(1);
                chip = new mpu6050(bus, address);
                setInterval(function (): void {
                    chip.readGyro(function (err: Error, data: AttitudeData): void {
                        ProcessData(err, data);
                    });
                }, config.frequency);
            } else {
                setInterval(function (): void {
                    ProcessData(null, new DummyAttitudeDataFactory().create());
                }, config.frequency);
            }
        });
    });
}

function ProcessData(err: Error, data: AttitudeData): void {
    ch.sendToQueue(queueName, new Buffer(JSON.stringify(err ? err : data)));
    console.log(JSON.stringify(err ? err : data));
}

main("TypeScript");


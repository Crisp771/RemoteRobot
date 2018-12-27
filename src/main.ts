var config: any = require("./robotconfig.json");
import amqp = require("amqplib/callback_api");
const i2c: any = config.environment === "robot" ? require("i2c-bus") : require("./i2c-mock");
var mpu6050: any = require("i2c-mpu6050");
import { AttitudeData } from "./AttitudeData";
import { RabbitSettingsFactory } from "./Factories/RabbitSettingsFactory";
import { DummyAttitudeDataFactory } from "./Factories/DummyAttitudeDataFactory";
const LCD: any = config.environment === "robot" ? require("lcdi2c") : require("./lcd-mock");
var lcd : any =  config.environment === "robot" ? new LCD(1, 0x27, 16, 2) : null;


var txQueue: string = "RobotTx";
var rxQueue: string = "RobotRx";
var chip: any;
var bus: any;
var txChannel: amqp.Channel;
var rxChannel: amqp.Channel;
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
            txChannel = channel;
            txChannel.assertQueue(txQueue, { durable: false });
            console.log(" [*] Sending messages in %s. To exit press CTRL+C", txQueue);

            if (config.environment === "robot") {
                bus = i2c.openSync(1);
                chip = new mpu6050(bus, address);
                setInterval(function (): void {
                    chip.read(function (err: Error, data: AttitudeData): void {
                        ProcessData(err, data);
                    });
                }, config.frequency);
            } else {
                setInterval(function (): void {
                    ProcessData(null, new DummyAttitudeDataFactory().create());
                }, config.frequency);
            }
        });

        conn.createChannel(function (err: any, channel: amqp.Channel): void {
            rxChannel = channel;
            rxChannel.assertQueue(rxQueue, { durable: false });
            rxChannel.consume(rxQueue, function (message: any): any {
                if (config.environment === "robot") {
                    if(lcd === null) {
                        console.log("LCD Is Null");
                    }
                    lcd.clear();
                    lcd.print(message.content.toString());
                    console.log(message.content.toString());
                } else {
                    console.log(message.content.toString());
                }
                rxChannel.ack(message);
            }, { noAck: false });
        });
    });
}

function ProcessData(err: Error, data: AttitudeData): void {
    txChannel.sendToQueue(txQueue, new Buffer(JSON.stringify(err ? err : data)));
    // console.log(JSON.stringify(err ? err : data));
}

main("TypeScript");


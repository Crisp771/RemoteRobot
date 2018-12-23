import { Factories } from "./Factories/RabbitSettingsFactory";
import amqp = require("amqplib/callback_api");

function main(compiler: string):void {
    console.log(`Hello from ${compiler}`);
    init();
}

function init():void {
    amqp.connect(new Factories.RabbitSettingsFactory().create().url(), function(err: any, conn: amqp.Connection): void {
        conn.createChannel(function(err: any, ch: amqp.Channel): void {
            var q: string = "hello";

            ch.assertQueue(q, {durable: false});
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
            ch.consume(q, function(msg: amqp.Message):void {
              console.log(" [x] Received %s", msg.content.toString());
            }, {noAck: true});
        });
    });
}

main("TypeScript");


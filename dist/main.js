"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RabbitSettingsFactory_1 = require("./Factories/RabbitSettingsFactory");
var amqp = require("amqplib/callback_api");
function main(compiler) {
    console.log("Hello from " + compiler);
    init();
}
function init() {
    amqp.connect(new RabbitSettingsFactory_1.Factories.RabbitSettingsFactory().create().url(), function (err, conn) {
        conn.createChannel(function (err, ch) {
            var q = "hello";
            ch.assertQueue(q, { durable: false });
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
            ch.consume(q, function (msg) {
                console.log(" [x] Received %s", msg.content.toString());
            }, { noAck: true });
        });
    });
}
main("TypeScript");

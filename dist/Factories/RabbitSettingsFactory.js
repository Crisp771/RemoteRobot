"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factories;
(function (Factories) {
    var RabbitSettingsFactory = /** @class */ (function () {
        function RabbitSettingsFactory() {
        }
        RabbitSettingsFactory.prototype.create = function () {
            return {
                protocol: "amqp",
                hostname: "robotpc",
                port: 5672,
                username: "robot",
                password: "robotpwd",
                locale: "en_US",
                frameMax: 0,
                heartbeat: 0,
                vhost: "/",
                url: function () {
                    return this.protocol + "://" + this.username + ":" + this.password + "@" + this.hostname + ":" + this.port;
                }
            };
        };
        return RabbitSettingsFactory;
    }());
    Factories.RabbitSettingsFactory = RabbitSettingsFactory;
})(Factories = exports.Factories || (exports.Factories = {}));

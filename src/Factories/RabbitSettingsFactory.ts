import { Interfaces } from "../Interfaces/Factories/IRabbitSettingsFactory";
export namespace Factories {
    export class RabbitSettingsFactory implements Interfaces.IRabbitSettingsFactory {
        public create(): import("../../src/Interfaces/IRabbitSettings").Interfaces.IRabbitSettings {
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
                url: function (): string {
                    return `${this.protocol}://${this.username}:${this.password}@${this.hostname}:${this.port}`;
                }
            };
        }
    }
}
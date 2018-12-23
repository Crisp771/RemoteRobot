import { IRabbitSettingsFactory } from "../Interfaces/Factories/IRabbitSettingsFactory";
import { IRabbitSettings } from "../Interfaces/IRabbitSettings";
export class RabbitSettingsFactory implements IRabbitSettingsFactory {
    public create(): IRabbitSettings {
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
import { Interfaces } from "../IRabbitSettings";
export namespace Interfaces {
    export interface IRabbitSettingsFactory {
        create(): Interfaces.IRabbitSettings;
    }
}
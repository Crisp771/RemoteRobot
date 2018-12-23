import { IRabbitSettings } from "../IRabbitSettings";
export interface IRabbitSettingsFactory {
    create(): IRabbitSettings;
}
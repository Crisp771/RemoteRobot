import { IDummyAttitudeDataFactory } from "../Interfaces/Factories/IDummyAttitudeDataFactory";
import { AttitudeData } from "../AttitudeData";

export class DummyAttitudeDataFactory implements IDummyAttitudeDataFactory {
    public create(): AttitudeData {
        return {
            accel: {
                x: Math.floor(Math.random() * 100),
                y: Math.floor(Math.random() * 100),
                z: Math.floor(Math.random() * 100)
            },
            gyro: {
                x: Math.floor(Math.random() * 100),
                y: Math.floor(Math.random() * 100),
                z: Math.floor(Math.random() * 100)
            },
            rotation: {
                x: Math.floor(Math.random() * 100),
                y: Math.floor(Math.random() * 100)
            },
            temp: Math.floor(Math.random() * 100)
        };
    }

}
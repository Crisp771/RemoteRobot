export class GyroData {
    x: number;
    y: number;
    z: number;
}

export class RotationData {
    x: number;
    y: number;
}

export class AttitudeData {
    gyro: GyroData;
    accel: GyroData;
    rotation: RotationData;
    temp: number;
}

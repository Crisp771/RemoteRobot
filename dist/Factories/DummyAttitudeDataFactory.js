"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DummyAttitudeDataFactory = /** @class */ (function () {
    function DummyAttitudeDataFactory() {
    }
    DummyAttitudeDataFactory.prototype.create = function () {
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
    };
    return DummyAttitudeDataFactory;
}());
exports.DummyAttitudeDataFactory = DummyAttitudeDataFactory;

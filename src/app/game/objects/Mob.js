import MovableObject from './MovableObject';

export default class Mob extends MovableObject {
    constructor(ctx, x, y, direction, timeout = 0, speed = 5, radius = 30, color = 'black') {
        super(ctx, x, y, radius, color);
        this.direction = direction;
        this.speed = speed;
        this.speedDirections = {
            right: [this.speed, 0],
            left: [-this.speed, 0],
            up: [0, -this.speed],
            down: [0, this.speed]
        };
        this.isActive = true;
        this.timeout = timeout;
    }

    movement() {
        this.move(this.speedDirections[this.direction][0], this.speedDirections[this.direction][1]);
    }
}
import MovableObject from './MovableObject';

export default class Mob extends MovableObject {
    constructor(ctx, x, y, direction, timeout = 0, speed = 5, radius = 30, color = 'black') {
        super(ctx, x, y, color);
        this.direction = direction;
        this.radius = radius;
        this.speed = speed;
        this.speedDirections = {
            0: [this.speed, 0],
            2: [-this.speed, 0],
            3: [0, -this.speed],
            1: [0, this.speed]
        };
        this.timeout = timeout;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 360, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    clear() {
        this.ctx.clearRect(this.x - this.radius, this.y - this.radius, this.radius * 2 + 2, this.radius * 2 + 2);
    }

    movement() {
        setTimeout(() => {
            this.move(this.speedDirections[this.direction][0], this.speedDirections[this.direction][1]);
            if ()
            },
            this.timeout
        );
    }
}

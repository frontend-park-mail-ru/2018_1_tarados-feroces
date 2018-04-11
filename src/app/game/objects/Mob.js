import MovableObject from './MovableObject';

export default class Mob extends MovableObject {
    constructor(ctx, x, y, direction, timeout = 0, speed = 9, radius = 30, color = 'black') {
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
        const ctx = this.ctx;
        this.ctx.globalCompositeOperation = 'source-over';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 360, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    clear() {
        const ctx = this.ctx;
        this.ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius + 2, 0, 360, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        // ctx.clearRect(this.x - this.radius, this.y - this.radius, this.radius * 2 + 10, this.radius * 2 + 10);
    }

    movement() {
        setTimeout(() => {
            this.move(this.speedDirections[this.direction][0], this.speedDirections[this.direction][1]);
            },
            this.timeout
        );
    }
}

import MovableObject from './MovableObject';

export default class Player extends MovableObject {

    constructor(ctx, x, y, speed = 8, radius = 20, color = 'red') {
        super(ctx, x, y, color);
        this.radius = radius;
        this.speed = speed;
    }

    draw() {
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 360, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    clear() {
        this.ctx.clearRect(this.x - this.radius, this.y - this.radius, this.radius * 2 + 2, this.radius * 2 + 2);
    }
}

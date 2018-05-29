import MovableObject from './MovableObject';

export default class Mob extends MovableObject {
    public direction: number;
    public radius: number;
    public speed: number;
    public speedDirections: any;
    public timeout: number;

    constructor(ctx: any,
                x: number,
                y: number,
                direction: number,
                timeout: number = 0,
                speed: number = 9,
                radius: number = 30,
                color: string = 'black') {
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

    public draw(): void {
        const ctx = this.ctx;
        this.ctx.globalCompositeOperation = 'source-over';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 360, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    public clear(): void {
        const ctx = this.ctx;
        this.ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius + 2, 0, 360, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        // ctx.clearRect(this.x - this.radius, this.y - this.radius, this.radius * 2 + 10, this.radius * 2 + 10);
    }

    public movement(timestamp: any): void {
        if (timestamp + this.timeout + 500 < Date.now()) {
            this.move(this.speedDirections[this.direction][0], this.speedDirections[this.direction][1]);
        }
    }
}

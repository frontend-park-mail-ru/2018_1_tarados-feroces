import MovableObject from './MovableObject';

export default class Player extends MovableObject {

    public radius: number;
    public speed: number;
    public login: string;

    public constructor(ctx: any,
                       x: number,
                       y: number,
                       login: string,
                       color: string = 'red',
                       speed: number = 8,
                       radius: number = 30) {
        super(ctx, x, y, color);
        this.radius = radius;
        this.speed = speed;
        this.login = login;
    }

    public setCoords(x, y): Player {
        this.x = x;
        this.y = y;
        return this;
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
    }
}

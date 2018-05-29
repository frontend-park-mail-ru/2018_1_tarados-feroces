'use strict';

export default class BaseObject {
    public ctx: any;
    public x: number;
    public y: number;
    public color: string;

    constructor(ctx: any, x: number, y: number, color: string = 'black') {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.color = color;
    }

    public draw(): void {}

    public clear(): void {}
}

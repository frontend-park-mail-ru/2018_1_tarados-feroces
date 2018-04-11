'use strict';

export default class BaseObject {
    constructor(ctx, x, y, color = 'black') {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.color = color;
    }

    draw() {}

    clear() {}
}

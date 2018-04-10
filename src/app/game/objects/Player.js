import MovableObject from './MovableObject';

export default class Player extends MovableObject {
    constructor(ctx, x, y, speed = 5, radius = 20, color = 'red') {
        super(ctx, x, y, radius, color);
        this.speed = speed;
    }
}
import BaseObject from './BaseObject';

export default class MovableObject extends BaseObject {

    move(dx, dy) {
        this.clear();
        this.x += dx;
        this.y += dy;
        this.draw();
    }
}
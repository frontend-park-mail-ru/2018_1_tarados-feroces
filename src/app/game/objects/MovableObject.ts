import BaseObject from './BaseObject';

export default class MovableObject extends BaseObject {

    public move(dx, dy): void {
        this.clear();
        this.x += dx;
        this.y += dy;
        this.draw();
    }
}

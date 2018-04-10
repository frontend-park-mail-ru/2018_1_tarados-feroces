import Mob from '../objects/Mob';
import gameController from '../GameController';

export default class Wave {

    constructor(scene, ctx, mobs) {
        this.mobs = [];
        mobs.forEach((item) => {
            const [x, y] = this.countCoords(scene, scene.arena.width, scene.arena.height, item[0], item[1]);
            const mob = new Mob(ctx, x, y, item[1], item[2]);
            this.mobs.push(mob);
        });
    }

    moveBots() {
        this.mobs.forEach((item) => {
            item.movement();
        });
    }

    checkEnd() {
        this.mobs.forEach((item) => {
            if (gameController.checkBorderCollision(item, scene));
        });
    }

    countCoords(width, heigth, coord, direction) {
        const vw = width / 100;
        const vh = heigth / 100;
        switch (direction) {
            case 0: return [40, coord * vh]; // left
            case 1: return [coord * vw, 40]; // top
            case 2: return [width, coord * vh]; // right
            case 3: return [coord * vw, heigth]; // bottom
        }
    }
}

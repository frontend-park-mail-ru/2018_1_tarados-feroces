import Mob from '../objects/Mob';
import gameController from '../GameController';

export default class Wave {

    constructor(ctx, scene, mobs) {
        this.mobs = [];
        console.log(mobs);
        this.scene = scene;

        mobs.forEach((item) => {
            const [x, y] = this.countCoords(this.scene.arena.width, this.scene.arena.height, item[0], item[1]);
            const mob = new Mob(ctx, x, y, item[1], item[2]);
            this.mobs.push(mob);
        });
    }

    moveBots(timestamp) {
        this.mobs.forEach((item) => {
            item.movement(timestamp);
        });
        return !this.checkEnd();
    }

    checkEnd() {
        return this.mobs.reduce(
            (result, curr) => result && !gameController.checkMobOutOfBorder(curr, this.scene),
            true
        );
    }

    clearWave() {
        this.mobs.forEach((item) => item.clear());
    }

    countCoords(width, heigth, coord, direction) {
        const vw = width / 100;
        const vh = heigth / 100;
        switch (direction) {
            case 0: return [40, coord * vh]; // left
            case 1: return [coord * vw, 40]; // top
            case 2: return [this.scene.width - 40, coord * vh]; // right
            case 3: return [coord * vw, this.scene.height - 40]; // bottom
        }
        return [0, 0];
    }
}

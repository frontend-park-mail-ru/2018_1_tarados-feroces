import Arena from './Arena';
import Player from './Player';

export default class Scene {
    constructor(canvas, ctx) {
        this.x = 0;
        this.y = 0;
        this.width = canvas.innerWidth;
        this.height = canvas.innerHeight;
        this.ctx = ctx;
        this.arena = new Arena(ctx);
    }

    initPlayer() {
        this.player = new Player(this.ctx, 200, 200);
        this.player.draw();
    }

    clear() {
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
    }
}

import Arena from './Arena';
import Player from './Player';

export default class Scene {
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.x = 0;
        this.y = 0;
        this.width = canvas.innerWidth;
        this.height = canvas.innerHeight;
        const ctx = this.ctx;
        this.arena = new Arena(ctx);
    }

    initPlayer() {
        this.player = new Player(this.ctx, this.arena.x + this.arena.width / 2, this.arena.y + this.arena.height / 2);
        this.player.draw();
    }

    clear() {
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
    }
}

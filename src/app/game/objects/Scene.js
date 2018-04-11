import Arena from './Arena';
import Player from './Player';
import Round from '../GameEssense/Round';

export default class Scene {
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.x = 0;
        this.y = 0;
        this.width = canvas.getBoundingClientRect().width;
        this.height = canvas.getBoundingClientRect().height;
        const ctx = this.ctx;
        this.arena = new Arena(ctx);
        this.round = null;
    }

    initPlayer() {
        this.player = new Player(this.ctx, this.arena.x + this.arena.width / 2, this.arena.y + this.arena.height / 2);
        this.player.draw();
    }

    initRound(round) {
        this.round = new Round(this.ctx, this, round);
    }

    clear() {
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
    }
}

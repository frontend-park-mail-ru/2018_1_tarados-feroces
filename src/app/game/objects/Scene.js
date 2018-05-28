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
        this.players = {};
    }

    initPlayer(x = this.arena.x + this.arena.width / 2,
               y = this.arena.y + this.arena.height / 2,
               color = 'red',
               id = 0) {
        const player = new Player(this.ctx, x, y, color);
        player.draw();
        this.players[id] = player;
    }

    initRound(round) {
        this.round = new Round(this.ctx, this, round);
    }

    drawPlayers(players) {
        players.forEach((item) => this._drawItem(item, item.color));
    }

    drawMobs(mobs) {
        mobs.forEach((item) => this._drawItem(item));
    }

    update(players, mobs) {
        this.clear();
        this.drawPlayers(players);
        this.drawMobs(mobs);
    }

    _drawItem(item, color = 'black', radius = 20) {
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(item.pos.x, item.pos.y, radius, 0, 360, false);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }

    clear() {
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
    }
}
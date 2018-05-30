import Arena from './Arena';
import Player from './Player';
import Round from '../GameEssense/Round';

export default class Scene {

    public ctx: any;
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public arena: Arena;
    public round: Round;
    public players: any;

    public constructor(canvas: any) {
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

    public initPlayer(x: number = this.arena.x + this.arena.width / 2,
               y: number = this.arena.y + this.arena.height / 2,
               login: string,
               color: string = 'red',
               id: number = 0): void {
        const player = new Player(this.ctx, x, y, login, color);
        player.draw();
        this.players[id] = player;
    }

    public initRound(round: any): void {
        this.round = new Round(this.ctx, this, round);
    }

    public drawPlayers(players: any): void {
        players.forEach((item) => this._drawItem(item, item.color));
    }

    public drawMobs(mobs: any): void {
        mobs.forEach((item) => this._drawItem(item));
    }

    public update(players: any, mobs: any): void {
        this.clear();
        this.drawPlayers(players);
        this.drawMobs(mobs);
    }

    private _drawItem(item: any, color: string = 'black', radius: number = 40): void {
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(item.pos.x, item.pos.y, radius, 0, 360, false);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }

    public clear(): void {
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
    }
}
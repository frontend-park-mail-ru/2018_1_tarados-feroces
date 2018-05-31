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
    public propsX: any;
    public propsY: any;

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

    public initScene(x: number, y: number): void {
        this.propsX = this.width / x;
        this.propsY = this.height / y;
    }

    public initPlayer(login: string, x: number = this.arena.x + this.arena.width / 2,
               y: number = this.arena.y + this.arena.height / 2,
               color: string = '#fa4c2b',
               id: number = 0): void {
        const player = new Player(this.ctx, login, x, y, color);
        player.draw();
        this.players[id] = player;
    }

    public initRound(round: any): void {
        this.round = new Round(this.ctx, this, round);
    }

    public drawPlayers(players: any): void {

        players.forEach((item) => {
            this._drawItem(item, this.players[item.party_id].color);
        });
    }

    public drawMobs(mobs: any): void {
        mobs.forEach((item) => this._drawItem(item));
    }

    public update(players: any, mobs: any): void {
        this.clear();
        this.drawPlayers(players);
        // this.drawMobs(mobs);
    }

    private _drawItem(item: any, color: string = 'black', radius: number = 30): void {
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(item.pos.x * this.propsX, item.pos.y * this.propsY, radius, 0, 360,
            false);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }

    public clear(): void {
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
    }
}
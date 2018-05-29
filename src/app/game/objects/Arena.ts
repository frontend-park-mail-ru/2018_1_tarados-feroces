export default class Arena {

    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public ctx: any;

    public constructor(ctx: any) {
        const arena = document.querySelector('.game__arena');
        this.x = arena.getBoundingClientRect().x;
        this.y = arena.getBoundingClientRect().y;
        this.width = arena.getBoundingClientRect().width;
        this.height = arena.getBoundingClientRect().height;
        this.ctx = ctx;
    }

    public clear(): void {
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
    }
}

export default class Arena {
    constructor(ctx) {
        const arena = document.querySelector('.game__arena');
        this.x = arena.x;
        this.y = arena.y;
        this.width = arena.width;
        this.height = arena.height;
        this.ctx = ctx;
    }

    clear() {
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
    }
}

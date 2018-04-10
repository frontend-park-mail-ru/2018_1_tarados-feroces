export default class Arena {

    constructor(ctx) {
        const arena = document.querySelector('.game__arena');
        this.x = arena.getBoundingClientRect().x;
        this.y = arena.getBoundingClientRect().y;
        this.width = arena.getBoundingClientRect().width;
        this.height = arena.getBoundingClientRect().height;
        this.ctx = ctx;
    }

    clear() {
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
    }
}

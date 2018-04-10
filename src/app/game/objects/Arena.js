export default class Arena {
    constructor(ctx) {
        this.x = 0;
        this.y = 0;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.fieldX = 400;
        this.fieldY = 200;
        this.fieldWidth = this.width - 800;
        this.fieldHeight = this.height - 400;
        this.ctx = ctx;
    }

    clear() {
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
    }
}

export default class Scene {
    constructor(canvas, ctx) {
        this.x = 0;
        this.y = 0;
        this.width = canvas.innerWidth;
        this.height = canvas.innerHeight;
        this.ctx = ctx;
    }

    clear() {
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
    }
}

import GameCore from './index';
import

export default class OfflineGame extends GameCore {
    constructor(controller, scene) {
        super(controller, scene);

        this.state = {};
        this.gameloop = this.gameloop.bind(this);
        this.gameloopRequestId = null;
        this.lastFrame = 0;
    }

    start() {
        super.start();

    }

    gameloop() {

    }

    onControllsPressed(evt) {

    }

    onGameStarted(evt) {
        this.controller.start();
        this.scene.init(evt);
        this.scene.start();

        this.lastFrame = performance.now();
        this.gameloopRequestId = requestAnimationFrame(this.gameloop);
    }

    onGameFinished(evt) {
        cancelAnimationFrame(this.gameloopRequestId);

        bus.emit('CLOSE_GAME');
    }

    onGameStateChanged(evt) {
        this.scene.setState(evt);
    }
};

import bus from '../../modules/Bus/Bus';

const KEYS = {
    LEFT: [65],
    RIGHT: [68],
    UP: [87],
    DOWN: [83]
};

export default class GameCore {
    constructor(controller, scene) {
        this.controller = controller;
        this.scene = scene;
    }

    start() {
        bus.on('START_GAME', this.onGameStarted);
        bus.on('FINISH_GAME', this.onGameFinished);
        bus.on('CONTROLS_PRESSED', this.onControlsPressed);
    }

    destoy() {
        this.scene.stop();
        this.controller.stop();
        bus.off('START_GAME', this.onGameStarted);
        bus.off('FINISH_GAME', this.onGameFinished);
        bus.off('CONTROLS_PRESSED', this.onControlsPressed);
    }

    onControlsPressed() {}

    onGameStarted() {}

    onGameFinished() {}

    _pressed(name, data) {
        return KEYS[name].some((key) => data[key]);
    }
}

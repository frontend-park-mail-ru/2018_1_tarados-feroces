import bus from '../../modules/Bus/Bus';
import userService from "../../modules/UserService/UserService";

// const KEYS = {
//     LEFT: [65],
//     RIGHT: [68],
//     UP: [87],
//     DOWN: [83]
// };

export default class GameCore {
    constructor(controller, scene) {
        this.controller = controller;
        this.scene = scene;
    }

    start() {
        bus.on(userService.MESSAGES.INIT_GAME, this.onGameStarted);
        bus.on(userService.MESSAGES.FINISH_GAME, this.onGameFinished);
        bus.on(userService.MESSAGES.CLIENT_SNAP, this.onControlsPressed);
        bus.on(userService.MESSAGES.SERVER_SNAP, this.onGameStateChanged);
        bus.on('ROUND_COMPLETED', this.onRoundCompleted);
    }

    stop() {
        bus.off(userService.MESSAGES.INIT_GAME, this.onGameStarted);
        bus.off(userService.MESSAGES.FINISH_GAME, this.onGameFinished);
        bus.off(userService.MESSAGES.CLIENT_SNAP, this.onControlsPressed);
        bus.off(userService.MESSAGES.SERVER_SNAP, this.onGameStateChanged);
        // bus.off('WAVE_COMPLETED', this.onWaveCompleted);
        bus.off('ROUND_COMPLETED', this.onRoundCompleted);
    }

    onControlsPressed(event) {
    }

    onGameStateChanged(event) {
    }

    onGameStarted(event) {
    }

    onGameFinished(event) {
    }

    // onWaveCompleted() {
    // }

    onRoundCompleted(event) {
    }
}

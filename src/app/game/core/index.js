import bus from '../../modules/Bus/Bus';

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
        bus.on('START_GAME', this.onGameStarted);
        bus.on('FINISH_GAME', this.onGameFinished);
        bus.on('CONTROLS_PRESSED', this.onControlsPressed);
        bus.on('GAME_STATE_CHANGED', this.onGameStateChanged);
        // bus.on('WAVE_COMPLETED', this.onWaveCompleted);
        bus.on('ROUND_COMPLETED', this.onRoundCompleted);
    }

    stop() {
        bus.off('START_GAME', this.onGameStarted);
        bus.off('FINISH_GAME', this.onGameFinished);
        bus.off('CONTROLS_PRESSED', this.onControlsPressed);
        bus.off('GAME_STATE_CHANGED', this.onGameStateChanged);
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

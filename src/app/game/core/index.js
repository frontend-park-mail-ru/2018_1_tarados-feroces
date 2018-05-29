import bus from '../../modules/Bus/Bus';
import ws from '../../modules/WebSocket/WebSocket';


export default class GameCore {
    constructor(controller, scene) {
        this.controller = controller;
        this.scene = scene;
    }

    start() {
        bus.on(ws.messages.INIT_GAME, this.onGameStarted);
        bus.on(ws.messages.FINISH_GAME, this.onGameFinished);
        bus.on(ws.messages.CLIENT_SNAP, this.onControlsPressed);
        bus.on(ws.messages.SERVER_SNAP, this.onGameStateChanged);
        bus.on('ROUND_COMPLETED', this.onRoundCompleted);
    }

    stop() {
        bus.off(ws.messages.INIT_GAME, this.onGameStarted);
        bus.off(ws.messages.FINISH_GAME, this.onGameFinished);
        bus.off(ws.messages.CLIENT_SNAP, this.onControlsPressed);
        bus.off(ws.messages.SERVER_SNAP, this.onGameStateChanged);
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
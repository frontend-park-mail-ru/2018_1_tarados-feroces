import bus from '../../modules/Bus/Bus';
import ws from '../../modules/WebSocket/WebSocket';


export default class GameCore {
    public controller: any;
    public scene: any;

    public constructor(controller: any, scene: any) {
        this.controller = controller;
        this.scene = scene;
    }

    public start(): void {
        bus.on(ws.messages.INIT_GAME, this.onGameStarted);
        bus.on(ws.messages.FINISH_GAME, this.onGameFinished);
        bus.on(ws.messages.CLIENT_SNAP, this.onControlsPressed);
        bus.on(ws.messages.SERVER_SNAP, this.onGameStateChanged);
        bus.on('ROUND_COMPLETED', this.onRoundCompleted);
        bus.on('PAUSE', this.setPause);
    }

    public stop(): void {
        bus.off(ws.messages.INIT_GAME, this.onGameStarted);
        bus.off(ws.messages.FINISH_GAME, this.onGameFinished);
        bus.off(ws.messages.CLIENT_SNAP, this.onControlsPressed);
        bus.off(ws.messages.SERVER_SNAP, this.onGameStateChanged);
        // bus.off('WAVE_COMPLETED', this.onWaveCompleted);
        bus.off('ROUND_COMPLETED', this.onRoundCompleted);
    }

    public onControlsPressed(event): any {
    }

    public onGameStateChanged(event): any {
    }

    public onGameStarted(event): any {
    }

    public onGameFinished(event): any {
    }

    public setPause(): void {}

    // onWaveCompleted() {
    // }

    onRoundCompleted(event) {
    }
}
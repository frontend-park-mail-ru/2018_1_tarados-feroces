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
        bus.on(ws.messages.CLIENT_SNAP, this.onControlsPressed);
        bus.on(ws.messages.SERVER_SNAP, this.onGameStateChanged);
        bus.on(ws.messages.PAUSE, this.setPause);
        bus.on(ws.messages.END_GAME, this.onGameFinished);
        bus.on(ws.messages.DEATH, this.onPlayerDead);
    }

    public stop(): void {
        bus.off(ws.messages.INIT_GAME, this.onGameStarted);
        bus.off(ws.messages.CLIENT_SNAP, this.onControlsPressed);
        bus.off(ws.messages.SERVER_SNAP, this.onGameStateChanged);
        bus.off(ws.messages.PAUSE, this.setPause);
        bus.off(ws.messages.END_GAME, this.onGameFinished);
        bus.off(ws.messages.DEATH, this.onPlayerDead);

    }

    public onControlsPressed(event): any {}

    public onGameStateChanged(event): any {}

    public onGameStarted(event): any {}

    public onGameFinished(event): any {}

    public setPause(): void {}

    public onPlayerDead(event): void {}

    public onRoundCompleted(event) {}
}
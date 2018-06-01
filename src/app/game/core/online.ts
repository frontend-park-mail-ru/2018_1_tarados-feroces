import GameCore from './index';
import bus from '../../modules/Bus/Bus';
import ws from '../../modules/WebSocket/WebSocket';

export default class OnlineGame extends GameCore {

    public scoreUpdate: any;

    public constructor(controller: any, scene: any, scoreUpdate: any) {
        super(controller, scene);
        this.onGameStarted = this.onGameStarted.bind(this);
        this.onGameStateChanged = this.onGameStateChanged.bind(this);
        this.onControlsPressed = this.onControlsPressed.bind(this);
        this.setPause = this.setPause.bind(this);
        this.scoreUpdate = scoreUpdate;
    }

    public start(): void {
        super.start();
        this.controller.start(true);
        const pause = document.querySelector('.game__over');
        pause.classList.add('hidden');
        this.resume();
        ws.sendMessage(ws.messages.GAME_READY, {});
    }

    public setPause(): void {
        document.querySelector('.game__pause-notes').querySelector('.label-text').textContent = 'PAUSED';
        const pause = document.querySelector('.game__pause');
        pause.classList.remove('hidden');
    }

    public resume(): void {
        const pause = document.querySelector('.game__pause');
        pause.classList.add('hidden');
    }

    public onControlsPressed(event: any): void {
        const movement = {};
        movement['x'] = this.controller.keyMap['RIGHT'] ? 1 : 0 +
        this.controller.keyMap['LEFT'] ? -1 : 0;
        movement['y'] = this.controller.keyMap['UP'] ? -1 : 0 +
        this.controller.keyMap['DOWN'] ? 1 : 0;
        ws.sendMessage(ws.messages.CLIENT_SNAP, movement);
    }

    public onGameStarted(event: any): void {
        console.log('GAME INITED');
        this.controller.start();
        this.scene.initScene(event.scene);
        event.users.forEach((item) => {
            this.scene.initPlayer(item.login, item.x, item.y, item.color, item.party_id);
        });
    }

    public onGameStateChanged(event: any): void {
        const players = event.players;
        const mobs = event.mobs;
        const scorePlayers = players.map(item => {
            return {login: this.scene.players[item.party_id].login, points: item.score.points}
        });
        this.scoreUpdate(scorePlayers);
        this.scene.update(players, mobs);

    }

    public onRoundCompleted(event: any): void {

    }

    // onGameFinished(event) {
    //     bus.emit('CLOSE_GAME');
    // }
}
import GameCore from './index';
import bus from '../../modules/Bus/Bus';

export default class OnlineGame extends GameCore {
    start() {
        super.start();
        // ws.send('game-started', null);
    }

    onControlsPressed(event) {
        // ws.send(this.controller.keyMap);
    }

    onGameStarted(event) {
        this.controller.start();
        event.forEach((item) => {
            this.scene.initPlayer(item.x, item.y, item.color);
        });
    }

    onGameStateChanged(event) {
        const players = event.players;
        const mobs = event.mobs;
        this.scene.update(players, mobs);
    }

    onRoundCompleted(event) {

    }

    onGameFinished(event) {
        bus.emit('CLOSE_GAME');
    }
}

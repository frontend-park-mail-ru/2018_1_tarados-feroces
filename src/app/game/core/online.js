import GameCore from './index';
import bus from '../../modules/Bus/Bus';
import userService from '../../modules/UserService/UserService';
import {WS_ADDRESS} from '../../modules/HttpModule/HttpConstants';

export default class OnlineGame extends GameCore {
    start() {
        super.start();
        // this.ws = new Ws(WS_ADDRESS);
        // this.ws.send('game-started', null);
    }

    onControlsPressed(event) {
        // this.ws.send(this.controller.keyMap);
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

import GameCore from './index';
import bus from '../../modules/Bus/Bus';
import ws from '../../modules/WebSocket/WebSocket';
import userService from '../../modules/UserService/UserService';

export default class OnlineGame extends GameCore {

    constructor(controller, scene) {
        super(controller, scene);
        this.onGameStarted = this.onGameStarted.bind(this);
        this.onGameStateChanged = this.onGameStateChanged.bind(this);
        this.onControlsPressed = this.onControlsPressed.bind(this);
    }

    start() {
        super.start();
        this.controller.start(true);
        console.log('watahell');
        ws.sendMessage(userService.MESSAGES.GAME_READY, {});
    }

    onControlsPressed(event) {
        const movement = {};
        movement.x = this.controller.keyMap['RIGHT'] ? 1 : 0 +
                        this.controller.keyMap['LEFT'] ? -1 : 0;
        movement.y = this.controller.keyMap['UP'] ? -1 : 0 +
                        this.controller.keyMap['DOWN'] ? 1 : 0;
        ws.sendMessage(userService.MESSAGES.CLIENT_SNAP, movement);
    }

    onGameStarted(event) {
        console.log('GAME INITED');
        this.controller.start();
        event.users.forEach((item) => {
            this.scene.initPlayer(item.x, item.y, item.color, item.party_id);
        });
    }

    onGameStateChanged(event) {
        const players = event.players;
        // console.log(players);
        const mobs = event.mobs;
        this.scene.update(players, mobs);
    }

    onRoundCompleted(event) {

    }

    onGameFinished(event) {
        bus.emit('CLOSE_GAME');
    }
}

import GameCore from './index';
import bus from '../../modules/Bus/Bus';
import ws from '../../modules/WebSocket/WebSocket';
import userService from "../../modules/UserService/UserService";

export default class OnlineGame extends GameCore {

    constructor(controller, scene) {
        super(controller, scene);
        this.gameLoop = this.gameLoop.bind(this);
        this.gameLoopId = null;
    }

    start() {
        super.start();
    }

    onControlsPressed(event) {
        const movement = {};
        movement.x = this.controller.keyMap['RIGHT'] ? 1 : 0 +
                        this.controller.keyMap['LEFT'] ? -1 : 0;
        movement.y = this.controller.keyMap['UP'] ? 1 : 0 +
                        this.controller.keyMap['DOWN'] ? -1 : 0;

        ws.sendMessage(userService.MESSAGES.CLIENT_SNAP, movement);
    }

    onGameStarted(event) {
        console.log('GAME INITED');
        console.log(event);
        this.controller.start();
        event.users.forEach((item) => {
            this.scene.initPlayer(item.x, item.y, `rgb(${item.color.red}, ${item.color.green}, ${item.color.blue})`);
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

    gameLoop() {
        this.gameLoopId = requestAnimationFrame(this.gameLoop);
        bus.emit(userService.MESSAGES.CLIENT_SNAP);
    }
}

import {checkBorderCollision, checkBotCollision} from './handlers';

class GameController {
    constructor() {
        this.keyMap = {};
        this.KEYS = {
            LEFT: [65],
            RIGHT: [68],
            UP: [87],
            DOWN: [83]
        };
    }

    start() {
        onkeypress = onkeyup = (event) => {
            let direction = '';
            for (const key in Object.keys(this.KEYS)) {
                if (this.KEYS[key].contains(event.keyCode)) {
                    direction = key;
                }
            }
            this.keyMap[direction] = (event.type === 'keypress' || event.type === 'keydown');
        };

        window.addEventListener('keypress', onkeypress);

        window.addEventListener('keyup', onkeyup);

    }

    movementControl(player) {
        let x = 0;
        let y = 0;
        if (keyMap['RIGHT']) {
            x += player.speed;
        }
        if (keyMap['LEFT']) {
            x -= player.speed;
        }
        if (keyMap['DOWN']) {
            y += player.speed;
        }
        if (keyMap['UP']) {
            y -= player.speed;
        }

        if (!checkBorderCollision(player.x + x, player.y + y, player.radius)) {
            player.move(-x, -y);

            return true;
        }

        player.move(x, y);
        return checkBotCollision(player);
    };

    stop() {
        window.removeEventListener('keypress', onkeypress);
        window.removeEventListener('keyup', onkeyup);
        this.keyMap = {};
    }
}

const gameController = new GameController();
export default gameController;

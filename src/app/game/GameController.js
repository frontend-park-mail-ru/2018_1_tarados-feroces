class GameController {

    constructor() {
        this.keyMap = {};
        window.KEYS = {
            LEFT: [65],
            RIGHT: [68],
            UP: [87],
            DOWN: [83]
        };
    }

    start() {
        window.addEventListener('keypress', (event) => this.checkKeys(event));
        window.addEventListener('keyup', (event) => this.checkKeys(event));
    }

    checkKeys(event) {
        let direction = '';

        for (let key in Object.keys(window.KEYS)) {
            if (window.KEYS[Object.keys(window.KEYS)[key]].includes(event.keyCode)) {
                direction = Object.keys(window.KEYS)[key];
                break;
            }
        }
        this.keyMap[direction] = (event.type === 'keypress' || event.type === 'keydown');
    };

    checkBorderCollision(object, field) {
        // console.log('object: ', object);
        // console.log('scene: ', field);
        return !(
            object.x - object.radius <= field.x ||
            object.x + object.radius >= field.x + field.width ||
            object.y - object.radius <= field.y ||
            object.y + object.radius >= field.y + field.height
        );
    };

    checkBotCollision(player) {
        let result = true;
        round.bots.forEach((item) => {
            const dx = item.x - player.x;
            const dy = item.y - player.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if ( dist < (item.radius + player.radius) ) {
                result = false;
            }
        });

        return result;
    };

    movementControl(player, arena) {
        let x = 0;
        let y = 0;
        if (this.keyMap['RIGHT']) {
            x += player.speed;
        }
        if (this.keyMap['LEFT']) {
            x -= player.speed;
        }
        if (this.keyMap['DOWN']) {
            y += player.speed;
        }
        if (this.keyMap['UP']) {
            y -= player.speed;
        }

        if (!this.checkBorderCollision(player, arena)) {
            player.move(-x, -y);

            return true;
        }

        player.move(x, y);
        // return checkBotCollision(player);
        return true;
    };

    stop() {
        window.removeEventListener('keypress', this.checkKeys);
        window.removeEventListener('keyup', this.checkKeys);
        this.keyMap = {};
    }
}

const gameController = new GameController();
export default gameController;

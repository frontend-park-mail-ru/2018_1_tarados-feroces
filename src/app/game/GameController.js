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

        for (const key in Object.keys(window.KEYS)) {
            if (window.KEYS[Object.keys(window.KEYS)[key]].includes(event.keyCode)) {
                direction = Object.keys(window.KEYS)[key];
                break;
            }
        }
        this.keyMap[direction] = (event.type === 'keypress' || event.type === 'keydown');
    }

    checkBorderCollision(object, field) {
        return !(
            object.x - object.radius <= field.x ||
            object.x + object.radius >= field.x + field.width ||
            object.y - object.radius <= field.y ||
            object.y + object.radius >= field.y + field.height
        );
    }

    checkMobOutOfBorder(object, field) {
        const result = !(
            object.x + object.radius <= field.x ||
            object.x - object.radius >= field.x + field.width ||
            object.y + object.radius <= field.y ||
            object.y - object.radius >= field.y + field.height
        );

        if (!result) {
            object.clear();
        }
        return result;
    }

    checkBotCollision(player, wave) {
        let result = true;
        wave.mobs.forEach((item) => {
            const dx = item.x - player.x;
            const dy = item.y - player.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if ( dist < (item.radius + player.radius) ) {
                result = false;
            }
        });

        return result;
    }

    movementControl(player, arena, wave) {
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

        player.x += x;
        player.y += y;

        const collision = !this.checkBorderCollision(player, arena);

        player.x -= x;
        player.y -= y;

        if (collision) {
            player.move(-x, -y);
        } else {
            player.move(x, y);
        }

        return this.checkBotCollision(player, wave);
    }

    stop() {
        window.removeEventListener('keypress', this.checkKeys);
        window.removeEventListener('keyup', this.checkKeys);
        this.keyMap = {};
    }
}

const gameController = new GameController();
export default gameController;

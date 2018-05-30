import ws from '../modules/WebSocket/WebSocket';
import bus from '../modules/Bus/Bus';

class GameController {

    public keyMap: any;
    public KEYS: any;

    public constructor() {
        this.keyMap = {};
        this.KEYS = {
            LEFT: [65, 37],
            RIGHT: [68, 39],
            UP: [87, 38],
            DOWN: [83, 40],
            ESC: [27]
        };

    }

    public start(online: any): void {
        window.addEventListener('keypress', (event) => this.checkKeys(event, online));
        window.addEventListener('keydown', (event) => this.checkKeys(event, online));
        window.addEventListener('keyup', (event) => this.checkKeys(event, online));
        const controls = Array.from(document.getElementsByClassName('controllers'));
        controls.forEach((item) => {
            item.addEventListener('touchstart', () => {
                const className = item.classList[1];
                switch (className) {
                    case 'controllers__right':
                        this.keyMap['RIGHT'] = true;
                        break;
                    case 'controllers__up':
                        this.keyMap['UP'] = true;
                        break;
                    case 'controllers__down':
                        this.keyMap['DOWN'] = true;
                        break;
                    case 'controllers__left':
                        this.keyMap['LEFT'] = true;
                        break;
                }
            });
        });
        controls.forEach((item) => {
            item.addEventListener('touchend', () => {
                const className = item.classList[1];
                switch (className) {
                    case 'controllers__right':
                        this.keyMap['RIGHT'] = false;
                        break;
                    case 'controllers__up':
                        this.keyMap['UP'] = false;
                        break;
                    case 'controllers__down':
                        this.keyMap['DOWN'] = false;
                        break;
                    case 'controllers__left':
                        this.keyMap['LEFT'] = false;
                        break;
                }
            });
        });
    }

    public checkKeys(event: any, online: any): void {
        let direction = '';

        if (this.KEYS['ESC'].includes(event.keyCode) && event.type === 'keydown') {
            console.log('esc');
            console.log(online);
            bus.emit('PAUSE', {});
            return;
        }

        console.log(event.type, '-->', event.keyCode);

        for (const key in this.KEYS) {
            if (this.KEYS[key].includes(event.keyCode)) {
                direction = key;
                break;
            }
        }
        if (direction) {
            this.keyMap[direction] = (event.type === 'keypress' || event.type === 'keydown');
        }

        online && bus.emit(ws.messages.CLIENT_SNAP, {});

    }

    public checkBorderCollision(object: any, field: any): boolean {
        return object.x - object.radius > field.x &&
            object.x + object.radius < field.x + field.width &&
            object.y - object.radius > field.y &&
            object.y + object.radius < field.y + field.height;
    }

    public checkMobOutOfBorder(object: any, field: any): boolean {
        const result = this.checkBorderCollision(object, field);

        if (!result) {
            object.clear();
        }
        return result;
    }

    public checkBotCollision(player: any, wave: any): boolean {
        let result = true;

        wave.mobs.forEach((item) => {
            result = result &&
                (Math.pow((item.x - player.x), 2) +
                    Math.pow((item.y - player.y), 2) >= Math.pow((item.radius + player.radius), 2));
        });

        return result;
    }

    public movementControl(player: any, arena: any, wave: any): boolean {
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

        if (x !== 0 && y !== 0) {
            x *= Math.SQRT1_2; // It is real JS const!
            y *= Math.SQRT1_2;
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

    public stop(): void {
        // window.removeEventListener('keypress', this.checkKeys);
        // window.removeEventListener('keyup', this.checkKeys);
        // this.keyMap = {};
    }
}

const gameController = new GameController();
export default gameController;
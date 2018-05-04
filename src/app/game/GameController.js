class GameController {

    constructor() {
        this.keyMap = {};
        this.KEYS = {
            LEFT: [65, 37],
            RIGHT: [68, 39],
            UP: [87, 38],
            DOWN: [83, 40]
        };

    }

    start() {
        window.addEventListener('keypress', (event) => this.checkKeys(event));
        window.addEventListener('keydown', (event) => this.checkKeys(event));
        window.addEventListener('keyup', (event) => this.checkKeys(event));
        const controls = [...document.getElementsByClassName('controllers')];
        controls.forEach((item) => {
            item.addEventListener('touchstart', () => {
                const className = item.classList[1];
                console.log(className);
                let keycode = 10;
                switch (className) {
                    case 'controllers__right':
                        keycode = 68;
                        break;
                    case 'controllers__top':
                        keycode = 87;
                        break;
                    case 'controllers__bottom':
                        keycode = 83;
                        break;
                    case 'controllers__left':
                        keycode = 65;
                        break;
                }
                const keyboardEvent = document.createEvent('KeyboardEvent');
                const initMethod =
                    typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? 'initKeyboardEvent' : 'initKeyEvent';
                keyboardEvent[initMethod](
                    'keydown', // event type : keydown, keyup, keypress
                    true, // bubbles
                    true, // cancelable
                    window, // viewArg: should be window
                    false, // ctrlKeyArg
                    false, // altKeyArg
                    false, // shiftKeyArg
                    false, // metaKeyArg
                    keycode, // keyCodeArg : unsigned long the virtual key code, else 0
                    0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
                );
                document.dispatchEvent(keyboardEvent);
            });
        });
    }

    checkKeys(event) {
        let direction = '';

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
    }

    checkBorderCollision(object, field) {
        return object.x - object.radius > field.x &&
            object.x + object.radius < field.x + field.width &&
            object.y - object.radius > field.y &&
            object.y + object.radius < field.y + field.height;
    }

    checkMobOutOfBorder(object, field) {
        const result = this.checkBorderCollision(object, field);

        if (!result) {
            object.clear();
        }
        return result;
    }

    checkBotCollision(player, wave) {
        let result = true;

        wave.mobs.forEach((item) => {
            result = result &&
                (Math.pow((item.x - player.x), 2) +
                 Math.pow((item.y - player.y), 2) >= Math.pow((item.radius + player.radius), 2));
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

    stop() {
        window.removeEventListener('keypress', this.checkKeys);
        window.removeEventListener('keyup', this.checkKeys);
        this.keyMap = {};
    }
}

const gameController = new GameController();
export default gameController;

import GameCore from './index';

export default class OfflineGame extends GameCore {
    constructor(controller, scene) {
        super(controller, scene);

        this.state = {};
        this.gameloop = this.gameloop.bind(this);
        this.gameloopRequestId = null;
        this.lastFrame = 0;
    }

    start() {
        super.start();
        this.state = {
            bullets: [],
            me: {
                coll: 2
            }
        };

        this.state.items = Array.from(new Array(3 * 5), function (_, position) {
            return {
                coll: position % 5,
                row: position < 5 ? 0 : (position / 5) | 0,
                dead: false,
                fadeSpeed: 0,
                fadeLevel: 0
            };
        });

        setTimeout(function() {
            bus.emit(events.START_GAME, this.state);
        }.bind(this));
    }

    gameloop() {

    }

    onControllsPressed(evt) {

    }

    onGameStarted(evt) {
        this.controller.start();
        this.scene.init(evt);
        this.scene.start();

        this.lastFrame = performance.now();
        this.gameloopRequestId = requestAnimationFrame(this.gameloop);
    }

    onGameFinished(evt) {
        cancelAnimationFrame(this.gameloopRequestId);

        bus.emit('CLOSE_GAME');
    }

    onGameStateChanged(evt) {
        this.scene.setState(evt);
    }
};

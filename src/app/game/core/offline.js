import GameCore from './index';

export default class OfflineGame extends GameCore {
    constructor(controller, scene) {
        super(controller, scene);
        let currentRound = null;
    }

    start() {
        super.start();
        this.gameloop();
    }

    nextRound(round) {
        this.currentRound = round;
        this.gameloop();
    }

    gameloop() {
        const animation = requestAnimationFrame(this.gameLoop);
        arena.clear();
        arena.draw();
        if (!movementControl(player)) {
            cancelAnimationFrame(animation);
            const anotherGame = confirm('You died!!! Do you want to play again?');
            anotherGame ? window.location.reload() : window.location.href = '../main-page/main-page.html';
        }

        round.bots.forEach((bot) => {
            if (bot.isActive) {
                bot.movement();
            }

        });
        round.checkBots();
        if (round.bots.length === 0) {
            if (!round.initWave()) {
                cancelAnimationFrame(animation);
                const anotherGame = confirm('You won!!! Do you want to play again?');
                anotherGame ? window.location.reload() : window.location.href = '../main-page/main-page.html';
            }
        }
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
};

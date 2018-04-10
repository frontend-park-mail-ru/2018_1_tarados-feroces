import GameCore from './index';

export default class OfflineGame extends GameCore {
    constructor(controller, scene) {
        super(controller, scene);
        this.rounds = [];
        this.currentRound = 0;
    }

    start() {
        super.start();
        this.scene.initPlayer();
        this.gameloop();
    }

    saveRounds(rounds) {
        this.rounds = rounds;
    }

    nextRound() {
        if (this.rounds.length < this.currentRound) {
            return false;
        }
        this.scene.initRound(this.rounds[this.currentRound]);
        this.currentRound += 1;
        return true;
    }

    gameloop() {
        const animation = requestAnimationFrame(this.gameLoop);

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

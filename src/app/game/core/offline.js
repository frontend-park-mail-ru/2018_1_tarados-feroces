import GameCore from './index';
import gameController from '../GameController';
import router from '../../modules/Router/Router';

export default class OfflineGame extends GameCore {
    constructor(controller, scene) {
        super(controller, scene);
        this.rounds = [];
        this.currentRound = 0;
        this.gameLoop = this.gameLoop.bind(this);
        this.start = this.start.bind(this);
    }

    start() {
        super.start();
        this.scene.initPlayer();
        this.nextRound();
        this.gameLoop();
    }

    stop() {
        super.stop();
    }

    saveRounds(rounds) {
        this.rounds = rounds;
    }

    checkEndOfRounds() {
        if (this.rounds.length <= this.currentRound) {
            return false;
        }
        return true;
    }

    nextRound() {
        document.querySelector('.game__title-text')
            .querySelector('.label-text').textContent = `round ${this.currentRound}`;
        setTimeout(() => {
            this.scene.initRound(this.rounds[this.currentRound]);
            this.currentRound += 1;
        }, 2000);
    }

    gamePaused(message) {
        document.querySelector('.game__pause-notes').querySelector('.label-text').textContent = message;
        const pause = document.querySelector('.game__pause');
        pause.classList.remove('hidden');
    }

    gameLoop() {
        let animation = requestAnimationFrame(this.gameLoop);

        const currentWave = this.scene.round.waves[this.scene.round.waveCounter];
        if (!gameController.movementControl(this.scene.player, this.scene.arena, currentWave)) {
            cancelAnimationFrame(animation);
            this.stop();
            this.gamePaused('GAME OVER');
        }

        if (!this.scene.round.iterateWave()) {
            currentWave.clearWave();
            if (!this.scene.round.nextWave()) {
                if (!this.checkEndOfRounds()) {
                    cancelAnimationFrame(animation);
                    this.stop();
                    this.gamePaused('VICTORY');

                }
                cancelAnimationFrame(animation);
                this.nextRound();
                animation = requestAnimationFrame(this.gameLoop);
            }
        }
    }
};

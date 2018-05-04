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
        this.gameLoopId = null;
    }

    start() {
        super.start();
        this.controller.start();
        this.scene.initPlayer();
        this.nextRound();
        this.gameLoopId = requestAnimationFrame(this.gameLoop);
    }

    stop() {
        super.stop();
        this.controller.stop();
        cancelAnimationFrame(this.gameLoopId);
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
            .querySelector('.label-text').textContent = `Round ${this.currentRound}`;
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
        this.gameLoopId = requestAnimationFrame(this.gameLoop);

        const currentWave = this.scene.round.waves[this.scene.round.waveCounter];

        if (!gameController.movementControl(this.scene.players[0], this.scene.arena, currentWave)) {
            this.stop();
            this.gamePaused('GAME OVER');
            this.gameLoopId = null;
            return;
        }

        if (this.scene.round.iterateWave()) {
            return;
        }
        currentWave.clearWave();

        if (this.scene.round.nextWave()) {
            return;
        }
        if (!this.checkEndOfRounds()) {
            this.stop();
            this.gamePaused('VICTORY');
            this.gameLoopId = null;
            return;

        }
        this.nextRound();
    }
};

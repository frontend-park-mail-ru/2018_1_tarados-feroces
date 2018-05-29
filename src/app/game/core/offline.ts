import GameCore from './index';
import gameController from '../GameController';

export default class OfflineGame extends GameCore {

    public rounds: any;
    public currentRound: number;
    public gameLoopId: any;
    public scoreUpdate: any;
    public currentPoints: number;

    public constructor(controller, scene, scoreUpdate) {
        super(controller, scene);
        this.rounds = [];
        this.currentRound = 0;
        this.gameLoop = this.gameLoop.bind(this);
        this.start = this.start.bind(this);
        this.gameLoopId = null;
        this.scoreUpdate = scoreUpdate;
        this.currentPoints = 0;
    }

    public start(): void {
        super.start();
        this.controller.start();

        this.scene.initPlayer();
        this.nextRound();
        this.gameLoopId = requestAnimationFrame(this.gameLoop);
    }

    public stop(): void {
        super.stop();
        this.controller.stop();
        cancelAnimationFrame(this.gameLoopId);
    }

    public saveRounds(rounds: any): void {
        this.rounds = rounds;
    }

    public checkEndOfRounds(): boolean {
        return this.rounds.length > this.currentRound;
    }

    public nextRound(): void {
        document.querySelector('.game__title-text')
            .querySelector('.label-text').textContent = `Round ${this.currentRound}`;
        setTimeout(() => {
            this.scene.initRound(this.rounds[this.currentRound]);
            this.currentRound += 1;
        }, 2000);
    }

    public gamePaused(message: string): void {
        document.querySelector('.game__pause-notes').querySelector('.label-text').textContent = message;
        const pause = document.querySelector('.game__pause');
        pause.classList.remove('hidden');
    }

    public gameLoop(): void {
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
            this.currentPoints += 1;

            this.scoreUpdate([
                {login: 'anton', points: this.currentPoints},
                {login: 'danya', points: this.currentPoints},
            ]);
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

import GameCore from './index';
import gameController from '../GameController';

export default class OfflineGame extends GameCore {

    public rounds: any;
    public currentRound: number;
    public gameLoopId: any;
    public scoreUpdate: any;
    public currentPoints: number;
    public player: any;
    public paused: boolean;

    public constructor(controller: any, scene: any, player: any, scoreUpdate: any) {
        super(controller, scene);
        this.rounds = [];
        this.currentRound = 0;
        this.gameLoop = this.gameLoop.bind(this);
        this.start = this.start.bind(this);
        this.setPause = this.setPause.bind(this);

        this.gameLoopId = null;
        this.scoreUpdate = scoreUpdate;
        this.player = player;
        this.paused = false;
    }

    public start(): void {
        super.start();

        this.controller.start(false);
        this.restartGame();
        this.scene.initPlayer(this.player.login);

        this.nextRound();
        this.gameLoopId = requestAnimationFrame(this.gameLoop);
    }

    public stop(): void {
        super.stop();
        this.controller.stop();
        cancelAnimationFrame(this.gameLoopId);
    }

    public restartGame(): void {
        this.scene.clear();
        this.currentPoints = 0;

        this.scoreUpdate([
            {
                login: this.player, points: 0
            }]
        );
        const pause = document.querySelector('.game__over');
        pause.classList.add('hidden');
        this.resume();
    }

    public gameOver(message: string): void {
        document.querySelector('.game__over-notes').querySelector('.label-text').textContent = message;
        const pause = document.querySelector('.game__over');
        pause.classList.remove('hidden');
    }

    public setPause(): void {
        console.log('PAUSED');
        document.querySelector('.game__pause-notes').querySelector('.label-text').textContent = 'PAUSED';
        const pause = document.querySelector('.game__pause');
        pause.classList.remove('hidden');
        this.paused = true;
    }

    public resume(): void {
        const pause = document.querySelector('.game__pause');
        pause.classList.add('hidden');
        this.paused = false;
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

    public gameLoop(): void {
        this.gameLoopId = requestAnimationFrame(this.gameLoop);
        if (this.paused) {
            return;
        }

        const currentWave = this.scene.round.waves[this.scene.round.waveCounter];

        if (!gameController.movementControl(this.scene.players[0], this.scene.arena, currentWave)) {
            this.stop();
            this.gameOver('GAME OVER');
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
                {
                    login: this.player, points: this.currentPoints
                }]

            );
            return;
        }
        if (!this.checkEndOfRounds()) {
            this.stop();
            this.gameOver('VICTORY');
            this.gameLoopId = null;
            return;

        }
        this.nextRound();
    }
};

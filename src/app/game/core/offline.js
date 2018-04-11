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

    saveRounds(rounds) {
        this.rounds = rounds;
    }

    nextRound() {
        if (this.rounds.length <= this.currentRound) {
            return false;
        }
        this.scene.initRound(this.rounds[this.currentRound]);
        this.currentRound += 1;
        return true;
    }

    gameLoop() {
        const animation = requestAnimationFrame(this.gameLoop);

        if (!gameController.movementControl(this.scene.player, this.scene.arena)) {
            cancelAnimationFrame(animation);
            const anotherGame = confirm('You died!!! Do you want to play again?');
            anotherGame ? router.go('/game/') : router.go('/');
        }

        if (!this.scene.round.iterateWave()) {
            if (!this.scene.round.nextWave()) {
                if (!this.nextRound()) {
                    cancelAnimationFrame(animation);
                    const anotherGame = confirm('You won!!! Do you want to play again?');
                    anotherGame ? router.go('/game/') : router.go('/');
                }
            }
        }
    }
};

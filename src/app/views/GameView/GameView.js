import './GameView.scss';
import BaseView from '../BaseView/BaseView';
import Game from '../../game/core/offline';
import gameController from '../../game/GameController';
import Scene from '../../game/objects/Scene';
import router from '../../modules/Router/Router';

export default class GameView extends BaseView {

    constructor() {
        super();
        this.game = null;
        this.canvas = null;
    }

    create() {
        this.canvas = document.querySelector('.game__battleground-canvas');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        const pause = document.querySelector('.game__pause');
        pause.classList.add('hidden');

        this.doGame();
    }

    doGame() {
        const scene = new Scene(this.canvas);
        gameController.start();
        this.game = new Game(gameController, scene);

        // 0 - transform, 1 - direction, 2 - timeout
        const rounds = [
            [
                [[25, 0, 0], [55, 1, 200], [55, 2, 0], [55, 3, 400]],
                [[25, 0, 0], [55, 1, 200], [55, 2, 0], [55, 3, 400]]
            ],
            [
                [[25, 0, 0], [55, 1, 200], [55, 2, 0], [55, 3, 400]],
                [[25, 0, 0], [55, 1, 200], [55, 2, 0], [55, 3, 400]]
            ]
        ];
        this.game.saveRounds(rounds);

        this.game.start();
    }

    needUpdate() {
        return true;
    }

    needAuthorization() {
        return false;
    }

    render() {
        return this.template = require('./GameView.handlebars');
    }
}

window.exitGame = () => {
    router.go('/');
};

import './GameView.scss';
import BaseView from '../BaseView/BaseView';
import Game from '../../game/core/offline';
import gameController from '../../game/GameController';
import Scene from '../../game/objects/Scene';

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
        this.doGame();
    }

    doGame() {
        const scene = new Scene(this.canvas);
        gameController.start();
        this.game = new Game(gameController, scene);
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


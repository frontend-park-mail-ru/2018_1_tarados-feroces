import './GameView.scss';
import BaseView from '../BaseView/BaseView';
import Game from '../../game/core/offline';
import Controller from '../../game/controllers';
import Scene from '../../game/objects/Scene';

export default class GameView extends BaseView {

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

window.initGame = () => {
    const canvas = document.querySelector('.game__battleground-canvas');
    const controller = new Controller();
    const scene = new Scene(canvas);
    window.game = new Game(scene, controller);
    game.start();
    const button = document.querySelector('.init-button');
    button.classList.add('hidden');
};

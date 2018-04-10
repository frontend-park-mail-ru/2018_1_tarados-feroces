import './GameView.scss';
import BaseView from '../BaseView/BaseView';

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

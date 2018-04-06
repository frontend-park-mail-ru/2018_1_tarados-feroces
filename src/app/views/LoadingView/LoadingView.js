import BaseView from '../BaseView/BaseView';

export default class LoadingView extends BaseView {

    render() {
        this.template = require('./LoadingView.handlebars');
    }
}

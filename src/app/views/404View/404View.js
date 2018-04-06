import BaseView from '../BaseView/BaseView'


export default class _404View extends BaseView {
    render() {
        this.template = require('./404View.handlebars');
    }
}

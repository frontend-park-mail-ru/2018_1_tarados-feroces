import BaseView from '../BaseView/BaseView'

export default class LoadingView extends BaseView {

    render() {
        return `<div class="loader">
                    <div class="loading__spin"></div>
                </div>`;
    }
}

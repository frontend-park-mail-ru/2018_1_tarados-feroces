import BaseView from '../BaseView/BaseView'

export default class LoadingView extends BaseView {

    render() {
        return `<div class="loading">
                    <div class="loading__data">
                        <p class="loading__data-value">Loading...</p>
                    </div>
                </div>`;
    }
}

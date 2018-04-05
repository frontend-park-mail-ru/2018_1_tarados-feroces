import BaseView from '../BaseView/BaseView'
import httpModule from '../../modules/HttpModule/HttpModule'
import router from '../../modules/Router/Router'

export default class LeaderboardView extends BaseView {

    update(context = {}) {
        for (const row in Object.keys(context.data)) {
            const newRow = [];
            newRow.push(context.data[row].user.login);
            newRow.push(context.data[row].score.points);
            this.context.rows.push(newRow);
        }
    }

    needUpdate() {
        return true;
    }

    preRender() {
        const points = [...document.getElementsByClassName('modal-header__point')];
        points.forEach((item) => {
            item.classList.remove('modal-header__point_active');
        });
        const score = document.querySelector('.leaderboard');
        score.classList.add('modal-header__point_active');

        return httpModule.doPost('/leadertable', {position: 0, count: 5}).then(
            (response) => {
                this.context.rows = [];
                this.context.headers = ['Login', 'Points'];
                for (const row in Object.keys(response.data)) {
                    const newRow = [];
                    newRow.push(response.data[row].user.login);
                    newRow.push(response.data[row].score.points);

                    this.context.rows.push(newRow);
                }
            }
        );
    }

    render() {
        return `<div class="scoreboard">
                    <div class="table">
                        <div class="table__header-row">
                            {{#each headers}}
                            <div class="table__header">{{this}}</div>
                            {{/each}}
                        </div>
                        {{#each rows}}
                        <div class="table__row">
                            {{#each this}}
                            <div class="table__data">{{this}}</div>
                            {{/each}}
                        </div>
                        {{/each}}
                    </div>
                    <div class="scoreboard__pagination">
                        <div class="back button button_no-animation">
                            <p class="button__value">Back</p>
                        </div>
                        <div class="next button button_no-animation">
                            <p class="button__value">Next</p>
                        </div>
                    </div>
                </div>`;
    }
}

window.currentPosition = 5;

window.paginate = (index) => {
    const paginationConstant = 5;
    httpModule.doPost('/score', {position: index, count: paginationConstant}).then(
        (response) => router.viewUpdate(response)
    );
    window.currentPosition += paginationConstant;
};
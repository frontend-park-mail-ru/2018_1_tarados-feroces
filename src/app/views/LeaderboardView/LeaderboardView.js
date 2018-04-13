import './LeaderboardView.scss';
import '../../../static/css/table.scss';
import BaseView from '../BaseView/BaseView';
import httpModule from '../../modules/HttpModule/HttpModule';
import router from '../../modules/Router/Router';

export default class LeaderboardView extends BaseView {

    update(context = {}) {
        for (const row in Object.keys(context.data)) {
            const newRow = [];
            newRow.push(context.data[row].user.login);
            newRow.push(context.data[row].score.points);
            this.context.rows.push(newRow);
        }
        return null;
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

        return httpModule.doPost('/leaderboard', {position: 0, count: 9}).then(
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
        return this.template = require('./LeaderboardView.handlebars');
    }
}

window.currentScorePosition = 9;

window.scoreboardPaginate = (index) => {
    const paginationConstant = 9;
    httpModule.doPost('/leaderboard', {position: index, count: paginationConstant}).then(
        (response) => router.viewUpdate('/leaderboard/', response)
    );
    window.currentScorePosition += paginationConstant;
};

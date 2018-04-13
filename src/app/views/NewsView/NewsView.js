import './NewsView.scss';
import BaseView from '../BaseView/BaseView';
import httpModule from '../../modules/HttpModule/HttpModule';
import router from '../../modules/Router/Router';

export default class NewsView extends BaseView {

    update(context = {}) {
        Array.prototype.push.apply(this.context.news, context.data);
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
        const score = document.querySelector('.news-header');
        score.classList.add('modal-header__point_active');

        const news = [
            {
            title: 'Kek Kek Kek Kek Kek',
            datetime: '20.04.2018',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor\n' +
            '                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud\n' +
            '                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure\n' +
            '                        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            },
            {
                title: 'Kek Kek Kek Kek Kek',
                datetime: '20.04.2018',
                body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor\n' +
                '                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud\n' +
                '                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure\n' +
                '                        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            },
            {
                title: 'Kek Kek Kek Kek Kek',
                datetime: '20.04.2018',
                body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor\n' +
                '                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud\n' +
                '                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure\n' +
                '                        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            }];

        this.context.news = news;
        return super.preRender();

        // return httpModule.doPost('/news', {position: 0, count: 9}).then(
        //     (response) => {
        //         this.context.news = response.data;
        //     }
        // );
    }

    render() {
        return this.template = require('./NewsView.handlebars');
    }
}

window.currentNewsPosition = 9;

window.newsPaginate = (index) => {
    const paginationConstant = 9;
    httpModule.doPost('/news', {position: index, count: paginationConstant}).then(
        (response) => router.viewUpdate('/news/', response)
    );
    window.currentNewsPosition += paginationConstant;
};

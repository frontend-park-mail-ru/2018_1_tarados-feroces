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
        const score = document.querySelector('.news');
        score.classList.add('modal-header__point_active');

        const news = [
            {
            title: 'Kek Kek Kek Kek Kek',
            datetime: '20.04.2018',
            body: 'Kek Kek Kek Kek Kek Kek Kek Kek Kek Kekv Kek v v Kek v vv  KekKek Kek ',
            },
            {
                title: 'Kek Kek Kek Kek Kek',
                datetime: '20.04.2018',
                body: 'Kek Kek Kek Kek Kek Kek Kek Kek Kek Kekv Kek v v Kek v vv  KekKek Kek ',
            },
            {
                title: 'Kek Kek Kek Kek Kek',
                datetime: '20.04.2018',
                body: 'Kek Kek Kek Kek Kek Kek Kek Kek Kek Kekv Kek v v Kek v vv  KekKek Kek ',
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

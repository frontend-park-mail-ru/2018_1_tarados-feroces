import React from 'react';
import ReactDOM from 'react-dom';
import './Menu.scss';

export default class Menu extends BaseComponent {

    render(context) {
        this.template = require('./Menu.handlebars');
        super.render(context);
    }
}

'use strict';

import BaseComponent from '../BaseComponent/BaseComponent.js';

export default class StandartComponent extends BaseComponent {

    constructor() {
        super(standartTemplate);
    }
}

const standartTemplate = '<{{tag}} class="{{class}}">' +
    '{{text}}' +
    '</{{tag}}>';

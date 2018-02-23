class TableView extends BaseView {
    constructor() {
        super(tableTemplate);
    }
}

const tableTemplate = '<table>' +
    '<tr>' +
    '{{#each headers}}' +
    '<th>{{this}}</th>' +
    '{{/each}}' +
    '</tr>' +
    '{{#each rows}}' +
    '<TableRow data="{{this}}"></TableRow>' +
    '{{/each}}' +
    '</table>';

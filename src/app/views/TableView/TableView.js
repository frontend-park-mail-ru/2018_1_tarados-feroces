class TableView extends BaseView {
    constructor() {
        super(tableTemplate);
    }
}

const tableTemplate = '<table>' +
    '<tr>' +
    '<th>Name</th>' +
    '<th>Region</th>' +
    '<th>Score</th>' +
    '</tr>' +
    '{{#each rows}}' +
    '<TableRow username="{{this.username}}" region="{{this.region}}" score="{{this.score}}"></TableRow>' +
    '{{/each}}' +
    '</table>';

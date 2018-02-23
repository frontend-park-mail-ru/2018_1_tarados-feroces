class TableRow extends BaseComponent {
    constructor() {
        super(tableRowTemplate);
    }
}

const tableRowTemplate = '<tr>' +
    '<td>{{username}}</td>' +
    '<td>{{region}}</td>' +
    '<td>{{score}}</td>' +
    '</tr>';

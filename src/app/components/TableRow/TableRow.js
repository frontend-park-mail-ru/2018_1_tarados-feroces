class TableRow extends BaseComponent {
    constructor() {
        super(tableRowTemplate);
    }

    render(context) {
        if (context.data) {
            context.data = context.data.split(', ');
        }
        super.render(context);
    }
}

const tableRowTemplate = '<tr>' +
    '{{#each data}}' +
    '<td>' +
    '{{this}}' +
    '</td>' +
    '{{/each}}' +
    '</tr>';

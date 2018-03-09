(function() {
    'use strict';

    class LeaderboardView extends BaseView {

        update(context = {}) {
            for (const row in Object.keys(context.data)) {
                const newRow = [];
                newRow.push(context.data[row].login);
                newRow.push(context.data[row].points);
                this.context.rows.push(newRow);
            }
        }

        preRender() {
            return httpModule.doPost('/score', {position: 0, count: 5}).then(
                (response) => {
                    this.context.rows = [];
                    this.context.headers = ['Login', 'Points'];
                    for (const row in Object.keys(response.data)) {
                        const newRow = [];
                        newRow.push(response.data[row].login);
                        newRow.push(response.data[row].points);

                        this.context.rows.push(newRow);
                    }
                }
            );
        }

        render() {
            return `<div class="leaderboard">
                            <Header>Leaderboard</Header>
                            <div class="table">
                                <div class="table-row">
                                    {{#each headers}}
                                    <div class="table-data table-header">{{this}}</div>
                                    {{/each}}
                                </div>
                                {{#each rows}}
                                <div class="table-row">
                                {{#each this}}  
                                    <div class="table-data">
                                    {{this}}
                                    </div>
                                {{/each}}
                                </div>
                                {{/each}}
                            </div>
                    </div>
                    <div class="button-container">
                        <Button class="button large" click="(event){ paginate(currentPosition) }">More</Button>
                        <Button class="button large" click="(event){ event.preventDefault(); goBack(); }">Back</Button>
                    </div>
                    <Footer>Made by Tarados Feroces</Footer>`;
        }
    }

    window.currentPosition = 5;

    window.paginate = (index) => {
        const paginationConstant = 5;
        httpModule.doPost('/score', {position: index, count: paginationConstant + index}).then(
            (response) => router.viewUpdate(response)
        );
        window.currentPosition += paginationConstant;
    };

    window.LeaderboardView = LeaderboardView;
})();

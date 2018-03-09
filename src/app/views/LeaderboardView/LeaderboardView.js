(function() {
    'use strict';

    class LeaderboardView extends BaseView {

        update(context = {}) {
            this.context = this.context.rows.concat(context.rows);
        }

        preRender() {
            return httpModule.doPost('/score', {position: 0, count: 10}).then(
                (response) => {
                    this.context.rows = [];
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
                        <Button class="button large" click="(event){ paginate(indexOfLeaderboard) }">Back</Button>
                        <Button class="button large" click="(event){ event.preventDefault(); goBack(); }">Back</Button>
                 </div>
                 <Footer>Made by Tarados Feroces</Footer>`;
        }
    }

    window.indexOfLeaderboard = 10;

    window.paginate = (index) => {
        const paginationConstant = 10;
        httpModule.doPost('/score', {position: index, count: 10}).then(
            (response) => router.viewUpdate(response)
        );
        index += paginationConstant;
    };

    window.LeaderboardView = LeaderboardView;
})();

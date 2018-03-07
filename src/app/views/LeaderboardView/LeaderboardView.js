(function() {
    'use strict';

    class LeaderboardView extends BaseView {

        constructor(context) {
            super();
            this.context = context;
        }
      
        update(context = {}) {
            this.context = this.context.rows.concat(context.rows);
        }

        preRender() {
            return httpModule.doGet('/score').then(
                (response) => {
                    this.context = response;
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
                            {{/each}}
                        </div>
                        <Button class="button large" click="(event){ paginate(indexOfLeaderboard)  }">Back</Button>
                        <Button class="button large" click="(event){ event.preventDefault(); goBack();  }">Back</Button>
                 </div>
                 <Footer>Made by Tarados Feroces</Footer>`;
        }
    }

    let indexOfLeaderboard = 10;

    const paginate = (index) => {
        const paginationConstant = 10;
        httpModule.doPost('/score', {index}).then(
            (response) => router.viewUpdate(response)
        );
        index += paginationConstant;
    };

    window.LeaderboardView = LeaderboardView;
})();

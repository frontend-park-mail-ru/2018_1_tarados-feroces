import * as React from 'react';

import './Game.scss';

import Label from '../../components/Label/Label';
import Button from '../../components/Button/Button';
import GameCounter from '../../components/GameCounter/GameCounter';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as userActions from "../../actions/UserActions";

import OfflineGame from '../../game/core/offline';
import OnlineGame from '../../game/core/online';
import gameController from '../../game/GameController';
import Scene from '../../game/objects/Scene';
import ws from "../../modules/WebSocket/WebSocket";


interface IProps {
    history?: any;
    user?: any
    userActions?: any;
}

class GameContainer extends React.Component<IProps, any> {

    public game: any;
    public canvas: any;

    constructor(props: any) {
        super(props);

        this.exitGame = this.exitGame.bind(this);
        this.goGame = this.goGame.bind(this);
        this.setScore = this.setScore.bind(this);
        this.resumeGame = this.resumeGame.bind(this);
        this.props.userActions.getUser();
        this.state = {
            scores: [ { login: this.props.user.login,
                        points: 0 } ],
            game: null
        };
    }

    public setScore(data): any {
        this.setState({
            scores: data
        });
    }

    public componentDidMount(): any {
        this.canvas = document.querySelector('.game__battleground-canvas');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        const pause = document.querySelector('.game__pause');
        pause.classList.add('hidden');

        const gameOver = document.querySelector('.game__over');
        gameOver.classList.add('hidden');

        const {history} = this.props;
        const online = history.location.pathname === '/multi/';
        console.log(online, history.location.pathname);

        this.doGame(online);
    }

    public doGame(online): any {
        if (online) {
            console.log('ONLINE');
            const scene = new Scene(this.canvas);
            const game = new OnlineGame(gameController, scene, this.setScore);
            this.setState({
                game: game
            });
            game.start();
            return;
        }
        const scene = new Scene(this.canvas);
        const game = new OfflineGame(gameController, scene,
            [this.props.user.login], this.setScore);

        this.setState({
            game: game
        });

        // 0 - transform %, 1 - direction, 2 - timeout ms
        const rounds = [
            [
                [[25, 0, 0], [55, 1, 200], [55, 2, 0], [55, 3, 400]],
                [[40, 0, 100], [70, 0, 0], [90, 1, 100], [70, 2, 0], [60, 3, 400]],
            ],
            [
                [
                    [20, 0, 0], [30, 0, 800], [60, 0, 600], [110, 0, 800],
                    [30, 1, 200], [60, 1, 400], [80, 1, 300],
                    [25, 2, 600], [45, 2, 0], [70, 2, 400], [90, 2, 600],
                    [40, 3, 100], [60, 3, 100], [80, 3, 100]
                ],
                [
                    [15, 0, 300], [30, 0, 400], [70, 0, 600], [100, 0, 1000],
                    [30, 1, 200], [55, 1, 1000], [60, 1, 400], [80, 1, 300],
                    [30, 2, 400], [70, 2, 400], [90, 2, 600],
                    [10, 3, 100], [20, 3, 100], [80, 3, 100]
                ],
                [
                    [50, 0, 0], [40, 0, 400], [60, 0, 800], [80, 0, 600],
                    [80, 1, 200], [70, 1, 800], [80, 1, 300],
                    [25, 2, 600], [45, 2, 0], [50, 2, 400], [60, 2, 600],
                    [10, 3, 100], [20, 3, 100], [100, 3, 600]
                ],
            ],
            [
                [
                    [5, 0, 120], [10, 0, 180], [15, 0, 240], [20, 0, 300], [25, 0, 360],
                    [30, 0, 400], [35, 0, 450], [40, 0, 500],
                    [45, 0, 500], [50, 0, 500], [55, 0, 500], [60, 0, 500], [65, 0, 500],
                    [70, 0, 500], [90, 0, 500], [95, 0, 500], [100, 0, 500], [105, 0, 500], [110, 0, 500],
                ],
                [
                    [5, 2, 120], [10, 2, 280], [15, 2, 340], [20, 2, 400], [25, 2, 460],
                    [30, 2, 500], [35, 2, 550], [40, 2, 600],
                    [45, 2, 500], [50, 2, 500], [55, 2, 500], [60, 2, 500], [65, 2, 500],
                    [70, 2, 500], [90, 2, 500], [95, 2, 500], [100, 2, 500], [105, 2, 500], [110, 2, 500],
                    [75, 2, 1300], [80, 2, 1300], [85, 2, 1300],
                ],
                [
                    [65, 1, 120], [70, 1, 280], [75, 1, 340], [80, 1, 400], [85, 1, 460],
                    [90, 1, 500], [95, 1, 550], [100, 1, 600], [105, 1, 650], [110, 1, 700], [115, 1, 750],
                    [120, 1, 700], [125, 1, 750], [130, 1, 800], [110, 2, 180], [115, 2, 240],
                    [120, 2, 300], [125, 2, 300], [130, 2, 300], [20, 3, 300], [25, 3, 300], [30, 3, 300],
                    [65, 3, 1400], [70, 3, 1500], [75, 3, 1600], [80, 3, 1700], [85, 3, 1800],
                    [90, 3, 1900], [95, 3, 2000], [100, 3, 2100], [105, 3, 2200], [110, 3, 2200], [115, 3, 2200],
                    [10, 0, 1500], [15, 0, 1500], [20, 0, 1500], [25, 0, 1800], [30, 0, 1800],
                    [20, 0, 1800], [25, 0, 1800], [30, 0, 1800],
                ],
            ],
        ];
        game.saveRounds(rounds);

        game.start();
    }

    public render(): JSX.Element {
        return (
            <div className='game'>
                {this.props.user.isAuthorized &&
                    <GameCounter scores={this.state.scores}/>
                }

                <div className='game__title'>
                    <Label className='game__title-text'/>
                </div>
                <div className='game__pause'>
                    <div className='game__pause-data'>
                        <Label className='game__pause-notes'/>
                        <div className='game__pause-buttons'>
                            <Button className='game__exit button' onClick={this.exitGame} text='Exit' />
                            <Button className='game__repeat button' onClick={this.resumeGame} text='Resume'/>
                        </div>
                    </div>
                </div>
                <div className='game__over'>
                    <div className='game__over-data'>
                        <Label className='game__over-notes'/>
                        <div className='game__over-buttons'>
                            <Button className='game__exit button' onClick={this.exitGame} text='Exit' />
                            <Button className='game__repeat button' onClick={this.goGame} text='Play again'/>
                        </div>
                    </div>
                </div>
                <div className='game__battleground'>
                    <canvas className='game__battleground-canvas' />
                    <div className='game__arena' />
                </div>
                <div className='controllers-block'>
                    <div className='controllers controllers__right'><p>Right</p></div>
                    <div className='controllers controllers__top'><p>Top</p></div>
                    <div className='controllers controllers__bot'><p>Bot</p></div>
                    <div className='controllers controllers__left'><p>Left</p></div>
                </div>
            </div>
        );
    }

    private goGame() {
        const { history } = this.props;
        history.push('/single/');
    }

    private exitGame() {
        ws.sendMessage(ws.messages.INTERRUPT_GAME, {});
        const { history } = this.props;
        history.push('/');
    }

    private resumeGame() {
        this.state.game.resume();
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);

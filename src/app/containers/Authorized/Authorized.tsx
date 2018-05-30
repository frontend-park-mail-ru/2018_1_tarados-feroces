import * as React from 'react';

import './Authorized.scss';

import Header from '../../components/Header/Header';
import AuthHeaderPoint from '../../components/AuthHeaderPoint/AuthHeaderPoint';
import AuthContent from '../../components/AuthContent/AuthContent';
import FriendAction from '../../components/FriendAction/FriendAction';
import HideFriendsButton from '../../components/HideFriendsButton/HideFriendsButton';
import Friend from '../../components/Friend/Friend';
import Party from '../../components/Party/Party';
import People from '../../components/People/People';
import Loading from '../../components/Loading/Loading';
import Leaderboard from '../../components/Leaderboard/Leaderboard';
import Error from '../../components/Error/Error';


import {connect} from 'react-redux';
import * as userActions from '../../actions/UserActions';
import {bindActionCreators} from 'redux';
import {Redirect} from "react-router";
import News from '../../components/News/News';
import {isBoolean} from 'util';

import ws from '../../modules/WebSocket/WebSocket';
import bus from '../../modules/Bus/Bus';
import InviteDialog from '../../components/InviteDialog/InviteDialog';
import Image from '../../components/Image/Image';
import GameDialog from "../../components/GameDialog/GameDialog";
import {getPeople} from "../../actions/UserActions";

interface IProps {
    history?: any;
    user?: any;
    userActions?: any;
}

class Authorized extends React.Component<IProps, any> {

    constructor(props) {
        super(props);
        this.settings = this.settings.bind(this);
        this.state = {
            leaderActive: false,
            newsActive: true,
            hideFriends: false,
            areFriends: true,
            gameInvite: false,
            multiplayer: false,
            isReady: false,
        };

        this.showLeaders = this.showLeaders.bind(this);
        this.showNews = this.showNews.bind(this);
        this.hideFriends = this.hideFriends.bind(this);
        this.goFriends = this.goFriends.bind(this);
        this.goPeople = this.goPeople.bind(this);
        this.search = this.search.bind(this);
        this.showFriendActions = this.showFriendActions.bind(this);
        this.showGameInvite = this.showGameInvite.bind(this);
        this.showPartyInvite = this.showPartyInvite.bind(this);
        this.showFriendsInvite = this.showFriendsInvite.bind(this);
        this.updateParty = this.updateParty.bind(this);
        this.sendFriendsInvite = this.sendFriendsInvite.bind(this);
        this.sendPartyInvite = this.sendPartyInvite.bind(this);
        this.acceptParty = this.acceptParty.bind(this);
        this.declineParty = this.declineParty.bind(this);
        this.acceptFriends = this.acceptFriends.bind(this);
        this.declineFriends = this.declineFriends.bind(this);
        this.acceptGame = this.acceptGame.bind(this);
        this.playMultiplayer = this.playMultiplayer.bind(this);
        this.playSingleplayer = this.playSingleplayer.bind(this);
        this.startGame = this.startGame.bind(this);
        this.leaveParty = this.leaveParty.bind(this);

        bus.on(ws.messages.ADD_AS_FRIEND, (data) => {
            data.message = 'New friend request';
            this.showFriendsInvite(data);
        });
        bus.on(ws.messages.INVITE_TO_PARTY, (data) => {
            data.message = 'Invite to party';
            data.login = data.leader;
            this.showPartyInvite(data);
        });
        bus.on(ws.messages.PARTY_VIEW, (data) => {
            console.log('PARTY_VIEW');
            this.updateParty(data);
        });
        bus.on(ws.messages.ASK_FOR_GAME, (data) => {
            this.showGameInvite();
        });
        bus.on(ws.messages.GAME_PREPARE, (data) => {
            this.playMultiplayer();
        });
    }

    public showGameInvite(): void {
        this.setState({
            gameInvite: true,
        });
    }

    public showPartyInvite(data): void {
        this.setState({
            partyInvite: true,
            friendsInvite: false,
            party: data
        });
    }

    public showFriendsInvite(data): void {
        this.setState({
            partyInvite: false,
            friendsInvite: true,
            friends: data
        });
    }

    public acceptParty(): void {
        const { acceptParty }: any = this.props.userActions;
        acceptParty(this.state.party.leader);
        console.log('accepted party');
        this.setState({
            partyInvite: false,
            multiplayer: true,
        });
    }

    public declineParty(): void {
        this.setState({partyInvite: false});
    }

    public acceptFriends(): void {
        const { acceptFriends }: any = this.props.userActions;
        console.log('accepted friend');
        acceptFriends(this.state.friends.request_id);
        this.setState({friendsInvite: false});

    }

    public declineFriends(): void {
        this.setState({friendsInvite: false});
    }

    public updateParty(data): void {
        const { setParty }: any = this.props.userActions;
        setParty(data);

    }

    public leaveParty(): void {
        const { leaveParty }: any = this.props.userActions;
        leaveParty();
    }

    public sendFriendsInvite(): void {
        const {sendFriendsInvite} : any = this.props.userActions;
        sendFriendsInvite({login: this.state.currentUser});
        const modal = document.querySelector('.friends-modal');
        modal.classList.add('hidden');
    }

    public sendPartyInvite(): void {
        const {sendPartyInvite} : any = this.props.userActions;
        sendPartyInvite({login: this.state.currentUser});
        const modal = document.querySelector('.friends-modal');
        modal.classList.add('hidden');
    }

    public acceptGame(): void {
        console.log('Accepted. Now waiting');
        ws.sendMessage(ws.messages.JOIN_GAME, {});
        this.setState({
            isReady: true,
        });
    }

    public settings(): void {
        const { history }: any = this.props;
        history.push('/settings/');
    }

    public goFriends(): void {
        this.setState({
           areFriends: true
        });
        const { getFriends }: any = this.props.userActions;
        getFriends(this.state.prefix);
    }

    public goPeople(): void {
        this.setState({
            areFriends: false,
        });
        const { getPeople }: any = this.props.userActions;
        getPeople(this.state.prefix);
    }

    public showLeaders(): void {
        this.setState({
            leaderActive: true,
            newsActive: false
        });
    }

    public showFriendActions(event): void {
        const modal = document.querySelector('.friends-modal');
        const icon = event.currentTarget;
        // icon.classList.add('friend-active');
        this.setState({currentUser: icon.querySelector('.friend__login-value').textContent});

        const x = icon.getBoundingClientRect().x;
        const y = icon.getBoundingClientRect().y;
        modal.style.left = `${x + icon.getBoundingClientRect().width / 6}px`;
        modal.style.top = `${y + icon.getBoundingClientRect().height}px`;
        modal.classList.toggle('hidden');
    };

    public hideFriends(event): void {
        const hideValue = event.currentTarget.firstChild;
        const { hideFriends } = this.state;
        this.setState({
            hideFriends: !hideFriends
        });

        hideValue.classList.toggle('rotate-close');
        hideValue.style.transform = hideValue.classList.contains('rotate-close') ? 'rotate(0deg)' : 'rotate(180deg)';
        hideValue.classList.toggle('rotate-open');
    }

    public search(): void {
        const { getFriends, getPeople }: any = this.props.userActions;

        const name = document.querySelector('.search__input').value;

        this.setState({
            prefix: name
        });
        this.state.areFriends ? getFriends(name) : getPeople(name);
    }

    public showNews(): void {
        this.setState({
            leaderActive: false,
            newsActive: true
        });
    }

    public playSingleplayer(): void {
        const { history } = this.props;
        history.push('/single/');
    }

    public playMultiplayer(): void {
        this.setState({
            gameInvite: false,
        });
        const { history } = this.props;
        history.push('/multi/');
    }

    public startGame(): void {
        const { startGame }: any = this.props.userActions;
        startGame(this.props.user.party.leader.login);
    }

    public render(): JSX.Element {
        const { user } = this.props;
        const { logoutUser }: any = this.props.userActions;
        const { leaderActive, newsActive, hideFriends }: any = this.state;

        if (user.isAuthorized === null || user.isAuthorized === undefined) {
            return (
                <Loading />
            );
        } else if (user.isAuthorized === false) {
            return (
                <Redirect to='/' />
            );
        }

        return (
            <div className='auth-page'>
                <Header
                    isAuth={ true }
                    user={ user }
                    className='auth-page__header header'
                    logoutHandler={logoutUser}
                    settingsHandler={this.settings}
                    onPlay={ this.props.user.party ? this.startGame : this.playSingleplayer }
                />

                <div className='auth-page__content'>
                    <div className='auth-page__content-left'>
                        <div className='auth-page__content-left-modal'>
                            <div className='auth-page__content-left-modal-header modal-header'>
                                <AuthHeaderPoint
                                    className={newsActive && 'modal-header__point_active'}
                                    text='News'
                                    onClick={this.showNews}
                                />
                                <AuthHeaderPoint
                                    className={leaderActive && 'modal-header__point_active'}
                                    text='Scoreboard'
                                    onClick={this.showLeaders}
                                />
                            </div>
                            <AuthContent>
                                { leaderActive && <Leaderboard /> }
                                { newsActive && <News /> }
                            </AuthContent>
                        </div>
                    </div>

                    <div className='friends-modal hidden'>
                        {
                            this.state.areFriends ?
                                <FriendAction text='Invite to party' onClick={this.sendPartyInvite} /> :
                                <FriendAction text='Add to friends' onClick={this.sendFriendsInvite} />
                        }
                    </div>

                    {
                        this.state.partyInvite || this.state.friendsInvite ?
                            <InviteDialog
                                isVisible={ this.state.partyInvite || this.state.friendsInvite }
                                text={this.state.partyInvite ? this.state.party.message : this.state.friends.message}
                                login={this.state.partyInvite ? this.state.party.login : this.state.friends.login}
                                avatar={this.state.partyInvite ? this.state.party.avatar : this.state.friends.avatar}
                                onAccept={this.state.partyInvite ? this.acceptParty : this.acceptFriends}
                                onDecline={this.state.partyInvite ? this.declineParty : this.declineFriends}
                            /> :
                            ''
                    }

                    {
                        this.state.gameInvite ?
                            <GameDialog
                                isVisible={this.state.gameInvite}
                                onAccept={this.acceptGame}
                                isReady={this.state.isReady}
                                /> :
                            ''
                    }


                    <div className='auth-page__content-right'>

                        <div className='auth-page__content-right-hide'>
                            <HideFriendsButton onClick={this.hideFriends}/>
                            <div className={!hideFriends ? 'friends' : 'hidden'}>
                                <div className='friends-header'>
                                    <div
                                        className={
                                        this.state.areFriends ?
                                            'friends-header-point friends-header-point-active' :
                                            'friends-header-point'
                                        }
                                         onClick={this.goFriends}
                                    >
                                        <p className='friends-header-point-value'>Friends</p>
                                    </div>
                                    <div
                                        className={
                                        this.state.areFriends ?
                                            'friends-header-point' :
                                            'friends-header-point friends-header-point-active'
                                        }
                                        onClick={this.goPeople}
                                    >
                                        <p className='friends-header-point-value'>People</p>
                                    </div>
                                </div>

                                <div className='search'>
                                    <input className='search__input' placeholder='Username'/>
                                    <Image className='search__button'
                                           src='../static/imgs/search.png'
                                           onClick={this.search}/>
                                </div>
                                <div className='friends-data'>
                                    {
                                        <People onClick={this.showFriendActions}
                                                areFriends={this.state.areFriends} prefix={this.state.prefix}/>
                                }
                                </div>
                            </div>
                        </div>
                        <Party onLeave={this.leaveParty} className={!hideFriends ? 'content-right-party' : 'hidden'}/>
                    </div>
                </div>
                <Error/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Authorized);

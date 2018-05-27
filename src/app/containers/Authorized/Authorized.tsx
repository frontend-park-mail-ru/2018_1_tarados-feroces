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

import {connect} from 'react-redux';
import * as userActions from '../../actions/UserActions';
import {bindActionCreators} from 'redux';
import {Redirect} from "react-router";
import News from '../../components/News/News';
import {isBoolean} from 'util';

import ws from '../../modules/WebSocket/WebSocket';
import bus from '../../modules/Bus/Bus';

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
        };

        this.showLeaders = this.showLeaders.bind(this);
        this.showNews = this.showNews.bind(this);
        this.hideFriends = this.hideFriends.bind(this);
        this.goFriends = this.goFriends.bind(this);
        this.goPeople = this.goPeople.bind(this);
        this.showFriendActions = this.showFriendActions.bind(this);
        this.showGameInvite = this.showGameInvite.bind(this);
        this.showInvite = this.showInvite.bind(this);
        this.updateParty = this.updateParty.bind(this);
        this.sendFriendsInvite = this.sendFriendsInvite.bind(this);
        this.sendPartyInvite = this.sendPartyInvite.bind(this);

        bus.on(ws.messages.ADD_AS_FRIEND, (data) => {
            data.message = 'New friend request';
            data.type = 'friends';
            this.showInvite(data);
        });
        bus.on(ws.messages.INVITE_TO_PARTY, (data) => {
            data.message = 'Invite to party';
            data.type = 'party';
            data.login = data.leader;
            this.showInvite(data);
        });
        bus.on(ws.messages.PARTY_VIEW, (data) => {
            this.updateParty(data);
        });
        bus.on(ws.messages.ASK_FOR_GAME, (message) => {
            this.showGameInvite();
        });
        bus.on(ws.messages.GAME_PREPARE, (message) => {
            // this.playMultiplayer();
        });
    }

    public showGameInvite(): void {

    }

    public showInvite(data): void {

    }

    public updateParty(data): void {

    }

    public sendFriendsInvite(): void {
        const {sendFriendsInvite} : any = this.props.userActions;
        sendFriendsInvite({login: this.state.currentUser});
    }

    public sendPartyInvite(): void {
        const {sendPartyInvite} : any = this.props.userActions;
        sendPartyInvite({login: this.state.currentUser});
    }

    public settings(): void {
        const { history }: any = this.props;
        history.push('/settings');
    }

    public goFriends(): void {
        this.setState({
           areFriends: true
        });
    }

    public goPeople(): void {
        this.setState({
            areFriends: false
        });
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
        this.setState({currentUser: icon.querySelector('.friend__login-value').textContent});

        const x = icon.getBoundingClientRect().x;
        const y = icon.getBoundingClientRect().y;
        modal.style.left = `${x}px`;
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
        hideValue.style.transform = hideValue.classList.contains('rotate-close') ? 'rotate(180deg)' : 'rotate(0deg)';
        hideValue.classList.toggle('rotate-open');
    }

    public showNews(): void {
        this.setState({
            leaderActive: false,
            newsActive: true
        });
    }

    public render(): JSX.Element {
        const { user } = this.props;
        const { logoutUser }: any = this.props.userActions;
        const { leaderActive, newsActive, hideFriends }: any = this.state;

         const avatars = [
             '../static/imgs/user-logo.jpg',
             '../static/imgs/user-logo.jpg',
             '../static/imgs/user-logo.jpg',
             '../static/imgs/user-logo.jpg'
         ];

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
                                {
                                    this.state.areFriends ?
                                        <People onClick={this.showFriendActions} areFriends={true} prefix=''/> :
                                        <People onClick={this.showFriendActions} areFriends={false} prefix=''/>
                                }
                            </div>
                        </div>
                        <Party avatars={avatars} className={!hideFriends ? 'content-right-party' : 'hidden'}/>
                    </div>
                </div>
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

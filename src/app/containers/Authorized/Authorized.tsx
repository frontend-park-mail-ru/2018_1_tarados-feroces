import * as React from 'react';

import './Authorized.scss';

import Header from '../../components/Header/Header';
import AuthHeaderPoint from '../../components/AuthHeaderPoint/AuthHeaderPoint';
import AuthContent from '../../components/AuthContent/AuthContent';
import FriendAction from '../../components/FriendAction/FriendAction';
import HideFriendsButton from '../../components/HideFriendsButton/HideFriendsButton';
import Friend from '../../components/Friend/Friend';
import Party from '../../components/Party/Party';
import Loading from '../../components/Loading/Loading';
import Leaderboard from '../../components/Leaderboard/Leaderboard';

import {connect} from 'react-redux';
import * as userActions from '../../actions/UserActions';
import {bindActionCreators} from 'redux';
import {Redirect} from "react-router";
import News from '../../components/News/News';

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
          newsActive: false
        };
        this.showLeaders = this.showLeaders.bind(this);
        this.showNews = this.showNews.bind(this);
    }

    public settings(): void {
        const { history }: any = this.props;
        history.push('/settings');
    }

    public showLeaders(): void {
        this.setState({
            leaderActive: true,
            newsActive: false
        });
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
        const { leaderActive, newsActive }: any = this.state;

        console.log(user);
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
                        <FriendAction text='Invite'/>
                        <FriendAction text='Chat'/>
                    </div>

                    <div className='auth-page__content-right'>

                        <div className='auth-page__content-right-hide'>
                            <HideFriendsButton />
                            <div className='friends'>
                                <div className='friends-header'>
                                    <div className='friends-header-point'>
                                        <p className='friends-header-point-value'>Friends</p>
                                    </div>
                                    <div className='friends-header-point'>
                                        <p className='friends-header-point-value'>People</p>
                                    </div>
                                </div>
                                <Friend avatar='../static/imgs/user-logo.jpg' login='Kabachok'/>
                                <Friend avatar='../static/imgs/user-logo.jpg' login='Kabachok'/>
                                <Friend avatar='../static/imgs/user-logo.jpg' login='Kabachok'/>
                                <Friend avatar='../static/imgs/user-logo.jpg' login='Kabachok'/>
                            </div>
                        </div>
                        {/*<Party className='content-right-party'/>*/}
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

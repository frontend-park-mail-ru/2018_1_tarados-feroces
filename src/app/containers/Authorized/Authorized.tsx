import * as React from 'react';

import './Authorized.scss';

import Header from '../../components/Header/Header';
import AuthHeaderPoint from '../../components/AuthHeaderPoint/AuthHeaderPoint';
import AuthContent from '../../components/AuthContent/AuthContent';
import FriendAction from '../../components/FriendAction/FriendAction';
import HideFriendsButton from '../../components/HideFriendsButton/HideFriendsButton';
import Friend from '../../components/Friend/Friend';
import Party from '../../components/Party/Party';

import {connect} from 'react-redux';
import * as userActions from '../../actions/UserActions';
import {bindActionCreators} from 'redux';
import transport from '../../modules/Transport/Transport';

class Authorized extends React.Component<any, any> {

    public componentWillMount() {
        const { setUser } = this.props.userActions;
        transport.doGet('/user')
            .then(
                (response) => {
                    setUser(response);
                },
                (reject) => {
                    console.log('Can`t get user info:(');
                }
            );
    }

    public render() {
        const { user } = this.props;

        return (
            <div className='auth-page'>
                <Header isAuth={ true } user={ user } className='auth-page__header header'/>

                <div className='auth-page__content'>
                    <div className='auth-page__content-left'>
                        <div className='auth-page__content-left-modal'>
                            <div className='auth-page__content-left-modal-header modal-header'>
                                <AuthHeaderPoint className='news-header' text='News'/>
                                <AuthHeaderPoint className='leaderboard' text='Scoreboard'/>
                            </div>
                            <AuthContent id='modal-data'/>
                        </div>
                    </div>

                    <div className='friends-modal hidden'>
                        <FriendAction text='Invite'/>
                        <FriendAction text='Chat'/>
                    </div>

                    <div className='auth-page__content-right'>

                        <div className='auth-page__content-right-hide'>
                            <HideFriendsButton/>
                            <div className='friends'>
                                <div className='friends-header'>
                                    <div className='friends-header-point'>
                                        <p className='friends-header-point-value'>Friends</p>
                                    </div>
                                    <div className='friends-header-point'>
                                        <p className='friends-header-point-value'>People</p>
                                    </div>
                                </div>
                                <Friend avatar='../images/user-logo.jpg' login='Kabachok'/>
                                <Friend avatar='../images/user-logo.jpg' login='Kabachok'/>
                                <Friend avatar='../images/user-logo.jpg' login='Kabachok'/>
                                <Friend avatar='../images/user-logo.jpg' login='Kabachok'/>
                            </div>
                        </div>

                        <Party className='content-right-party'/>
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

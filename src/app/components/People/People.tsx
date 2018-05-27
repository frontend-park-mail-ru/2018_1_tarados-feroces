import * as React from 'react';

import Friend from '../Friend/Friend';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/UserActions';
import {connect} from 'react-redux';

interface IProps {
    areFriends: boolean;
    user?: any;
    userActions?: any;
    prefix?: string;
    onClick?: any;
}

class People extends React.Component<IProps, any> {

    public componentWillMount() {
        const prefix = '';
        const { getFriends }: any = this.props.userActions;
        getFriends(prefix);
    }

    // public componentWillUpdate(nextProps, nextState) {
    //     this.update(nextProps);
    // }

    public render(): JSX.Element {
        const { areFriends, user, onClick }: any = this.props;
        const people = areFriends ? user.friends : user.people;

        return (
            <div className='friends-people'>
                {(user.peopleLoading || !people) ?
                    <p>Loading</p> :
                    people.map((person, index) => {
                        return (
                            <Friend key={index} onClick={onClick} avatar={person.avatar} login={person.login} />
                        );
                    })
                }
            </div>
        );
    }
};

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

export default connect(mapStateToProps, mapDispatchToProps)(People);

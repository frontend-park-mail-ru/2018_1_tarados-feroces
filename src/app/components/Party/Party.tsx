import * as React from 'react';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/UserActions';
import {connect} from 'react-redux';

import './Party.scss';
import Image from '../Image/Image';

interface IProps {
    user?: any;
    userActions?: any;
    className?: string;
}

class Party extends React.Component<IProps, any> {

    public componentWillMount() {
        const { getParty }: any = this.props.userActions;
        getParty();
    }


    public render(): JSX.Element {
        const { className, user }: any = this.props;
        let getAvatars = null;
        if (!user.party) {
            getAvatars = (
                [
                    <div className='party__friend'>
                        <Image className='party__friend-logo' src={user.avatar}/>
                    </div>,
                ]
            );
        } else {
            getAvatars = [(
                <div key={0} className='party__friend'>
                    <Image className='party__friend-logo' src={user.party.leader.avatar}/>
                </div>
            )];

            user.party.users.map((src, key) => {
                getAvatars.push((
                    <div key={key + 1} className='party__friend'>
                        <Image className='party__friend-logo' src={src.avatar}/>
                    </div>
                ));
            });
        }
        return (
            <div className={'party ' + className}>
                {getAvatars}
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

export default connect(mapStateToProps, mapDispatchToProps)(Party);



import * as React from 'react';

import './Header.scss';
import UserInfo from '../UserInfo/UserInfo';
import Logo from '../Logo/Logo';

interface Props {
    className?: string;
    isAuth?: boolean;
    avatar?: string;
    coins?: string;
    points?: string;
    login?: string;
}

export default class Header extends React.Component<Props, any> {

    render() {
        const {className, isAuth, avatar, points, coins, login}: any = this.props;
        return (
            <div className={'header ' + className}>
                <Logo/>
                {isAuth ? <UserInfo avatar={avatar} points={points} coins={coins} login={login} /> : ''}
            </div>
        );
    }
};

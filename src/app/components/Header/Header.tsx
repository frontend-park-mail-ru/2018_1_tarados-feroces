import * as React from 'react';

import './Header.scss';
import UserInfo from '../UserInfo/UserInfo';
import Logo from '../Logo/Logo';

interface IProps {
    className?: string;
    isAuth?: boolean;
    user?: any;
}

export default class Header extends React.Component<IProps, any> {

    public render(): JSX.Element {
        const {className, isAuth, user}: any = this.props;
        return (
            <div className={'header ' + className}>
                <Logo/>
                {isAuth && <UserInfo avatar={user.avatar} points={user.points} coins={user.coins} login={user.login} />}
            </div>
        );
    }
}

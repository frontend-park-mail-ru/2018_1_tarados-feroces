import * as React from 'react';

import './Header.scss';

import UserInfo from '../UserInfo/UserInfo';
import Logo from '../Logo/Logo';

interface IProps {
    className?: string;
    isAuth?: boolean;
    user?: any;
    settingsHandler?: any;
    logoutHandler?: any;
    onPlay?: any;
}

export default class Header extends React.Component<IProps, any> {

    public render(): JSX.Element {
        const {className, onPlay, isAuth, user, settingsHandler, logoutHandler}: any = this.props;
        return (
            <div className={'header ' + className}>
                <Logo/>
                {
                    isAuth &&
                    <div className='button button-play' onClick={onPlay}>
                        <p className='button-play__value'>PLAY</p>
                    </div>
                }
                {
                    isAuth &&
                    <UserInfo
                        avatar={user.avatar || '../static/imgs/user-logo.jpg'}
                        points={user.points}
                        coins={user.coins}
                        login={user.login}
                        settingsHandler={settingsHandler}
                        logoutHandler={logoutHandler}
                    />
                }
            </div>
        );
    }
}

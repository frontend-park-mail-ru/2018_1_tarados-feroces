import * as React from 'react';

import './Header.scss';

import UserInfo from '../UserInfo/UserInfo';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';

interface IProps {
    className?: string;
    isAuth?: boolean;
    user?: any;
    settingsHandler?: any;
    logoutHandler?: any;
    onPlay?: any;
    isNotPlay?: boolean;
}

export default class Header extends React.Component<IProps, any> {

    public render(): JSX.Element {
        const {className, onPlay, isAuth, user, settingsHandler, logoutHandler, isNotPlay}: any = this.props;
        return (
            <div className={'header ' + className}>
                <Logo/>
                {
                    isAuth && !isNotPlay &&
                    <Button onClick={onPlay} className='btn-play' text='PLAY'/>
                }
                {
                    isAuth &&
                    <UserInfo
                        avatar={user.avatar}
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

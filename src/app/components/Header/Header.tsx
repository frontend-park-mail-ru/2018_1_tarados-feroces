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
}

export default class Header extends React.Component<IProps, any> {

    public render(): JSX.Element {
        const {className, onPlay, isAuth, user, settingsHandler, logoutHandler}: any = this.props;
        return (
            <div className={'header ' + className}>
                <Logo/>
                {
                    isAuth &&
                   <Button onClick={onPlay} className='button-play' text='PLAY'/>
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

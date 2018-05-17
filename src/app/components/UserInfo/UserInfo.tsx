import * as React from 'react';
import SignoutButton from '../SignoutButton/SignoutButton';
import SettingsButton from '../SettingsButton/SettingsButton';

interface Props {
    avatar?: string;
    login?: string;
    coins?: string;
    points?: string;
}

export default class UserInfo extends React.Component<Props, any> {

    render() {
        const {avatar, login, coins, points}: any = this.props;

        return (
            <div className="header__user-info">
                <div className="header__user-info-avatar">
                    <img className="header__user-info-avatar" src={avatar}/>
                </div>
                <div className="header__user-info-data-block">
                    <div className="header__user-info-data-block-login">
                        <p className="header__user-info-data-block-login-value">{login}</p>
                    </div>
                    <div className="header__user-info-data-block-score">
                        <img className="header__user-info-data-block-score-image" src="../imgs/coins.png"/>
                        <div className="header__user-info-data-block-score-number">
                            <p className="header__user-info-data-block-score-number-value">{coins}$</p>
                        </div>
                    </div>
                    <div className="header__user-info-data-block-score">
                        <img className="header__user-info-data-block-score-image" src="../imgs/points.png"/>
                        <div className="header__user-info-data-block-score-number">
                            <p className="header__user-info-data-block-score-number-value">{points}</p>
                        </div>
                    </div>
                </div>
                <SettingsButton click="(){goToSettings();}"/>
                <SignoutButton click="(event){signOut();}"/>
            </div>
        );
    }
};

import * as React from 'react';
import SignoutButton from '../SignoutButton/SignoutButton';
import SettingsButton from '../SettingsButton/SettingsButton';

interface IProps {
    avatar?: string;
    login?: string;
    coins?: string;
    points?: string;
}

export default class UserInfo extends React.Component<IProps, any> {

    public render(): JSX.Element {
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
                        <img className="header__user-info-data-block-score-image" src="../static/imgs/coins.png"/>
                        <div className="header__user-info-data-block-score-number">
                            <p className="header__user-info-data-block-score-number-value">{coins}$</p>
                        </div>
                    </div>
                    <div className="header__user-info-data-block-score">
                        <img className="header__user-info-data-block-score-image" src="../static/imgs/points.png"/>
                        <div className="header__user-info-data-block-score-number">
                            <p className="header__user-info-data-block-score-number-value">{points}</p>
                        </div>
                    </div>
                </div>
                <SettingsButton />
                <SignoutButton />
            </div>
        );
    }
};

import * as React from 'react';

interface IProps {
    onClick?: any;
}

export default class SettingsButton extends React.Component<IProps, any> {

    public render(): JSX.Element {
        const { onClick }: any = this.props;

        return (
            <div onClick={ onClick } className="header__user-info-settings">
                <div className="header__user-info-settings-value">
                    <img className="header__user-info-settings-value" src="../static/imgs/settings.png"/>
                </div>
            </div>
        );
    }
}

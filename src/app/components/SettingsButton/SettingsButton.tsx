import * as React from 'react';

export default class SettingsButton extends React.Component<any, any> {

    public render(): JSX.Element {
        return (
            <div className="header__user-info-settings">
                <div className="header__user-info-settings-value">
                    <img className="header__user-info-settings-value" src="../static/imgs/settings.svg"/>
                </div>
            </div>
        );
    }
}

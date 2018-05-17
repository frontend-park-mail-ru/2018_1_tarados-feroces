import * as React from 'react';

export default class SettingsButton extends React.Component<any, any> {

    render() {

        return (
            <div className="header__user-info-settings">
                <div className="header__user-info-settings-value">
                    <img className="header__user-info-settings-value" src="../imgs/settings.svg"/>
                </div>
            </div>
        );
    }
};

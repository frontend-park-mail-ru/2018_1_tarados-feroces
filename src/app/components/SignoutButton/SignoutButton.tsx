import * as React from 'react';

export default class SignoutButton extends React.Component<any, any> {

    render() {

        return (
            <div className="header__user-info-settings">
                <div className="header__user-info-settings-value logout">
                    <img className="header__user-info-settings-value" src="../imgs/logout.png"/>
                </div>
            </div>
        );
    }
};

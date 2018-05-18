import * as React from 'react';

export default class SignoutButton extends React.Component<any, any> {

    public render(): JSX.Element {
        return (
            <div className="header__user-info-settings">
                <div className="header__user-info-settings-value logout">
                    <img className="header__user-info-settings-value" src="../static/imgs/logout.png"/>
                </div>
            </div>
        );
    }
};

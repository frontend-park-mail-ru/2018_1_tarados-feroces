import * as React from 'react';

interface Props {
    className?: string;
    text?: string;
}

export default class AuthHeaderPoint extends React.Component<Props, any> {

    render() {
        const {className, text}: any = this.props;
        return (
            <div className={'modal-header__point point-score ' + className}>
                <p className="modal-header__point-value">{text}</p>
            </div>
        );
    }
};

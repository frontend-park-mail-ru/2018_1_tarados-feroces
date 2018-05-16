import * as React from 'react';

import './Button.scss';

interface Props {
    text?: string;
    className?: string;
}

export default class Button extends React.Component<Props, any> {

    render() {
        const {text, className}: any = this.props;
        return (
            <div className={'button ' + className}>
                <p className={'button__value'}>{text}</p>
            </div>
        );
    }
};

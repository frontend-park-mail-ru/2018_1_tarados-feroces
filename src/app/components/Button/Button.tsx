import * as React from 'react';

import './Button.scss';

interface IProps {
    text?: string;
    className?: string;
    onClick?: () => any;
}

export default class Button extends React.Component<IProps, any> {

    public render(): JSX.Element {
        const {text, className, onClick}: any = this.props;
        return (
            <div onClick={onClick} className={'button ' + className}>
                <p className={'button__value'}>{text}</p>
            </div>
        );
    }
};

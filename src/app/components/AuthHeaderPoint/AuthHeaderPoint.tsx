import * as React from 'react';

interface IProps {
    className?: string;
    text?: string;
    onClick?: any;
}

export default class AuthHeaderPoint extends React.Component<IProps, any> {

    public render(): JSX.Element {
        const {className, text, onClick}: any = this.props;
        return (
            <div className={'modal-header__point point-score ' + className} onClick={onClick}>
                <p className='modal-header__point-value'>{text}</p>
            </div>
        );
    }
};

import * as React from 'react';

import './Label.scss';

interface IProps {
    className?: string;
    text?: string;
}

export default class Label extends React.Component<IProps, any> {

    public render(): JSX.Element {
        const {className, text}: any = this.props;
        return (
            <div className={'label ' + className}>
                <p className="label-text">{text}</p>
            </div>
        );
    }
};

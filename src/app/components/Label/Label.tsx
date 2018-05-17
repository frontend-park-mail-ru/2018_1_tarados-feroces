import * as React from 'react';

import './Label.scss';

interface Props {
    className?: string;
    text?: string;
}

//TODO handlers onblur, onfocus
export default class Label extends React.Component<Props, any> {

    render() {
        const {className, text}: any = this.props;
        return (
            <div className={'label ' + className}>
                <p className="label-text">{text}</p>
            </div>
        );
    }
};

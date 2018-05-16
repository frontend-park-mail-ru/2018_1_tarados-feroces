import * as React from 'react';

import './MenuPoint.scss';

interface Props {
    className?: string;
    text?: string;
}

export default class MenuPoint extends React.Component<Props, any> {

    render() {
        const {className, text}: any = this.props;
        return (
            <div className={'menu-point ' + className}>
                <p className='menu-point-text'>{text}</p>
            </div>
        );
    }
};

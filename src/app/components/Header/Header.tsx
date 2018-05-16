import * as React from 'react';

import './Header.scss';

interface Props {
    className?: string;
}

export default class Header extends React.Component<Props, any> {

    render() {
        const {className}: any = this.props;
        return (
            <div className={'header ' + className}/>
        );
    }
};

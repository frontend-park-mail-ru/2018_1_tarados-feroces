import * as React from 'react';

import './Image.scss';

interface Props {
    className?: string;
    src?: string;
}

export default class Image extends React.Component<Props, any> {

    public render() {
        const {className, src}: any = this.props;
        return (
            <img className={className} src={src}/>

        );
    }
};

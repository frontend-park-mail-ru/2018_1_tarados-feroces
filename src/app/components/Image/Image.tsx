import * as React from 'react';

import './Image.scss';

interface IProps {
    className?: string;
    src?: string;
}

export default class Image extends React.Component<IProps, any> {

    public render(): JSX.Element {
        const {className, src}: any = this.props;
        return (
            <img className={className} src={src}/>
        );
    }
};

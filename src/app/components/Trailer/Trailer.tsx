import * as React from 'react';

interface IProps {
    className?: string;
    src?: string;
    frameborder?: string;
    allow?: boolean;
}

export default class Menu extends React.Component<IProps, any> {

    public render(): JSX.Element {
        const {className, src, frameborder, allow}: any = this.props;
        return (
            <iframe className={className} src={src} frameBorder={frameborder}
                    allowFullScreen/>
        );
    }
};

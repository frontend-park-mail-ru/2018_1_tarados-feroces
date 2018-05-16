import * as React from 'react';

interface Props {
    className?: string;
    src?: string;
    frameborder?: string;
    allow?: boolean;
}

export default class Menu extends React.Component<Props, any> {

    render() {
        const {className, src, frameborder, allow}: any = this.props;
        return (
            <iframe className={className} src={src} frameBorder={frameborder}
                    allowFullScreen/>
        );
    }
};

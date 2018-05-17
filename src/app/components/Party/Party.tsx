import * as React from 'react';

import './Party.scss';
import Image from '../Image/Image';

interface Props {
    className?: string;
    avatars?: Array<string>;
}

//TODO handlers onblur, onfocus
export default class Party extends React.Component<Props, any> {

    render() {
        const {className, avatars}: any = this.props;
        const getAvatars = avatars.map(src => {
                return <div className="party__friend">
                    <Image className="party__friend-logo" src={src}/>
                </div>
            });
        return (
            <div className={'party ' + className}>
                {getAvatars}
            </div>
        );
    }
};

import * as React from 'react';

import './Party.scss';
import Image from '../Image/Image';

interface IProps {
    className?: string;
    avatars?: Array<string>;
}

export default class Party extends React.Component<IProps, any> {

    public render(): JSX.Element {
        const {className, avatars}: any = this.props;
        const getAvatars = avatars.map((src) => {
            return <div className='party__friend'>
                <Image className='party__friend-logo' src={src}/>
            </div>;
        });
        return (
            <div className={'party ' + className}>
                {getAvatars}
            </div>
        );
    }
};

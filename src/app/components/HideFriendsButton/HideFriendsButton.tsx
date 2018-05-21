import * as React from 'react';
import Image from '../Image/Image';

interface IProps {
    onClick?: any;
}

export default class HideFriendsButton extends React.Component<IProps, any> {

    public render(): JSX.Element {
        const { onClick } = this.props;
        return (
            <div onClick={onClick} className='auth-page__content-right-hide-icon'>
                <Image className='auth-page__content-right-hide-icon-value' src='../static/imgs/back.png'/>
            </div>
        );
    }
}

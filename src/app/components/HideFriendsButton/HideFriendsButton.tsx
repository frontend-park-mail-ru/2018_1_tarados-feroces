import * as React from 'react';
import Image from '../Image/Image';

export default class HideFriendsButton extends React.Component<any, any> {

    public render(): JSX.Element {
        return (
            <div className='auth-page__content-right-hide-icon'>
                <Image className='auth-page__content-right-hide-icon-value' src='../static/imgs/back.png'/>
            </div>
        );
    }
}

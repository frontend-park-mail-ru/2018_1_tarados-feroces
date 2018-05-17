import * as React from 'react';
import Image from '../Image/Image';


export default class HideFriendsButton extends React.Component<any, any> {

    render() {
        return (
            <div className='auth-page__content-right-hide-icon'>
                <Image className='auth-page__content-right-hide-icon-value' src='../images/back.png'/>
            </div>
        );
    }
};

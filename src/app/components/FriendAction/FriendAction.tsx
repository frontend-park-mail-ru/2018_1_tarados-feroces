import * as React from 'react';

import './FriendAction.scss';

interface Props {
    text?: string;
}

export default class FriendAction extends React.Component<Props, any> {

    render() {
        const {text}: any = this.props;
        return (
            <div className='friends-modal-points'>
                <p className='friends-modal-points-text'>{text}</p>
            </div>
        );
    }
};

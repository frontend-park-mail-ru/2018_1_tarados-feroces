import * as React from 'react';

import './FriendAction.scss';

interface IProps {
    text?: string;
    onClick?: any;
}

export default class FriendAction extends React.Component<IProps, any> {

    public render(): JSX.Element {
        const {text, onClick}: any = this.props;
        return (
            <div className='friends-modal-points' onClick={onClick}>
                <p className='friends-modal-points-text'>{text}</p>
            </div>
        );
    }
};

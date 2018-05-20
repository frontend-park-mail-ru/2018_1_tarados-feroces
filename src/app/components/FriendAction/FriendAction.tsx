import * as React from 'react';

import './FriendAction.scss';

interface IProps {
    text?: string;
}

export default class FriendAction extends React.Component<IProps, any> {

    public render(): JSX.Element {
        const {text}: any = this.props;
        return (
            <div className='friends-modal-points'>
                <p className='friends-modal-points-text'>{text}</p>
            </div>
        );
    }
};

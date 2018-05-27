import * as React from 'react';

import Image from '../Image/Image';
import Button from '../Button/Button';

import './InviteDialog.scss';

interface IProps {
    text?: string;
    login?: string;
    avatar?: any;
    onAccept?: any;
    onDecline?: any;
    isVisible?: boolean;
}

export default class InviteDialog extends React.Component<IProps, any> {

    public render(): JSX.Element {
        const {text, onAccept, onDecline, avatar, login, isVisible}: any = this.props;
        return (
            <div className={isVisible ? 'confirm' : 'hidden'}>
                <div className="confirm-modal">
                    <p className="confirm-modal__message">{text}</p>
                    <div className="confirm-modal__info">
                        <Image className='confirm-modal__info-avatar' src={avatar} />
                        <p className='confirm-modal__info-login'>{login}</p>
                    </div>
                    <div className='confirm-modal__accept'>
                        <Button onClick={onAccept} text='Accept' />
                        <Button onClick={onDecline} text='Decline' />
                    </div>
                </div>
            </div>
        );
    }
};

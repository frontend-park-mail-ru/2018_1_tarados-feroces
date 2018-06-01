import * as React from 'react';

import Button from '../Button/Button';

import './GameDialog.scss';

interface IProps {
    onAccept?: any;
    isVisible?: boolean;
    isReady?: boolean;
}

export default class GameDialog extends React.Component<IProps, any> {

    public render(): JSX.Element {
        const {onAccept, isVisible, isReady}: any = this.props;
        return (
            <div className={isVisible ? 'confirm-game' : 'hidden'}>
                <div className='rules'>
                    <p className='rules__item'>W A S D - move</p>
                    <p className='rules__item'>ESC - pause</p>
                </div>
                <div className="confirm-game-modal">
                    <p className="confirm-game-modal__message">{isReady ? 'Waiting for other players...' : 'Are you ready for GAME???'}</p>
                    {   isReady ? '' :
                        <div className="confirm-game-modal__accept">
                            <Button className='wait' onClick={onAccept} text={'READY'}/>
                        </div>
                    }
                </div>
            </div>
        );
    }
};

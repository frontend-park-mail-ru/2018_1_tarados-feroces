import * as React from 'react';

import './ModalLoader.scss';

export default class ModalLoader extends React.Component<any, any> {

    public render(): JSX.Element {
        return (
            <div className='modal-preloader'>
                <div className='modal-loader'/>
            </div>
        );
    }
};

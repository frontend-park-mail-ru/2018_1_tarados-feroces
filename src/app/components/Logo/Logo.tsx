import * as React from 'react';

import './Logo.scss';

export default class Logo extends React.Component<any, any> {

    public render(): JSX.Element {
        return (
            <div className='logo'>
                <div className='logo__content'/>
            </div>
        );
    }
};

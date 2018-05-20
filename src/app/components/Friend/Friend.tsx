import * as React from 'react';

import './Friend.scss';

interface IProps {
    avatar?: string;
    login?: string;
}

export default class Friend extends React.Component<IProps, any> {

    public render(): JSX.Element {
        const {avatar, login}: any = this.props;
        return (
            <div className='friend'>
                <img className='friend__avatar' src={avatar}/>
                    <div className='friend__login'>
                        <p className='friend__login-value'>{login}</p>
                    </div>
            </div>
        );
    }
};

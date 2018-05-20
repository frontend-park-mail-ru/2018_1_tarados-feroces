import * as React from 'react';

interface IProps {
    id?: string;
}

export default class AuthContent extends React.Component<IProps, any> {

    public render(): JSX.Element {
        const {id}: any = this.props;
        return (
            <div id={id} className='auth-page__content-left-modal-data'/>
        );
    }
};

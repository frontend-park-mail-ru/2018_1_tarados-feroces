import * as React from 'react';

interface Props {
    id?: string;
}

export default class AuthContent extends React.Component<Props, any> {

    render() {
        const {id}: any = this.props;
        return (
            <div id={id} className='auth-page__content-left-modal-data'/>
        );
    }
};

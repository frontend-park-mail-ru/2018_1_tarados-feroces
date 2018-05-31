import * as React from 'react';

interface IProps {
}

export default class AuthContent extends React.Component<IProps, any> {

    public render(): JSX.Element {
        const {...children}: any = this.props;
        return (
            <div className='auth-page__content-left-modal-data' {...children} />
        );
    }
};

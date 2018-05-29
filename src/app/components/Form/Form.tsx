import * as React from 'react';

import './Form.scss';

interface IProps {
    method?: string;
}

export default class Form extends React.Component<IProps, any> {

    public render() {
        const {method}: any = this.props;
        return (
            <form method={method}/>
        );
    }
}

import * as React from 'react';

import './Form.scss';

interface Props {
    method?: string;
}

export default class Form extends React.Component<Props, any> {

    render() {
        const {method}: any = this.props;
        return (
            <form method={method}/>
        );
    }
};

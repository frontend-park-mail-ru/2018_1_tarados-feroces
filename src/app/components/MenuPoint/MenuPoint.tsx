import * as React from 'react';

import './MenuPoint.scss';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
// import {withRouter} from 'react-router';

interface IProps {
    text: string;
    onClick?: any;
}

export default class MenuPoint extends React.Component<IProps, any> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            isClicked: false
        };
    }

    public render() {
        const {text, onClick}: any = this.props;

        return (
            <div onClick={onClick} className={'menu-point'}>
                <p className='menu-point-text'>{text}</p>
            </div>
        );
    }
}

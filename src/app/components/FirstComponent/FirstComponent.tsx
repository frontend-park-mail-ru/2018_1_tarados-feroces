import * as React from 'react';
import {Link} from 'react-router';

// import './Back.scss';
interface Interface {

}

export class FirstComponent extends React.Component<Interface, any> {
    constructor() {
        super();
    }

    render() {
        return (
        <p>Hello!</p>
    );
    }
}
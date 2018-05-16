import * as React from 'react';

// import './Back.scss';
interface Interface {

}

export default class FirstComponent extends React.Component<Interface, any> {
    constructor(props: Interface = {}) {
        super(props);
    }

    render() {
        return (
            <p>Hello!!</p>
        );
    }
}
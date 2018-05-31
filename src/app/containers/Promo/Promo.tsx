import * as React from 'react';
import Validation from "../../modules/Validator";
import {Redirect} from "react-router";
import {Link} from "react-router-dom";

interface IProps {
    history?: any;
}

export default class Promo extends React.Component<IProps, any> {

    constructor(props: any) {
        super(props);
    }

    public render(): JSX.Element {
        window.location.replace('https://yandex.ru');
        return (<Link to={'https://yandex.ru'}/>);
    }
}

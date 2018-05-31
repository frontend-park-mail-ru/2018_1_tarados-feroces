import * as React from "react";

interface IProps {
}

export default class Promo extends React.Component<IProps, any> {

    constructor(props: any) {
        super(props);
    }

    public render(): JSX.Element {
        window.location.replace('https://mail.ru');
        return (<div/>);
    }
}
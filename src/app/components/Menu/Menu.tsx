import * as React from 'react';

import './Menu.scss';
import MenuPoint from "../MenuPoint/MenuPoint";

interface Props {
    className?: string;
    buttons?: any[];
}

export default class Menu extends React.Component<Props, any> {

    render() {
        const {className, buttons}: any = this.props;
        return (
            <div className={'menu' + className}>
                {buttons.map((className, text) => {
                    return <MenuPoint text={text}/>
                })}
            </div>
        );
    }
};

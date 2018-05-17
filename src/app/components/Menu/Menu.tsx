import * as React from 'react';

import './Menu.scss';
import MenuPoint from '../MenuPoint/MenuPoint';

interface IProps {
    className?: string;
    buttons: any;
}

export default class Menu extends React.Component<IProps, any> {

    public render() {
        // debugger;
        const {className, buttons}: any = this.props;
        return (
            <div className={'menu ' + className}>
                {buttons.map((button) => {
                    return <MenuPoint onClick={button.onClick} text={button.text} />;
                })}
            </div>
        );
    }
};

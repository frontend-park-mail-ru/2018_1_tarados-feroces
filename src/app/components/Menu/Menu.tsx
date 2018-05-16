import * as React from 'react';

import './Menu.scss';
import MenuPoint from '../MenuPoint/MenuPoint';

interface IProps {
    className?: string;
    buttons?: Array<string>;
}

export default class Menu extends React.Component<IProps, any> {

    public render() {
        const {className, buttons}: any = this.props;
        return (
            <div className={'menu ' + className}>
                {buttons.map((text) => {
                    return <MenuPoint text={text}/>;
                })}
            </div>
        );
    }
};

import * as React from 'react';

import './Input.scss';

interface IProps {
    blockClass?: string;
    inputName?: string;
    type?: string;
    inputClass?: string;
    placeholder?: string;
    value?: string;
    onChange?: any;
    dest?: any;
}

export default class Input extends React.Component<IProps, any> {

    public render(): JSX.Element {
        const {blockClass, inputName, type, inputClass, placeholder, value, onChange, dest}: any = this.props;
        return (
            <div className={'input-block ' + blockClass}>
                <input
                    name={inputName}
                    type={type}
                    className={'input-block__input ' + inputClass}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    data-dest={dest}
                />
            </div>
        );
    }
};

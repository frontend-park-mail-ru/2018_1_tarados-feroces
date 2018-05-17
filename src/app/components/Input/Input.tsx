import * as React from 'react';

import './Input.scss';

interface Props {
    blockClass?: string;
    inputName?: string;
    type?: string;
    inputClass?: string;
    placeholder?: string;
    value?: string;
}

//TODO handlers onblur, onfocus
export default class Input extends React.Component<Props, any> {

    render() {
        const {blockClass, inputName, type, inputClass, placeholder, value}: any = this.props;
        return (
            <div className={'input-block ' + blockClass}>
                <input
                    name={inputName}
                    type={type}
                    className={'input-block__input ' + inputClass}
                    placeholder={placeholder}
                    value={value}
                />
            </div>
        );
    }
};

import * as React from 'react';

import './InputFile.scss';

interface Props {
    className?: string;
    fileClass?: string;
}

//TODO handlers onblur, onfocus
export default class InputFile extends React.Component<Props, any> {

    render() {
        const {className, fileClass}: any = this.props;
        return (
            <div className={'file-upload ' + className}>
                <label className='file-upload-label'>
                    <input type='file' name='file' className={fileClass}/>
                        <span>Выберите файл</span>
                </label>
            </div>
        );
    }
};

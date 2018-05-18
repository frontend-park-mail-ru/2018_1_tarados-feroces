import * as React from 'react';

import './InputFile.scss';

interface IProps {
    className?: string;
    fileClass?: string;
}

export default class InputFile extends React.Component<IProps, any> {

    public render(): JSX.Element {
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

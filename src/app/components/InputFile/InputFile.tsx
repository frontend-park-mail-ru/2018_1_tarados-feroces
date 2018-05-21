import * as React from 'react';

import './InputFile.scss';

interface IProps {
    className?: string;
    fileClass?: string;
    onChange?: any;
}

export default class InputFile extends React.Component<IProps, any> {

    public render(): JSX.Element {
        const {className, fileClass, onChange}: any = this.props;
        return (
            <div className={'file-upload ' + className}>
                <label className='file-upload-label'>
                    <input onChange={ onChange } type='file' name='file' className={ fileClass }/>
                        <span>Choose the file</span>
                </label>
            </div>
        );
    }
};

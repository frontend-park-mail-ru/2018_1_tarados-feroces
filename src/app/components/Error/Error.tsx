import * as React from 'react';

import Image from '../Image/Image';
import Button from '../Button/Button';

import './Error.scss';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as errorActions from '../../actions/ErrorActions';

interface IProps {
    error?: any;
    errorActions?: any;
}

class Error extends React.Component<IProps, any> {

    public constructor(props: any) {
        super(props);
        this.state = {
            isVisible: false
        };

        this.showError = this.showError.bind(this);
        this.closeError = this.closeError.bind(this);
    }

    public showError(): void {
        const { error }: any = this.props;
        if (error.message) {
            this.setState({isVisible: true});
            setTimeout(this.closeError, 3000);
        }
    }

    public closeError(): void {
        const { setError }: any = this.props.errorActions;
        this.setState({isVisible: false});
        setError({message: ''})
    }

    public render(): JSX.Element {
        const { isVisible }: any = this.state;
        const { error }: any = this.props;
        // error.message && setTimeout(this.closeError, 3000);

        return (
            <div className={error.message ? 'error' : 'hidden'}>
                <div className="error-modal">
                    <p className="error-modal__message">{error.message}</p>
                    <div className='error-modal__accept'>
                        <Button onClick={this.closeError} text='Ok' />
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        error: state.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        errorActions: bindActionCreators(errorActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Error);

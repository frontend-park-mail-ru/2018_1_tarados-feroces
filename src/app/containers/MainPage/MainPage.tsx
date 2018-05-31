import * as React from 'react';

import './MainPage.scss';

import Menu from '../../components/Menu/Menu';
import Trailer from '../../components/Trailer/Trailer';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';

import {Redirect} from 'react-router';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/UserActions';
import {connect} from 'react-redux';

interface IProps {
    user?: any;
    history?: any;
    userActions?: any;
}

class MainPage extends React.Component<IProps, any> {

    constructor(props: any) {
        super(props);
        this.goLogin = this.goLogin.bind(this);
        this.goSignup = this.goSignup.bind(this);
        this.goSingle = this.goSingle.bind(this);
    }

    public slide(event) {
        const iconValue: any = event.currentTarget.firstChild;
        const icon: any = iconValue.parentElement;
        const header: any = document.querySelector('.main-page__header');
        const height: number = icon.getBoundingClientRect().top + window.scrollY - header.getBoundingClientRect().height;

        window.scrollTo(
            0,
            iconValue.classList.contains('rotate-scroll-open') ? 0 : height
        );

        iconValue.classList.toggle('rotate-scroll-open');
        iconValue.style.transform =
            iconValue.classList.contains('rotate-scroll-close') ? 'rotate(90deg)' : 'rotate(270deg)';
        iconValue.classList.toggle('rotate-scroll-close');
    }

    public render(): JSX.Element {
        const buttons: any = [
            {text: 'Play', onClick: this.goSingle},
            {text: 'Login', onClick: this.goLogin},
            {text: 'Sign up', onClick: this.goSignup}
        ];
        const { user } = this.props;

        if (user.isAuthorized === null || user.isAuthorized === undefined) {
            return (
                <Loading />
            );
        }
        if (user.isAuthorized) {
            return (
                <Redirect to='/me/' />
            );
        }

        return (
            <div className='main-page'>
                <Header isAuth={false} className='main-page__header'/>
                <div className='main-page__content'>
                    <div className='main-page__content-row'>
                        <Menu buttons={buttons}/>
                    </div>
                </div>
            </div>
        );
    }

    private goLogin() {
        const { history } = this.props;
        history.push('/login');
    }

    private goSingle() {
        const { history } = this.props;
        history.push('/single/');
    }

    private goSignup() {
        const { history } = this.props;
        history.push('/signup');
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

import * as React from 'react';

import './MainPage.scss';

import Menu from '../../components/Menu/Menu';
import Trailer from '../../components/Trailer/Trailer';
import Header from '../../components/Header/Header';
import {Redirect} from 'react-router';

export default class MainPage extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.goLogin = this.goLogin.bind(this);
        this.goSignup = this.goSignup.bind(this);
    }

    public slide(event) {
        const iconValue: Element = event.target;
        const icon: Element = iconValue.parentElement;
        const header: Element = document.querySelector('.main-page__header');

        if (iconValue.classList.contains('rotate-scroll-close')) {
            window.scrollTo(0, icon.getBoundingClientRect().top + window.scrollY - header.getBoundingClientRect().height);
            iconValue.classList.add('rotate-scroll-open');
            iconValue.style.transform = 'rotate(90deg)';
            iconValue.classList.remove('rotate-scroll-close');
        } else {
            window.scrollTo(0, 0);
            iconValue.classList.add('rotate-scroll-close');
            iconValue.style.transform = 'rotate(270deg)';
            iconValue.classList.remove('rotate-scroll-open');
        }
    }

    public render() {
        const buttons: any = [
            {text: 'Play'},
            {text: 'Login', onClick: this.goLogin},
            {text: 'Sign up', onClick: this.goSignup}
        ];

        return (
            <div className='main-page'>
                <Header isAuth={false} className='main-page__header'/>
                <div className='main-page__content'>
                    <div className='main-page__content-row'>
                        <Menu buttons={buttons}/>
                        <div className='scroll'>
                            <div onClick={this.slide} className='scroll-icon rotate-scroll-close'/>
                        </div>
                    </div>
                    <div className='main-page__content-row main-page__content-row_low-height'>
                        <div className='main-page__content-description'>
                            <div className='text'>
                                <p className='text__data'>
                                    Deadlines - это игра, созданная по мотивам карты 101 rounds из популярной игры Warcraft.
                                    Управляя своим персонажем в пределах арены,
                                    уклоняйся от наплывающих со всех сторон и жаждущих тебя уничтожить врагов.
                                    Будь быстрым и внимательным. Объединяйся в команды с друзьями и придумывай стратегии победы.
                                    Оттачивай скилл и покажи, кто тут самый ловкий!
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='main-page__content-row main-page__content-row_low-height'>
                        <div className='main-page__content-trailer'>
                            <Trailer
                                src='https://www.youtube.com/embed/L3Mg6lk6yyA'
                                frameborder='0'
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private goLogin() {
        const { history } = this.props;
        history.push('/login');
    }

    private goSignup() {
        const { history } = this.props;
        history.push('/signup');
    }
}

import * as React from 'react';

import './MainPage.scss';
import Logo from '../../components/Logo/Logo';

import Menu from '../../components/Menu/Menu';
import Trailer from '../../components/Trailer/Trailer';
import Header from '../../components/Header/Header';

export default class MainPage extends React.Component<any, any> {

    public render() {
        return (
            <div className='main-page'>
                <Header className='main-page__header'/>
                <div className='main-page__content'>
                    <div className='main-page__content-row'>
                        <Menu buttons={['Play', 'Login', 'Sign up']}>
                        </Menu>
                        <div className='scroll'>
                            <div className='scroll-icon rotate-scroll-close'>
                            </div>
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
};

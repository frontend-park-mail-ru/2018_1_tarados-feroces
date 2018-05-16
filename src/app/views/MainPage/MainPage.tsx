import * as React from 'react';

import './MainPage.scss';


export default class MainPage extends React.Component<Interface, any> {

    public render() {
        return (
            <div className='main-page'>
                <Header className='main-page__header'>
                    <div className='header-logo'>
                        <div className='header-logo-content'>
                        </div>
                    </div>
                </Header>
                <div className='main-page__content'>
                    <div className='main-page__content-row'>
                        <Menu>
                            <MenuPoint>Play</MenuPoint>
                            <MenuPoint>Sign In</MenuPoint>
                            <MenuPoint>Sign Up</MenuPoint>
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
                                allow='autoplay; encrypted-media'
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

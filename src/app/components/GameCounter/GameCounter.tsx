import * as React from 'react';

import './GameCounter.scss';

interface IProps {
    scores?: any[];
}

export default class GameCounter extends React.Component<IProps, any> {

    public render(): JSX.Element {
        const {scores} = this.props;

        const rows = scores.map((element, key) => {
            return (<div key={key} className='counter__item'>
                <div className='counter__item-login'>{element.login}</div>
                <div className='counter__item-points'>{element.points}</div>
            </div>);
        });

        return (
            <div className='counter'>
                {rows}
            </div>
        );
    }
};

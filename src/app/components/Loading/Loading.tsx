import * as React from 'react';

import './Loading.scss';

export default class Loading extends React.Component<any, any> {

    public render(): JSX.Element {
        return (
            <div id="preloader">
                <div id="loader"></div>
            </div>
        );
    }
};

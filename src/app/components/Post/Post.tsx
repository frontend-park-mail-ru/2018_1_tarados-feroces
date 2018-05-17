import * as React from 'react';

import './Post.scss';

interface Props {
    className?: string;
    title?: string;
    datetime?: string;
    body?: string;
}

export default class Post extends React.Component<Props, any> {

    render() {
        const {className, title, datetime, body}: any = this.props;

        return (
            <div className={'post ' + className}>
                <div className="post__top-row">
                    <div className="post__title">
                        <p className="post__title-value">{title}</p>
                    </div>
                    <div className="post__datetime">
                        <p className="post__datetime-value">{datetime}</p>
                    </div>
                </div>
                <div className="bottom-row">
                    <div className="post__body">
                        <p className="post__body-value">{body}</p>
                    </div>
                </div>
            </div>
        );
    }
};

import * as React from 'react';

import './Post.scss';

interface IProps {
    className?: string;
    post?: any;
    key?: any;
}

export default class Post extends React.Component<IProps, any> {

    public render(): JSX.Element {
        const {className, post, key }: any = this.props;

        return (
            <div key={key} className={'post ' + className}>
                <div className="post__top-row">
                    <div className="post__title">
                        <p className="post__title-value">{post.title}</p>
                    </div>
                    <div className="post__datetime">
                        <p className="post__datetime-value">{post.datetime}</p>
                    </div>
                </div>
                <div className="bottom-row">
                    <div className="post__body">
                        <p className="post__body-value">{post.body}</p>
                    </div>
                </div>
            </div>
        );
    }
};

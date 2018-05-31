import * as React from 'react';

import './News.scss';

import {bindActionCreators} from 'redux';
import * as newsActions from '../../actions/LeaderboardActions';
import {connect} from 'react-redux';
import Post from '../Post/Post';

interface IProps {
    news?: any;
    newsActions?: any;
}

class News extends React.Component<IProps, any> {

    public render(): JSX.Element {
        const news = [
            {
                title: 'Deadlinez released!',
                datetime: '2.06.2018',
                body: 'Four months have passed since the start of the development of Deadlinez. ' +
                'Today we are glad to present you the release version of the project!',
            },
            {
                title: 'Redesign outcome',
                datetime: '29.05.2018',
                body: 'Redesign! We worked, painted and composed the colors. ' +
                'The flame and glow are chosen by us. There was a song of ice and fire.',
            },
            {
                title: 'Updated technology stack',
                datetime: '18.05.2018',
                body: 'Today we are glad to notify you that our site was completely rewritten on the modern ' +
                'framework - React!',
            }];

        if (!Object.keys(news).length) {
            return (
                <div></div>
            );
        }

        const rows = news.map((element, key) => {
            return (
                <Post key={key} post={element}/>
            );
        });

        return (
            <div className='news'>
                <div className='posts'>
                    {rows}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        news: state.news
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        newsActions: bindActionCreators(newsActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(News);

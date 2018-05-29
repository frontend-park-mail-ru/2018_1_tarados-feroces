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

    // public async componentWillMount() {
    //     // const { getNews } = this.props.newsActions;
    //     // await getNews( {position: 0, count: 9} );
    // }

    public render(): JSX.Element {
        const news = [
            {
                title: 'Such an amazing post 1',
                datetime: '13.04.2018',
                body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor\n' +
                'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud\n' +
                'exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure\n' +
                'dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            },
            {
                title: 'Such an amazing post from the future 2',
                datetime: '20.04.2018',
                body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor\n' +
                'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud\n' +
                'exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure\n' +
                'dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            },
            {
                title: 'Such an amazing post 3',
                datetime: '13.04.2018',
                body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor\n' +
                'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud\n' +
                'exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure\n' +
                'dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            }];
        console.log(news);

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

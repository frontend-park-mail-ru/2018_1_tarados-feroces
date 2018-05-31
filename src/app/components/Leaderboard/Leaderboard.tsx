import * as React from 'react';

import './Leaderboard.scss';

import {bindActionCreators} from 'redux';
import * as leaderActions from '../../actions/LeaderboardActions';
import {connect} from 'react-redux';

interface IProps {
    leaderboard?: any;
    leaderActions?: any;
}

class Leaderboard extends React.Component<IProps, any> {

    public async componentWillMount() {
        const { getLeaderboard } = this.props.leaderActions;
        await getLeaderboard( {position: 0, count: 9} );
    }

    public render(): JSX.Element {
        const { leaderboard } = this.props;
        console.log(leaderboard);

        if (!Object.keys(leaderboard).length) {
            return (
                <div></div>
            );
        }
        const headerPoints = ['Nickname', 'Points'];
        const users = leaderboard.data;
        const columns = headerPoints.map((header, key) => <div key={key} className='table__header'>{header}</div>);

        const header = (
            <div className='table__header-row'>
                {columns}
            </div>
        );

        const rows = users.map((element, key) => {
            return (
                <div key={key} className='table__row scoreboard__row'>
                    <div className='table__data'>{element.user.login}</div>
                    <div className='table__data'>{element.score.points}</div>
                </div>
            );
        });

        return (
            <div className='scoreboard'>
                <div className='table'>
                    {header}
                    {rows}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        leaderboard: state.leaderboard
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        leaderActions: bindActionCreators(leaderActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);

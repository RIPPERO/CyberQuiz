import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import store from '../../../AppStore/store';
import Header from '../../Header/Header';
import NotUsernameSet from '../../NotUsernameSet/NotUsernameSet';
import "../Leaderboard.scss";

function LeaderboardID(props) {
    const history = useHistory();
    const [leaderboard, setLeaderboard] = useState<any[]>([]);

    useEffect(() => {
        store.dispatch({
            type: "SET_HEADER",
            payload: {
                headerText: `Leaderboard for Quiz nr ${props.quiz_ID_for_leaderboard}!`,
            },
        })

        const API = `${props.apiUrl}leaderboard`;
        const get_leaderboard = props.quiz_ID_for_leaderboard;

        fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ get_leaderboard }),
        })
            .then((response) => response.json())
            .then(data => {
                setLeaderboard(data);
            })
    }, [props]);

    function goToLeaderboard() {
        history.push('/leaderboard');
    }

    if (props.usernameSet) {
        return (
            <div className="leaderboard-container">
                <Header />
                <div className="scroll" style={{ margin: "auto" }}>
                    {leaderboard.length > 0 &&
                        <div>
                            <div className="titleContainer">
                                <div className="titleContainer--item">
                                    <p className="font--medium--bold">Position</p>
                                </div>

                                <div className="titleContainer--item">
                                    <p className="font--medium--bold">Username</p>
                                </div>

                                <div className="titleContainer--item">
                                    <p className="font--medium--bold">Score</p>
                                </div>
                            </div>
                            <hr className="hr--main" />
                        </div>
                    }

                    {leaderboard.length > 0 && leaderboard.map((leaderboard, index) => {
                        return (
                            <div className="quizContainer" key={index}>
                                <div className="quizContainerRow">
                                    <p className="font--small"> {index + 1} </p>
                                </div>
                                <div className="quizContainerRow">
                                    <p className="font--small"> {leaderboard.username} </p>
                                </div>
                                <div className="quizContainerRow">
                                    <p className="font--small"> {leaderboard.final_score} </p>
                                </div>
                            </div>
                        )
                    })}

                    {leaderboard.length === 0 &&
                        <div className="titleContainer">
                            <p className="font--medium--bold">No one played this quiz yet!</p>
                        </div>
                    }
                </div>

                <div className="button-redirect">
                    <button className="button--main" onClick={() => goToLeaderboard()}>Go back</button>
                </div>
            </div>
        )
    }
    return (
        <NotUsernameSet />
    )
}

const mapStateToProps = (state) => {
    return {
        apiUrl: state.api.apiUrl,
        usernameSet: state.user.usernameSet,
        user_ID: state.quiz_user.user_ID,
        quiz_ID: state.quiz_user.quiz_ID_ID,
        quiz_ID_for_leaderboard: state.leaderboard.quiz_ID_for_leaderboard,
    }
}

export default connect(mapStateToProps)(LeaderboardID);

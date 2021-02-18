import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import store from '../../AppStore/store';
import { useHistory } from "react-router-dom";
import Header from '../Header/Header';
// import NotUsernameSet from '../NotUsernameSet/NotUsernameSet';
import "./Leaderboard.scss";

function Leaderboard(props) {
    const history = useHistory();
    const [quiz_list, setQuizList] = useState<any[]>([]);

    useEffect(() => {
        store.dispatch({
            type: "SET_HEADER",
            payload: {
                headerText: "Select a Quiz to see Leaderboard!",
            },
        })

        const API = `${props.apiUrl}quiz`;
        fetch(API)
            .then((response) => response.json())
            .then(data => {
                setQuizList(data);
            });
    }, [props]);

    function chooseQuiz(quiz_ID) {
        let quiz_ID_ID = quiz_ID;

        store.dispatch({
            type: "SET_QUIZ_ID_FOR_LEADERBOARD",
            payload: {
                quiz_ID_for_leaderboard: quiz_ID_ID,
            },
        })
        
        history.push(`/leaderboard/${props.quiz_ID_for_leaderboard}`);
    }

    // if (props.usernameSet) {
    return (
        <div className="leaderboard-container">
            <Header />
            <div className="scroll">
                <div className="titleContainer">
                    <div className="titleContainer--item">
                        <p className="font--medium--bold">Number</p>
                    </div>

                    <div className="titleContainer--item">
                        <p className="font--medium--bold">Name</p>
                    </div>
                </div>

                <hr className="hr--main" />

                {quiz_list.map((quiz) => {
                    return (
                        <div className="quizContainer" onClick={() => chooseQuiz(quiz.quiz_ID)} key={quiz.quiz_ID}>
                            <div className="quizContainerRow">
                                <p className="font--small"> {quiz.quiz_ID} </p>
                            </div>
                            <div className="quizContainerRow">
                                <p className="font--small"> {quiz.name} </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
//     return (
//         <NotUsernameSet />
//     )
// }

const mapStateToProps = (state) => {
    return {
        apiUrl: state.api.apiUrl,
        usernameSet: state.user.usernameSet,
        user_ID: state.quiz_user.user_ID,
        quiz_ID: state.quiz_user.quiz_ID_ID,
    }
}

export default connect(mapStateToProps)(Leaderboard);

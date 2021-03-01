import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import store from '../../AppStore/store';
import Header from '../Header/Header';
import NotUsernameSet from '../NotUsernameSet/NotUsernameSet';
import "./QuizUser.scss";

function QuizUser(props) {
    const history = useHistory();
    const [quiz_user, setQuizUser] = useState<any[]>([])

    useEffect(() => {
        store.dispatch({
            type: "SET_HEADER",
            payload: {
                headerText: "Your quizes!",
            },
        })

        const API = `${props.apiUrl}quiz_user`;
        const user_ID = props.user_ID;

        fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_ID }),
        })
            .then((response) => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    data[i].date = data[i].date.replace('Z', ' ').replace('T', ' ').slice(0, data[i].date.length - 5);
                }
                setQuizUser(data);
            });
    }, [props]);

    function chooseQuizUser(user_ID, quiz_ID, quiz_user_ID) {
        store.dispatch({
            type: "CHOOSE_QUIZ_USER",
            payload: {
                user_ID: user_ID,
                quiz_ID_ID: quiz_ID,
                quiz_user_ID: quiz_user_ID,
            },
        })

        history.push('/answer-user');
    }

    function goToLeaderboard() {
        history.push('/leaderboard');
    }

    function showCharts() {
        history.push('/chart');
    }

    function anotherQuiz() {
        store.dispatch({
            type: "UPDATE_SCORE",
            payload: {
                score: 0,
            },
        })

        store.dispatch({
            type: "INCREASE_QUESTION_NUMBER",
            payload: {
                questionNumber: 0,
            }
        })

        history.push('/quiz');
    }

    if (props.usernameSet) {
        return (
            <div className="quiz-user-container">
                <Header />
                <div className="scroll" style={{margin: "auto"}}>
                    <div className="titleContainer">
                        <div className="titleContainer--item">
                            <p className="font--medium--bold">Quiz name</p>
                        </div>

                        <div className="titleContainer--item">
                            <p className="font--medium--bold">Your points</p>
                        </div>

                        <div className="titleContainer--item">
                            <p className="font--medium--bold">Date and time</p>
                        </div>
                    </div>

                    <hr className="hr--main" />

                    {quiz_user.map((quiz_user) => {
                        return (
                            <div className="quizContainer" onClick={() => chooseQuizUser(quiz_user.user_ID_ID, quiz_user.quiz_ID_ID, quiz_user.quiz_user_ID)} key={quiz_user.quiz_user_ID}>
                                <div className="quizContainerRow">
                                    <p className="font--small"> {quiz_user.name} </p>
                                </div>

                                <div className="quizContainerRow">
                                    <p className="font--small"> {quiz_user.final_score} </p>
                                </div>

                                <div className="quizContainerRow">
                                    <p className="font--small"> {quiz_user.date} </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                
                <div className="button-redirect">
                    <button className="button--main" onClick={() => goToLeaderboard()}>Show Leaderboard</button>
                    <button className="button--main--red" style={{marginLeft: "15px"}} onClick={() => anotherQuiz()}>Play another quiz</button>
                    <button className="button--main" style={{marginLeft: "15px"}} onClick={() => showCharts()}>Show Charts</button>
                </div>
            </div>
        );
    }
    return (
        <NotUsernameSet />
    )
}

const mapStateToProps = (state) => {
    return {
        apiUrl: state.api.apiUrl,
        usernameSet: state.user.usernameSet,
        user_ID: state.user.user_ID,
    }
}

export default connect(mapStateToProps)(QuizUser);

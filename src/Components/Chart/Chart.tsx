import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import store from '../../AppStore/store';
import Header from '../Header/Header';
import NotUsernameSet from '../NotUsernameSet/NotUsernameSet';
import "./Chart.scss";

function Chart(props) {
    const history = useHistory();
    const [quiz, setQuiz] = useState<any[]>([]);

    useEffect(() => {
        store.dispatch({
            type: "SET_HEADER",
            payload: {
                headerText: "Select a quiz to see the chart!",
            },
        })

        const API = `${props.apiUrl}quiz`;
        fetch(API)
            .then((response) => response.json())
            .then(data => {
                setQuiz(data);
            });

    }, [props.apiUrl]);

    function chooseQuiz(quiz_ID) {
        store.dispatch({
            type: "SET_QUIZ_ID",
            payload: {
                quiz_ID: quiz_ID,
            }
        })

        history.push(`/chart/${quiz_ID}`);
    }

    function goToQuizUser() {
        history.push('/quiz-user');
    }

    if (props.usernameSet) {
        return (
            <div className="chart-container">
                <Header />
                <div className="chartDiv">
                    {quiz.map((quiz) => {
                        return (
                            <div className="quizContainer" onClick={() => chooseQuiz(quiz.quiz_ID)} key={quiz.quiz_ID}>
                                <div className="quizContainerRow">
                                    <p className="font--small"> {quiz.name} </p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="button-redirect">
                    <button className="button--main" onClick={() => goToQuizUser()}>Go back</button>
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
    }
}

export default connect(mapStateToProps)(Chart);

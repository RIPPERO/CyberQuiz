import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import store from '../../AppStore/store';
import Header from '../Header/Header';
import NotUsernameSet from '../NotUsernameSet/NotUsernameSet';
import "./AnswerUser.scss";

function AnswerUser(props) {
    const [answer_user, setAnswerUser] = useState<any[]>([]);

    useEffect(() => {
        store.dispatch({
            type: "SET_HEADER",
            payload: {
                headerText: "Your answers!",
            },
        })

        const API = `${props.apiUrl}answer-user`;
        const answer_user_json = { user_ID_ID: props.user_ID, quiz_ID: props.quiz_ID, quiz_user_ID_ID: props.quiz_user_ID };

        fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answer_user_json }),
        })
            .then((response) => response.json())
            .then(data => {
                setAnswerUser(data);
            });
    }, [props]);

    if (props.usernameSet) {
        return (
            <div className="quiz-user-container">
                <Header />
                <div className="scroll">
                    <div className="titleContainer">
                        <div className="titleContainer--item">
                            <p className="font--medium--bold">Question</p>
                        </div>

                        <div className="titleContainer--item">
                            <p className="font--medium--bold">Answer</p>
                        </div>
                    </div>

                    <hr className="hr--main" />

                    {answer_user.map((answer_user) => {
                        return (
                            <div className="quizContainer" key={answer_user.answer_user_ID}>
                                <div className="quizContainerRow">
                                    <p className="font--small"> {answer_user.question} </p>
                                </div>

                                <div className="quizContainerRow">
                                    <p className="font--small"> {answer_user.answer} </p>
                                </div>
                            </div>
                        )
                    })}
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
        user_ID: state.quiz_user.user_ID,
        quiz_ID: state.quiz_user.quiz_ID_ID,
        quiz_user_ID: state.quiz_user.quiz_user_ID,
    }
}

export default connect(mapStateToProps)(AnswerUser);

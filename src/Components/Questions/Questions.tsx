import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import store from '../../AppStore/store';
import Header from '../Header/Header';
// import NotUsernameSet from '../NotUsernameSet/NotUsernameSet';
import "./Questions.scss";

interface security {
    apiUrl: string,
    usernameSet: boolean,
    user_ID: string,
    quiz_ID: number,
    score: number,
    questionNumber: number,
}

interface displayQuestions {
    questionArray: any[],
    answersArray: any[],
    isCorrectAnswer: any,
    question: string,
    questionID: number,
    redirectToMiniGame: boolean,
    redirectToQuizUser: boolean,
}

class Questions extends Component<security> {

    state: displayQuestions = {
        questionArray: [],
        answersArray: [],
        isCorrectAnswer: 0,
        question: "",
        questionID: 0,
        redirectToMiniGame: false,
        redirectToQuizUser: false,
    }

    componentDidMount() {
        const API = `${this.props.apiUrl}question`;
        let quiz_ID_ID = this.props.quiz_ID;

        fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quiz_ID_ID }),
        })
            .then((response) => response.json())

            .then(data => {
                this.setState({
                    questionArray: data,
                    question: data[this.props.questionNumber].question,
                    questionID: data[this.props.questionNumber].question_ID,
                });

                const API1 = `${this.props.apiUrl}answers`;
                let questionID = this.state.questionID;

                fetch(API1, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ questionID }),
                })
                    .then((response) => response.json())

                    .then(data1 => {
                        this.setState({
                            answersArray: data1,
                        })
                    })
            })

        store.dispatch({
            type: "SET_HEADER",
            payload: {
                headerText: "Answer a Question!",
            },
        })
    }

    chooseAnswer(answerID) {
        const API2 = `${this.props.apiUrl}answers/check`;

        fetch(API2, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answerID }),
        })
            .then((response) => response.json())

            .then(data2 => {
                this.setState({
                    isCorrectAnswer: data2[0].is_correct,
                })

                let answer = parseInt(this.state.isCorrectAnswer, 10);

                if (this.state.questionArray.length === this.props.questionNumber + 1) {
                    if (answer === 1) {
                        store.dispatch({
                            type: "UPDATE_SCORE",
                            payload: {
                                score: this.props.score + 1,
                            },
                        })

                        this.setRedirectToQuizUser();
                    }
                    else {
                        this.setRedirectToQuizUser();
                    }

                    const API3 = `${this.props.apiUrl}quiz-user/add`;

                    const quiz_user_json = { score: this.props.score, quiz_ID: this.props.quiz_ID, user_ID_ID: this.props.user_ID };

                    fetch(API3, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ quiz_user_json }),
                    })


                    // const answer_user_json = { };
                    // const API4 = `${this.props.apiUrl}answer-user/add`;
                    // fetch(API4, {
                    //     method: 'POST',
                    //     headers: {
                    //         'Content-Type': 'application/json',
                    //     },
                    //     body: JSON.stringify({ answer_user_json }),
                    // })
                }
                else {
                    if (answer === 1) {
                        store.dispatch({
                            type: "UPDATE_SCORE",
                            payload: {
                                score: this.props.score + 1,
                            },
                        })

                        store.dispatch({
                            type: "INCREASE_QUESTION_NUMBER",
                            payload: {
                                questionNumber: this.props.questionNumber + 1,
                            }
                        })

                        this.componentDidMount();
                    }
                    else {
                        store.dispatch({
                            type: "INCREASE_QUESTION_NUMBER",
                            payload: {
                                questionNumber: this.props.questionNumber + 1,
                            }
                        })

                        this.setRedirectToMiniGame();
                    }
                }
            })
    }

    setRedirectToMiniGame = () => {
        this.setState({
            redirectToMiniGame: true,
        })
    }

    setRedirectToQuizUser = () => {
        this.setState({
            redirectToQuizUser: true,
        })
    }

    renderRedirectToMiniGame = () => {
        if (this.state.redirectToMiniGame) {
            return <Redirect to='/minigame' />
        }
    }

    renderRedirectToQuizUser = () => {
        if (this.state.redirectToQuizUser) {
            return <Redirect to='/quiz-user' />
        }
    }

    render() {
        return (
            <div className="questions-container">
                {this.renderRedirectToMiniGame()}
                {this.renderRedirectToQuizUser()}
                <Header />

                <div className="questionAnswers">
                    <div className="questionText">
                        <p className="font--medium">{this.state.question}</p>
                        <p className="font--small">Score: {this.props.score}</p>
                    </div>

                    <div className="answers">
                        {this.state.answersArray.map((answers) => {
                            return (
                                <div className="answerRow" onClick={() => this.chooseAnswer(answers.answer_ID)} key={answers.answer_ID}>
                                    <p className="font--small">{answers.answer}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        apiUrl: state.api.apiUrl,
        usernameSet: state.user.usernameSet,
        user_ID: state.user.user_ID,
        quiz_ID: state.quiz.quiz_ID,
        score: state.question.score,
        questionNumber: state.question.questionNumber,
    }
}

export default connect(mapStateToProps)(Questions);

import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import store from '../../AppStore/store';
// import NotUsernameSet from '../NotUsernameSet/NotUsernameSet';
import "./Questions.scss";

interface security {
    apiUrl: string,
    usernameSet: boolean,
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
    redirect: boolean,
}

class Questions extends Component<security> {

    state: displayQuestions = {
        questionArray: [],
        answersArray: [],
        isCorrectAnswer: 0,
        question: "",
        questionID: 0,
        redirect: false,
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

                if (answer === 1) {
                    console.log("poprawna odp");
                    store.dispatch({
                        type: "UPDATE_SCORE",
                        payload: {
                            score: this.props.score + 1,
                        },
                    })
                    if (this.state.questionArray.length === this.props.questionNumber + 1) {
                        console.log("koniec pytań");
                    }
                    else {
                        store.dispatch({
                            type: "INCREASE_QUESTION_NUMBER",
                            payload: {
                                questionNumber: this.props.questionNumber + 1,
                            }
                        })
                    }
                    this.componentDidMount();
                }
                else {
                    console.log("błędna odp");
                }
            })
    }

    setRedirect = () => {
        this.setState({
            redirect: true,
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/minigame' />
        }
    }

    render() {
        return (
            <div className="questions-container">
                <p className="font--big">Answer a Question!</p>
                <p className="font--small"> {this.state.question} </p>
                <p className="font--small"> Score: {this.props.score} </p>

                {this.renderRedirect()}

                {this.state.answersArray.map((answers) => {
                    return (
                        <div className="quizContainer" onClick={() => this.chooseAnswer(answers.answer_ID)} key={answers.answer_ID}>
                            <div className="quizContainerRow">
                                <p className="font--small"> {answers.answer} </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        apiUrl: state.api.apiUrl,
        usernameSet: state.security.usernameSet,
        quiz_ID: state.quiz.quiz_ID,
        score: state.question.score,
        questionNumber: state.question.questionNumber,
    }
}

export default connect(mapStateToProps)(Questions);

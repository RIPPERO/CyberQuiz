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
    data: any[],
    data1: any[],
    data2: any[],
    question: string,
    questionID: number,
    redirect: boolean,
}

class Questions extends Component<security> {

    state: displayQuestions = {
        data: [],
        data1: [],
        data2: [],
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
                    data: data,
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
                            data1: data1,
                        })
                    })
            })
    }

    chooseAnswer(answerID) {
        const API2 = `${this.props.apiUrl}answers/check`;
        let questionIDID = this.state.questionID;

        fetch(API2, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ questionIDID }),
        })
            .then((response) => response.text())

            .then(data2 => {
                this.setState({
                    data2: data2,
                })

                console.log(data2);

                console.log(answerID);


                // for (let i = 0; i < data2.length; i++) {

                //     if((data2[i].answer_ID === answerID && data2[i].is_correct === '1') === true) {
                //         console.log("true");
                //     }

                //     console.log(data2[i].answer_ID === answerID && data2[i].is_correct === '1');
                // }

                // if (data2[answerID - 1].is_correct === '1') {

                if (data2.includes(`"answer_ID":${answerID},"is_correct":"1"`)) {
                    console.log("Poprawna odp")
                    store.dispatch({
                        type: "UPDATE_SCORE",
                        payload: {
                            score: this.props.score + 1,
                        },
                    })

                    console.log(this.state.data)
                    if (this.state.data.length === this.props.questionNumber + 1) {
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
                    // this.setRedirect();
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
                <p className="font--small"> ID: {this.state.questionID} </p>

                {this.renderRedirect()}

                {this.state.data1.map((answers) => {
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
        score: state.questionNumber.score,
        questionNumber: state.questionNumber.questionNumber,
    }
}

export default connect(mapStateToProps)(Questions);

import React, { Component } from 'react';
import { connect } from "react-redux";
import store from '../../AppStore/store';
// import NotUsernameSet from '../NotUsernameSet/NotUsernameSet';
import "./Questions.scss";

interface security {
    apiUrl: string,
    usernameSet: boolean,
    quiz_ID: number,
}

interface displayQuestions {
    data: any[],
    data1: any[],
    question: string,
    questionID: number,
}

class Questions extends Component<security> {

    state: displayQuestions = {
        data: [],
        data1: [],
        question: "",
        questionID: 0,
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
                    question: data[0].question,
                    questionID: data[0].question_ID,
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
                        console.log(this.state.data1);
                    })
            })
    }

    answer() {
        store.dispatch({
            type: "INCREASE_QUESTION_NUMBER",
            payload: {
                questionNumber: + 1,
            }
        })
    }

    render() {
        return (
            <div className="questions-container">
                <p className="font--big">Answer a Question!</p>
                <p className="font--small"> {this.state.question} </p>
                <p className="font--small"> ID: {this.state.questionID} </p>

                {this.state.data1.map((answers) => {
                    return (
                        <div className="quizContainer" key={answers.answer_ID}>
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
    }
}

export default connect(mapStateToProps)(Questions);

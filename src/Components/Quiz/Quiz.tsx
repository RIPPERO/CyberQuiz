import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import store from '../../AppStore/store';
// import NotUsernameSet from '../NotUsernameSet/NotUsernameSet';
import "./Quiz.scss";

interface security {
    apiUrl: string,
    usernameSet: boolean,
}

interface displayQuiz {
    data: any[],
    redirect: boolean,
}

class Quiz extends Component<security> {

    state: displayQuiz = {
        data: [],
        redirect: false,
    }

    componentDidMount() {
        const API = `${this.props.apiUrl}quiz`;
        fetch(API)
            .then((response) => response.json())
            .then(data => {
                this.setState({
                    data: data,
                });
            });
    }

    chooseQuiz(quiz_ID) {
        let quiz_ID_ID = quiz_ID;

        store.dispatch({
            type: "SET_QUIZ_ID",
            payload: {
                quiz_ID: quiz_ID_ID,
            },
        })
        this.setRedirect();
    }

    setRedirect = () => {
        this.setState({
            redirect: true,
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/questions' />
        }
    }

    render() {
        // if (this.props.usernameSet) {
        return (
            <div className="quiz-container">
                <p className="font--big">Select a Quiz!</p>
                {this.renderRedirect()}

                <div className="scroll">
                    <div className="titleContainer">
                        <div className="titleContainer--item">
                            <p className="font--medium--bold">Number</p>
                        </div>

                        <div className="titleContainer--item">
                            <p className="font--medium--bold">Name</p>
                        </div>

                        <div className="titleContainer--item">
                            <p className="font--medium--bold">Max Points</p>
                        </div>
                    </div>

                    <hr className="hr--main" />

                    {this.state.data.map((quiz) => {
                        return (
                            <div className="quizContainer" onClick={() => this.chooseQuiz(quiz.quiz_ID)} key={quiz.quiz_ID}>
                                <div className="quizContainerRow">
                                    <p className="font--small"> {quiz.quiz_ID} </p>
                                </div>
                                <div className="quizContainerRow">
                                    <p className="font--small"> {quiz.name} </p>
                                </div>
                                <div className="quizContainerRow">
                                    <p className="font--small"> {quiz.max_points} </p>
                                </div>
                            </div>
                        )
                    })}

                </div>


            </div>
        )
    }
    // return (
    //     <NotUsernameSet />
    // )
}
// }

const mapStateToProps = (state) => {
    return {
        apiUrl: state.api.apiUrl,
        usernameSet: state.security.usernameSet,
    };
};

export default connect(mapStateToProps)(Quiz);

import React, { Component } from 'react';
import { connect } from "react-redux";
// import NotUsernameSet from '../NotUsernameSet/NotUsernameSet';
// import { Link } from "react-router-dom";
import "./Quiz.scss";

interface security {
    apiUrl: string,
    usernameSet: boolean,
}

interface displayQuiz {
    data: any[],
}

class Quiz extends Component<security> {
    API = `${this.props.apiUrl}quiz`;

    state: displayQuiz = {
        data: [],
    }

    componentDidMount() {
        fetch(this.API)
            .then((response) => response.json())
            .then(data => {
                this.setState({
                    data: data,
                });
            });
    }

    chooseQuiz(quiz_ID) {
        console.log(quiz_ID);
    }

    render() {
        // if (this.props.usernameSet) {
        return (
            <div className="quiz-container">
                <p className="font--big">Select a Quiz!</p>

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

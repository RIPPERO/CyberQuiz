import React, { Component } from 'react';
import { connect } from "react-redux";
import NotUsernameSet from '../NotUsernameSet/NotUsernameSet';
// import { Link } from "react-router-dom";
import "./Quiz.scss";

interface security {
    usernameSet: boolean,
}

class Quiz extends Component<security> {
    render() {
        if (this.props.usernameSet) {
            return (
                <div className="quiz-container">
                    <span className="font--big">Quiz!</span>
                </div>
            )
        }
        return (
            <NotUsernameSet />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        usernameSet: state.security.usernameSet,
    };
};

export default connect(mapStateToProps)(Quiz);

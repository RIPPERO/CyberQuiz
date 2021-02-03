import React, { Component } from 'react';
import { connect } from "react-redux";
// import NotUsernameSet from '../NotUsernameSet/NotUsernameSet';
import "./MiniGame.scss";

interface security {
    apiUrl: string,
    usernameSet: boolean,
    quiz_ID: number,
}

class MiniGame extends Component<security> {
    render() {
        return (
            <div className="minigame-container">
                <p className="font--big">MiniGame!</p>
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

export default connect(mapStateToProps)(MiniGame);

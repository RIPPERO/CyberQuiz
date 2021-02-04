import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router';
// import NotUsernameSet from '../NotUsernameSet/NotUsernameSet';
import "./MiniGame.scss";

interface security {
    apiUrl: string,
    usernameSet: boolean,
    quiz_ID: number,
}

interface miniGame {
    redirect: boolean,
}

class MiniGame extends Component<security> {

    state: miniGame = {
        redirect: false,
    }

    clickButton() {
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
        return (
            <div className="minigame-container">
                <p className="font--big">MiniGame!</p>
                <p className="font--small">It was a wrong answer. You have to play a minigame to back to the quiz.</p>
                <button className="button--main" onClick={() => this.clickButton()}>Go back to question</button>
                {this.renderRedirect()}
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

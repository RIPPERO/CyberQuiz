import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import store from '../../AppStore/store';
import Header from '../Header/Header';
// import NotUsernameSet from '../NotUsernameSet/NotUsernameSet';
import "./MiniGame.scss";

interface security {
    apiUrl: string,
    quiz_ID: number,
}

interface miniGame {
    redirect: boolean,
    showRules: boolean,
    klasa: string,
    miniGameScore: number,
    hide: boolean
}

class MiniGame extends Component<security> {

    state: miniGame = {
        redirect: false,
        showRules: false,
        klasa: "rules",
        miniGameScore: 0,
        hide: true,
    }

    componentDidMount() {
        store.dispatch({
            type: "SET_HEADER",
            payload: {
                headerText: "Minigame!",
            },
        })
    }

    setRedirect() {
        this.setState({
            redirect: true,
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/questions' />
        }
    }

    toogleRules() {
        if (this.state.klasa === "rules") {
            this.setState({
                showRules: !this.state.showRules,
                klasa: "rules activeRules",
            })
        }

        else {
            this.setState({
                showRules: !this.state.showRules,
                klasa: "rules",
            })
        }
    }

    drawNumber() {
        let score = Math.floor(Math.random() * (6 - 1)) + 1;
        this.setState({
            miniGameScore: this.state.miniGameScore + score,
            hide: false,
        })
    }

    drawNumber18() {
        let score = Math.floor(Math.random() * (9 - 1)) + 1;
        this.setState({
            miniGameScore: this.state.miniGameScore + score,
        }, () => this.checkWin())
    }

    drawNumber47() {
        let score = Math.floor(Math.random() * (8 - 4)) + 4;
        this.setState({
            miniGameScore: this.state.miniGameScore + score,
        }, () => this.checkWin())
    }

    checkWin() {
        if (this.state.miniGameScore >= 18 && this.state.miniGameScore <= 20) {
            alert(`Good job! You have ${this.state.miniGameScore} points! Now you will return to question!`);
            this.setRedirect();
        }
        else if (this.state.miniGameScore > 20) {
            alert("Oh... You lost!");
        }
    }

    render() {
        return (
            <div className="minigame-container">
                {this.renderRedirect()}
                <Header />

                <div className="minigameDiv">
                    <p className="font--medium margin">You have to win this minigame to back to the quiz.</p>
                    <button className="button--main" onClick={() => this.toogleRules()}>Rules</button>

                    <div className={this.state.klasa}>
                        <p className="font--small">You need to gather 18-20 points to win.</p>
                        <p className="font--small">You start with 1-5 points.</p>
                        <p className="font--small">You can select which range of points you would like to get: 1-8 or 4-7.</p>
                    </div>

                    <p className="padding-sml font--small">Score: {this.state.miniGameScore}</p>

                    {this.state.hide && (
                        <div className="padding-sml">
                            <button className="button--main" onClick={() => this.drawNumber()}> Draw a number 1-5 </button>
                        </div>
                    )}

                    {!this.state.hide && (
                        <div className="padding-sml draw-buttons">
                            <button className="button--main" onClick={() => this.drawNumber18()}> Draw a number 1-8 </button>
                            <button className="button--main" style={{ marginTop: "10px" }} onClick={() => this.drawNumber47()}> Draw a number 4-7</button>
                        </div>
                    )}
                </div>
            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        apiUrl: state.api.apiUrl,
        usernameSet: state.security.usernameSet,
    }
}

export default connect(mapStateToProps)(MiniGame);

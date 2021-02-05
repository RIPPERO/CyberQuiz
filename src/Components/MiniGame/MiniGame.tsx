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
}

class MiniGame extends Component<security> {

    state: miniGame = {
        redirect: false,
        showRules: false,
        klasa: "h-0"
    }

    componentDidMount() {
        store.dispatch({
            type: "SET_HEADER",
            payload: {
                headerText: "Minigame!",
            },
        })
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

    toogleRules() {
        if (this.state.klasa === "h-0") {
            this.setState({
                showRules: !this.state.showRules,
                klasa: "h-1",
            })
        }
        
        else {
            this.setState({
                showRules: !this.state.showRules,
                klasa: "h-0",
            })
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

                    {this.state.showRules && (<div className={this.state.klasa}><p className="font--small">You need to gather 18-20 points to win</p>
                        <p className="font--small">You start with 1-5 points</p>
                        <p className="font--small">You can select which range of points you would like to get: 1-8 or 4-7.</p></div>)}

                    <button className="button--main" onClick={() => this.clickButton()}>Go back to question</button>
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

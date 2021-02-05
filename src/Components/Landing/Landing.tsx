import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./Landing.scss";

export default class Landing extends Component {
    render() {
        return (
            <div className="landing-container">
                <div className="margin">
                    <span className="font--big">Cyber Quiz</span>
                </div>

                <div>
                    <Link to="/createuser">
                        <button className="button--main">Let's Start!</button>
                    </Link>
                </div>
            </div>
        )
    }
}

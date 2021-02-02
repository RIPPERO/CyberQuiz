import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./NotUsernameSet.scss";

export default class PageNotFound extends Component {
    render() {
        return (
            <div className="notUsernameSet-container">
                <div className="font--big">
                    You did not set your username!
                </div>

                <div>
                    <Link to="/">
                        <button className="button--main">GO TO LANDING PAGE</button>
                    </Link>
                </div>
            </div>
        )
    }
}
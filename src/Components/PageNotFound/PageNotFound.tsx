import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./PageNotFound.scss";

export default class PageNotFound extends Component {
    render() {
        return (
            <div className="pageNotFound-container">
                <div className="font--big">
                    404!
                </div>

                <div>
                    <Link to="/">
                        <button>GO TO LANDING PAGE</button>
                    </Link>
                </div>
            </div>
        )
    }
}
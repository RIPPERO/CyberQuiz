import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import store from '../../AppStore/store';
import "./CreateUser.scss";

import Header from "../Header/Header";

function CreateUser(props) {
    const history = useHistory();
    const [username, setUsername] = useState("");

    function handleChange(e) {
        setUsername(e.target.value);
    }

    useEffect(() => {
        setHeaderText();
    }, []);

    function setHeaderText() {
        store.dispatch({
            type: "SET_HEADER",
            payload: {
                headerText: "Enter a username!",
            },
        })
    }

    function createUser() {
        let name = username.toUpperCase();
        const API = `${props.apiUrl}user/post`;
        const API1 = `${props.apiUrl}user`;

        if (name === "") {
            alert("Username cannot be blank!");
        }
        else if (name.length < 3 || name.length > 10) {
            alert("Username cannot be shorter than 3 and longer than 10 characters!");
        }
        else {
            fetch(API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            })
                .then(response => {
                    return response.text();
                })

                .then(data => {
                    function IsJson(data) {
                        try {
                            JSON.parse(data);
                        }
                        catch (e) {
                            return false;
                        }
                        return true;
                    }

                    if (IsJson(data) === false) {
                        fetch(API1)
                            .then((response) => response.json())
                            .then(dataID => {
                                let id_usera = dataID[dataID.length - 1].user_ID;
                                store.dispatch({
                                    type: "SET_USERNAME",
                                    payload: {
                                        username: name,
                                        user_ID: id_usera,
                                    },
                                })
                            })

                        alert(`Username ${name} added!`);
                        history.push('/quiz');
                    }

                    else {
                        let obj = JSON.parse(data);
                        if (obj.code === "ER_DUP_ENTRY") {
                            alert(`Username ${name} already exists. Choose a different one!`);
                        }
                        else if (obj.code === "ER_BAD_DB_ERROR") {
                            alert("Bad database name!");
                        }
                        else {
                            alert("Other error!\n" + obj.code);
                        }
                    }
                })
        }
    }

    return (
        <div className="create-user-container">
            <Header />

            <div className="inputContainer">
                <input className="input--main upper" type="text" name="username" placeholder="username" onChange={handleChange} />
                <button className="button--main" onClick={createUser}>Start!</button>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        apiUrl: state.api.apiUrl,
    }
}

export default connect(mapStateToProps)(CreateUser);

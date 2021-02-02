import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import store from '../../AppStore/store';
import "./CreateUser.scss";

function CreateUser() {
    const history = useHistory();
    const [username, setUsername] = useState("");

    function handleChange(e) {
        setUsername(e.target.value);
    }

    function createUser() {
        let name = username.toUpperCase();

        if (name === "") {
            alert("Username cannot be blank!");
        }
        else if (name.length < 3) {
            alert("Username cannot be shorter than 3 characters!");
        }
        else {
            fetch('http://localhost:3001/user/post', {
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
                    function IsJson(data){
                        try {
                            JSON.parse(data);
                        }
                        catch(e) {
                            return false;
                        }
                        return true;
                    }

                    if (IsJson(data) === false) {
                        store.dispatch({
                            type: "SET_USERNAME"
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
                });
        }
    }

    return (
        <div className="create-user-container">
            <input className="input--main upper" type="text" name="username" placeholder="Enter Username!" onChange={handleChange} />

            <div>
                <button className="button--main" onClick={createUser}>Start!</button>
            </div>
        </div>
    );
}

export default CreateUser;

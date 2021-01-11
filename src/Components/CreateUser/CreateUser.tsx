import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import "./CreateUser.scss";

function CreateUser() {
    const history = useHistory();
    const [username, setState] = useState("");
    function handleChange(e: any) {
        setState(e.target.value);
    }

    function createUser() {
        let name = username;

        if (name === "") {
            alert("Username cannot be blank!");
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
                    if (data === `Username ${name} already exists. Choose a different one!`) {
                        alert(`Username ${name} already exists. Choose a different one!`);
                        // can be better error handling
                    }
                    else if (data === "Bad database name!") {
                        alert("Bad database name!");
                        // can be better error handling
                    }
                    else {
                        // console.log(data);
                        alert(`Username ${name} added!`)
                        history.push('/quiz')
                    }
                });
        }
    }

    return (
        <div className="create-user-container">
            <input className="input--main" type="text" name="username" placeholder="Enter Username!" onChange={handleChange} />

            <div>
                <button className="button--main" onClick={createUser}>Start!</button>
            </div>
        </div>
    );
}

export default CreateUser;

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
        let name = username.toUpperCase();

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
                    try {
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

                    catch (e) {
                        alert(`Username ${name} added!`)
                        history.push('/quiz')
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

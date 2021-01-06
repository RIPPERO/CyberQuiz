import React, { useState } from 'react';
import "./CreateUser.scss";

function CreateUser() {

    const [username, setState] = useState("");
    function handleChange(e: any) {
        setState(e.target.value);
    }

    function createUser() {
        let name = username;

        if (name === "") {
            alert("Username cannot be blank!");
        }
        // else if ( ) {
        //     alert(`Username ${name} already exists. Choose a different one!`);
        // }
        else {
            fetch('http://localhost:3001/user', {
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
                    console.log(data);
                });
        }
    }

    return (
        <div className="create-user-container">
            <span className="font--big">
                Add user!
            </span>

            <input className="input--main" type="text" name="username" placeholder="Enter Username!" onChange={handleChange} />

            <div>
                <button className="button--main" onClick={createUser}>Add!</button>
            </div>
        </div>
    );
}

export default CreateUser;

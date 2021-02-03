import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import "./ShowUsers.scss";

function ShowUsers(props) {
  const [user, setUsers] = useState<any[]>([])

  useEffect(() => {
    const getUsers = () => {
      const API = `${props.apiUrl}user`;
      fetch(API)
        .then((response) => response.json())
        .then(data => {
          setUsers(data);
        });
    }
    getUsers();
  }, [props.apiUrl]);

  function chooseUser(user_ID) {
    console.log(user_ID);
  }

  return (
    <div className="quiz-container">
      <p className="font--big">List of users in the database</p>

      <div className="scroll">
        <div className="titleContainer">
          <div className="titleContainer--item">
            <p className="font--medium--bold">ID</p>
          </div>

          <div className="titleContainer--item">
            <p className="font--medium--bold">Username</p>
          </div>
        </div>

        <hr className="hr--main" />

        {user.map((users) => {
          return (
            <div className="quizContainer" onClick={() => chooseUser(users.user_ID)} key={users.user_ID}>
              <div className="quizContainerRow">
                <p className="font--small"> {users.user_ID} </p>
              </div>

              <div className="quizContainerRow">
                <p className="font--small"> {users.username} </p>
              </div>
            </div>
          )
        })}

      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    apiUrl: state.api.apiUrl,
  }
}

export default connect(mapStateToProps)(ShowUsers);

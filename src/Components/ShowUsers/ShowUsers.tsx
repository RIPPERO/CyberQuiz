import React, { useState, useEffect } from 'react';
import "./ShowUsers.scss";

function ShowUsers() {
  const [user, setUser] = useState([]);
  const [user_ID, setUserID] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    fetch('http://localhost:3001/user')
      .then(response => {
        return response.text();
      })
      .then(data => {
        let obj = JSON.parse(data);
        let nick: any = [];
        let nickID: any = [];

        for (let i = 0; i < obj.length; i++) {
          nick[i] = obj[i].username;
          nickID[i] = obj[i].user_ID;
        }

        setUser(nick);
        setUserID(nickID);
      });
  }

  return (
    <div className="d-flex-row">
      <div className="nickID">
        <table>
          <tbody>
            {user_ID.map((name, index) => (
              <tr className="username" key={index}>
                <td>{name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="nickID">
        <table>
          <tbody>
            {user.map((name_ID, ID_index) => (
              <tr className="username" key={ID_index}>
                <td>{name_ID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShowUsers;

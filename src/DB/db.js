import React, { useState, useEffect } from 'react';

function Test() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        let obj = JSON.parse(data);
        let wynik = [];

        for (let i = 0; i < obj.length; i++) {
          wynik[i] = obj[i].username;
        }

        setUser(wynik);
      });
  }

  return (
    <div className="test1234">
      {user.map((name, index) => (
        <div className="username" key={index}> {name} </div>
      ))}
    </div>
  );
}

export default Test;
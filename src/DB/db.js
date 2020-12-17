import React, {useState, useEffect} from 'react';
function Test() {
  const [user, setUser] = useState(false);
  useEffect(() => {
    getUsers();
  }, []);
  function getUsers() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setUser(data);
      });
  }
  function createUser() {
    let name = prompt('Enter user name');
    fetch('http://localhost:3001/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getUsers();
      });
  }
  function deleteUser() {
    let id = prompt('Enter user id');
    fetch(`http://localhost:3001/user/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getUsers();
      });
  }
  return (
    <div>
      {user ? user : 'There is no user data available'}
      <br />
      <button onClick={createUser}>Add user</button>
      <br />
      <button onClick={deleteUser}>Delete user</button>
    </div>
  );
}
export default Test;
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'adrian',
  host: 'localhost',
  database: 'testdb',
  password: 'admin',
  port: 5432,
});

const getUsers = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM test_user', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}
const createUser = (body) => {
  return new Promise(function(resolve, reject) {
    const nazwa = body.name
    pool.query('INSERT INTO test_user (nazwa) VALUES ($1)', [nazwa], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new user has been added added: ${nazwa}`)
    })
  })
}
const deleteUser = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query('DELETE FROM test_user WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`User deleted with ID: ${id}`)
    })
  })
}

module.exports = {
  getUsers,
  createUser,
  deleteUser,
}
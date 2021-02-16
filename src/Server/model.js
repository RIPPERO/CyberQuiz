const mysql = require('mysql');
let dotenv = require('dotenv');

if (process.platform === "darwin") {
  dotenv = require('dotenv').config({ path: './../../.env' });
}
else {
  dotenv = require('dotenv').config({ path: __dirname + './../../.env' });
}

const connection = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Tabela user
const showUsers = () => {
  return new Promise(function (resolve) {
    var sql = "SELECT * FROM user";

    connection.query(sql, function (err, results) {
      if (err) {
        console.log(err.code + "\n" + err.sqlMessage);
        resolve(err);
      }
      else {
        resolve(results);
      }
    });
  });
}

const createUser = (body) => {
  return new Promise(function (resolve) {
    const username = body.name;
    var sql = "INSERT INTO user (username) VALUES (?)";
    var values = username;

    connection.query(sql, [values], function (err) {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          console.log(`Username ${values} already exists. Welcome back!`);
          resolve(err);
        }
        else if (err.code === "ER_BAD_DB_ERROR") {
          console.log(`Bad database name!`);
          resolve(err);
        }
        else {
          console.log("Other error!\n" + err);
          resolve(err);
        }
      }
      else {
        console.log(`A new user has been added: ${values}`);
        resolve(`A new user has been added: ${values}`);
      }
    });
  });
}

// Tabela Quiz
const showQuiz = () => {
  return new Promise(function (resolve) {
    var sql = "SELECT * FROM quiz";

    connection.query(sql, function (err, results) {
      if (err) {
        console.log(err.code + "\n" + err.sqlMessage);
        resolve(err);
      }
      else {
        resolve(results);
      }
    });
  });
}

// Tabela Question
const selectQuiz = (body) => {
  return new Promise(function (resolve) {
    const id = body.quiz_ID_ID;
    var sql = "SELECT * FROM question WHERE quiz_ID_ID = ?";
    var values = id;

    connection.query(sql, values, function (err, results) {
      if (err) {
        console.log(err.code + "\n" + err.sqlMessage);
        resolve(err);
      }
      else {
        resolve(results);
      }
    });
  });
}

// Tabela answer
const showAnswers = (body) => {
  return new Promise(function (resolve) {
    const id = body.questionID;
    var sql = "SELECT answer_ID, answer FROM answer WHERE question_ID_ID = ?";
    var values = id;

    connection.query(sql, values, function (err, results) {
      if (err) {
        console.log(err.code + "\n" + err.sqlMessage);
        resolve(err);
      }
      else {
        resolve(results);
      }
    });
  });
}

const checkAnswer = (body) => {
  return new Promise(function (resolve) {
    const id = body.answerID;
    var sql = "SELECT is_correct FROM answer WHERE answer_ID = ?";
    var values = id;

    connection.query(sql, values, function (err, results) {
      if (err) {
        console.log(err.code + "\n" + err.sqlMessage);
        resolve(err);
      }
      else {
        resolve(results);
      }
    });
  });
}

// Tabela quiz_user
const showQuiz_User = (body) => {
  return new Promise(function (resolve) {
    var sql = "SELECT * FROM quiz_user WHERE user_ID_ID = ?";
    values = body.user_ID;

    connection.query(sql, values, function (err, results) {
      if (err) {
        console.log(err.code + "\n" + err.sqlMessage);
        resolve(err);
      }
      else {
        resolve(results);
      }
    });
  });
}

const addQuiz_User = (body) => {
  return new Promise(function (resolve) {
    const score = body.quiz_user_json.score;
    const quiz_ID = body.quiz_user_json.quiz_ID;
    const user_ID_ID = body.quiz_user_json.user_ID_ID;

    var sql = "INSERT INTO quiz_user (final_score, quiz_ID_ID, user_ID_ID) VALUES (?)";
    var values = [score, quiz_ID, user_ID_ID];

    connection.query(sql, [values], function (err) {
      if (err) {
        console.log(err);
        resolve(err);
      }
    });
  });
}

// Tabela answer_user
const showAnswer_User = (body) => {
  return new Promise(function (resolve) {
    var value1 = body.answer_user_json.user_ID_ID;
    var value2 = body.answer_user_json.quiz_ID;
    var value3 = body.answer_user_json.quiz_user_ID_ID;
    var sql = "SELECT * FROM answer_user WHERE USER_ID_ID = " + value1 + " AND quiz_ID_ID = " + value2 + " AND quiz_user_ID_ID = " + value3;    

    connection.query(sql, function (err, results) {
      if (err) {
        console.log(err.code + "\n" + err.sqlMessage);
        resolve(err);
      }
      else {
        resolve(results);
      }
    });
  });
}

module.exports = {
  showUsers,
  createUser,
  showQuiz,
  selectQuiz,
  showAnswers,
  checkAnswer,
  showQuiz_User,
  addQuiz_User,
  showAnswer_User,
}

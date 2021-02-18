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

const getAIQuiz_User = () => {
  return new Promise(function (resolve) {
    var sql = "SELECT `AUTO_INCREMENT` FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'cyberquiz' AND TABLE_NAME = 'quiz_user'";

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

// Tabela answer_user
const showAnswer_User = (body) => {
  return new Promise(function (resolve) {
    var value1 = body.answer_user_json.user_ID_ID;
    var value2 = body.answer_user_json.quiz_ID;
    var value3 = body.answer_user_json.quiz_user_ID_ID;
    var sql = "SELECT answer_user_ID, user_ID_ID, answer_user.quiz_ID_ID, answer_user.question_ID_ID, answer_ID_ID, quiz_user_ID_ID, question_ID, question, answer FROM answer_user INNER JOIN question ON answer_user.question_ID_ID = question.question_ID INNER JOIN answer ON answer_user.answer_ID_ID = answer.answer_ID  WHERE USER_ID_ID = " + value1 + " AND answer_user.quiz_ID_ID = " + value2 + " AND answer_user.quiz_user_ID_ID = " + value3 + " ORDER BY `answer_user_ID`";

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

const addAnswer_User = (body) => {
  return new Promise(function (resolve) {
    const user_ID_ID = body.answer_user_json.user_ID_ID;
    const quiz_ID_ID = body.answer_user_json.quiz_ID_ID;
    const question_ID_ID = body.answer_user_json.question_ID_ID;
    const answer_ID_ID = body.answer_user_json.answer_ID_ID;
    const quiz_user_ID_ID = body.answer_user_json.quiz_user_ID_ID;
    
    var sql = "INSERT INTO answer_user (user_ID_ID, quiz_ID_ID, question_ID_ID, answer_ID_ID, quiz_user_ID_ID) VALUES (?)";
    var values = [user_ID_ID, quiz_ID_ID, question_ID_ID, answer_ID_ID, quiz_user_ID_ID];

    connection.query(sql, [values], function (err) {
      if (err) {
        console.log(err);
        resolve(err);
      }
      else {
        resolve("Success!");
      }
    });
  });
}

// Leaderboard
const getLeaderboard = (body) => {
  return new Promise(function (resolve) {
    var value = body.get_leaderboard;
    var sql = "SELECT final_score, user_ID_ID, username FROM quiz_user INNER JOIN user ON user.user_ID = quiz_user.user_ID_ID WHERE quiz_ID_ID = " + value + " ORDER BY `final_score` DESC";

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
  getAIQuiz_User,
  showAnswer_User,
  addAnswer_User,
  getLeaderboard,
}

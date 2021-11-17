const DB = require("./database.js");
const UUID = require("uuid");

module.exports = {
  login(username, password, callback) {
    DB.connect().then((db) => {
      db.get(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        username,
        password
      ).then((result) => {
        console.log(result);
        callback(result);
      });
    });
  },
};

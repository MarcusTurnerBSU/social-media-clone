const DB = require("./database.js");
const UUID = require("uuid");

module.exports = {
  login(username, password) {
    DB.connect().then((db) => {
      console.log(db, username, password);
      db.get(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        username,
        password
      );
      console.log(db);
    });
  },
};

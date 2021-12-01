const DB = require("./database.js");
const UUID = require("uuid");

module.exports = {
  login(username, password, callback) {
    DB.connect().then((db) => {
      db.get(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        username,
        password
      )
        .then((result) => {
          if (result && !result.token) {
            let token = UUID.v4();
            db.run(
              "UPDATE users SET token = ? WHERE id = ?",
              token,
              result.id
            ).then(() => {
              result.token = token;
              callback(result);
            });
          } else {
            callback(result);
          }
          console.log(result);
          callback(result);
        })
        .catch((err) => {
          console.log("users.login failed with error: " + err);
        });
    });
  },

  findByToken(token, callback) {
    DB.connect().then((db) => {
      db.get("SELECT * FROM users WHERE token = ?", token)
        .then((result) => {
          callback(result);
        })
        .catch((err) => {
          console.log("users.login failed with error: " + err);
          callback(false);
        });
    });
  },
};

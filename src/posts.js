const DB = require("./database.js");
const UUID = require("uuid");

module.exports = {
  post(title, body, callback) {
    DB.connect().then((db) => {
      db.run(
        'INSERT INTO posts ("title","body") VALUES (?, ?)',
        title,
        body
      ).then((result) => {
        console.log(result);
        callback();
      });
    });
  },
};

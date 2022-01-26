const DB = require("./database.js");
const UUID = require("uuid");

module.exports = {
  createComment(body, postId, userId, callback) {
    DB.connect().then((db) => {
      db.run(
        'INSERT INTO comments ("body", "post_id", "user_id") VALUES (?, ?, ?)',
        body,
        postId,
        userId
      )
        .then((result) => {
          callback(result);
        })
        .catch((err) => {
          console.log("creating comment failed with error: " + err);
        });
    });
  },

  getComments(callback) {
    DB.connect().then((db) => {
      db.all("SELECT * FROM comments WHERE post_id = ? ORDER BY id ASC")
        .then((result) => {
          callback(result);
        })
        .catch((err) => {
          console.log("getting comments failed with error: " + err);
        });
    });
  },
};

const DB = require("./database.js");
const UUID = require("uuid");

module.exports = {
  createPost(title, body, userId, imageId, callback) {
    DB.connect().then((db) => {
      db.run(
        'INSERT INTO posts ("title","body","user_id","image_id") VALUES (?, ?, ?, ?)',
        title,
        body,
        userId,
        imageId
      ).then((result) => {
        console.log(result);
        callback();
      });
    });
  },

  imageUpload(filepath, callback) {
    DB.connect().then((db) => {
      db.run('INSERT INTO images("filepath") VALUES(?)', filepath)
        .then((result) => {
          callback(result);
        })
        .catch((err) => {
          console.log("Image upload failed with error:" + err);
        });
    });
  },

  getPosts(offset, limit, callback) {
    DB.connect().then((db) => {
      db.all(
        "SELECT * FROM posts JOIN images ON posts.image_id = images.id ORDER BY id DESC LIMIT ? OFFSET ?",
        limit,
        offset
      )
        .then((result) => {
          callback(result);
        })
        .catch((err) => {
          console.log("Get posts failed with error:" + err);
        });
    });
  },
};

const express = require("express");
const app = express();
const port = 3000;

// You can require your own code as well...
const funcs = require("./src/funcs.js");
const database = require("./src/database.js");
database.connect().then((db) => {
  db.get("SELECT * FROM users").then((result) => {
    console.log(result);
  });
});
const users = require("./src/users.js");
const posts = require("./src/posts.js");

const UUID = require("uuid");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/uploads");
  },
  filename: function (req, file, callback) {
    callback(null, UUID.v4() + "-" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
});

// Tell Express to server HTML, JS, CSS etc from the public/ folder
// See: http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.use(express.json());

// Our API routes will be here
app.get("/api/hello", function (req, res) {
  // Return the response by calling our function
  res.send(funcs.myFunction());
});

app.post("/api/login", function (req, res) {
  users.login(req.body.username, req.body.password, (result) => {
    if (!result) {
      result = false;
    }
    console.log(result);
    res.status(200).json(result);
  });
});

function okResponse(res, code) {
  res.status(code).send({});
}

function notAllowed(res) {
  res.status(401).send({
    error: "Not authorised",
  });
}
app.post("/api/post", upload.single("image"), function (req, res) {
  let apiToken = req.get("X-API-Token");
  if (apiToken) {
    users.findByToken(apiToken, (user) => {
      if (user) {
        posts.imageUpload(req.file.filename, (postImage) => {
          posts.createPost(
            req.body.title,
            req.body.body,
            user.id,
            postImage.lastID,
            (result) => {
              okResponse(res, 201);
              console.log(req.body);
            }
          );
        });
      } else {
        console.log("user not found");
        notAllowed(res);
      }
    });
  } else {
    console.log("missing api token");
    notAllowed(res);
  }
});

app.get("/api/posts", (req, res) => {
  let limit = 5;
  let offset = req.query.offset;

  console.log(offset);

  Posts.getPosts(offset, limit, (result) => {
    res.json(result);
  });
});

// Tell us where we're running from
console.log("Server running on http://localhost:" + port);
app.listen(port);

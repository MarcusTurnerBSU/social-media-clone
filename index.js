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
  // Return the response by calling our function
  // if (req.body.username == "admin" && req.body.password == "password") {
  //   loggedIn = true;
  //login function goes here - check database if details match
  //}
  users.login(req.body.username, req.body.password, (result) => {
    if (!result) {
      result = false;
    }
    console.log(result);
    res.status(200).json({
      result,
    });
  });
});
app.post("/api/post", function (req, res) {
  console.log(req.body);
  posts.post(req.body.title, req.body.body, (result) => {
    console.log(result);
    res.status(200).json({
      result,
    });
  });
});

// Tell us where we're running from
console.log("Server running on http://localhost:" + port);
app.listen(port);

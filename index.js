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
  let loggedIn = false;

  // Return the response by calling our function
  if (req.body.username == "admin" && req.body.password == "password") {
    loggedIn = true;
    //login function goes here - check database if details match
  }

  res.json({
    loggedIn: loggedIn,
  });

  //console.log(req.body);
});

// Tell us where we're running from
console.log("Server running on http://localhost:" + port);
app.listen(port);

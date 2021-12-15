//const utils = require("nodemon/lib/utils");

//functions and variables that I will use throughout my application
// let loggedIn = window.sessionStorage.getItem("token");

// function logout() {
//   window.sessionStorage.removeItem("token");
// }

utils = {
  formDataToJSON(formData) {
    console.log(formData);
    var object = {};
    formData.forEach((value, key) => (object[key] = value));
    return JSON.stringify(object);
  },
};

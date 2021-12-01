//functions and variables that I will use throughout my application
let loggedIn = window.sessionStorage.getItem("token");

function logout() {
  window.sessionStorage.removeItem("token");
}

// Clear login state and redirect to login page
localStorage.removeItem('userLoggedIn');
localStorage.removeItem("isLoggedIn");
localStorage.removeItem("email");
localStorage.removeItem("role");

setTimeout(() => {
  window.location.href = "login.html";
}, 1000);

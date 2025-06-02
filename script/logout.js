// Clear login state and redirect to login page
localStorage.removeItem('currentUser');
localStorage.removeItem('email');
localStorage.removeItem('isLoggedIn');
localStorage.removeItem('Name');
localStorage.removeItem('role');
localStorage.removeItem('userLoggedIn');


setTimeout(() => {
  window.location.href = "login.html";
}, 1000);

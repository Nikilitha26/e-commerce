// login.js
function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const messageEl = document.getElementById("message");
  messageEl.style.color = "red";

  if (!email || !password) {
    messageEl.textContent = "Please fill in all fields.";
    return;
  }

  const storedUserJSON = localStorage.getItem("registeredUser");

  if (!storedUserJSON) {
    messageEl.textContent = "No registered users found. Please register first.";
    return;
  }

  const storedUser = JSON.parse(storedUserJSON);

  if (
    email.toLowerCase() === storedUser.email.toLowerCase() &&
    password === storedUser.password
  ) {
    // Successful login
    localStorage.setItem("userLoggedIn", "true");
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("email", storedUser.email);
    localStorage.setItem("Name", storedUser.Name);
    localStorage.setItem("role", storedUser.role);
    localStorage.setItem("currentUser", JSON.stringify(storedUser));

    messageEl.style.color = "green";
    messageEl.textContent = "Login successful! Redirecting...";

    setTimeout(() => {
      window.location.href = "/index.html"; // Redirect to home or dashboard
    }, 1000);
  } else {
    messageEl.textContent = "Invalid email or password.";
  }
}

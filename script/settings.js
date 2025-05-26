function updateSettings() {
    const newPassword = document.getElementById("newPassword").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const messageEl = document.getElementById("settingsMessage");
  
    if (!newPassword || !confirmPassword) {
      messageEl.style.color = "red";
      messageEl.textContent = "Please fill in both password fields.";
      return;
    }
  
    if (newPassword !== confirmPassword) {
      messageEl.style.color = "red";
      messageEl.textContent = "Passwords do not match.";
      return;
    }
  
    const user = JSON.parse(localStorage.getItem("registeredUser"));
    user.password = newPassword;
    localStorage.setItem("registeredUser", JSON.stringify(user));
  
    messageEl.style.color = "green";
    messageEl.textContent = "Password updated successfully!";
  }
  
  function deleteAccount() {
    const confirmDelete = confirm("Are you sure you want to delete your account? This action cannot be undone.");
  
    if (confirmDelete) {
      localStorage.removeItem("registeredUser");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      localStorage.removeItem("Name"); // In case you stored it separately
  
      alert("Your account has been deleted.");
      window.location.href = "/html/login.html"; // Redirect to login or home
    }
  }
  
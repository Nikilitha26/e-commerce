function register() {
    const name = document.getElementById("regName").value.trim();
    const surname = document.getElementById("regSurname").value.trim();
    const age = parseInt(document.getElementById("regAge").value.trim());
    const gender = document.getElementById("regGender").value;
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value;
    const role = document.getElementById("regRole").value;
  
    const messageEl = document.getElementById("regMessage");
    messageEl.style.color = "red";
  
    // Basic validation
    if (!name || !surname || !age || !gender || !email || !password) {
      messageEl.textContent = "Please fill in all fields.";
      return;
    }
  
    if (age < 1 || age > 120) {
      messageEl.textContent = "Please enter a valid age.";
      return;
    }
  
    // Simple email regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      messageEl.textContent = "Please enter a valid email address.";
      return;
    }
  
    // Save user data in localStorage (for demo only, no encryption)
    const user = { name, surname, age, gender, email, password, role };
    localStorage.setItem("registeredUser", JSON.stringify(user));
  
    // Log them in
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("email", email);
    localStorage.setItem("role", role);
    localStorage.setItem("Name", name);
  
    // Success message (green)
    messageEl.style.color = "green";
    messageEl.textContent = "Registration successful! Redirecting...";
  
    // Redirect after a short delay
    setTimeout(() => {
      window.location.href = "/index.html";
    }, 1500);
  }
  
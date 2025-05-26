document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const name = localStorage.getItem("Name") || "User";
    const role = (localStorage.getItem("role") || "user").toLowerCase();
  
    const adminNav = document.getElementById("adminNavItem");
    const profileToggle = document.getElementById("profileToggle");
    const loginLink = document.getElementById("loginLink");
    const registerLink = document.getElementById("registerLink");
    const profileLink = document.getElementById("profileLink");
    const settingsLink = document.getElementById("settingsLink");
    const ordersLink = document.getElementById("ordersLink");
    const logoutLink = document.getElementById("logoutLink");
  
    if (isLoggedIn) {
      loginLink.style.display = "none";
      registerLink.style.display = "none";
  
      profileLink.style.display = "block";
      settingsLink.style.display = "block";
      ordersLink.style.display = "block";
      logoutLink.style.display = "block";
  
      profileToggle.textContent = name; // 👈 Show the user's name
  
      if (role === "admin") {
        adminNav.style.display = "block";
      } else {
        adminNav.style.display = "none";
      }
    } else {
      loginLink.style.display = "block";
      registerLink.style.display = "block";
  
      profileLink.style.display = "none";
      settingsLink.style.display = "none";
      ordersLink.style.display = "none";
      logoutLink.style.display = "none";
  
      profileToggle.innerHTML = '<i class="fas fa-user-circle profile-icon" style="font-size: 1.5rem;"></i>';
      adminNav.style.display = "none";
    }
  });
  
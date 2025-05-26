document.addEventListener("DOMContentLoaded", () => {
    const storedUser = JSON.parse(localStorage.getItem("registeredUser"));
  
    if (!storedUser) {
      document.getElementById("profileMessage").textContent = "No user data found.";
      return;
    }
  
    document.getElementById("profileName").value = storedUser.name || "";
    document.getElementById("profileSurname").value = storedUser.surname || "";
    document.getElementById("profileAge").value = storedUser.age || "";
    document.getElementById("profileGender").value = storedUser.gender || "";
    document.getElementById("profileEmail").value = storedUser.email || "";
  });
  
  function saveProfile() {
    const name = document.getElementById("profileName").value.trim();
    const surname = document.getElementById("profileSurname").value.trim();
    const age = parseInt(document.getElementById("profileAge").value.trim());
    const gender = document.getElementById("profileGender").value;
    const email = document.getElementById("profileEmail").value.trim();
  
    if (!name || !surname || !age || !gender) {
      document.getElementById("profileMessage").textContent = "Please fill in all fields.";
      return;
    }
  
    const updatedUser = { name, surname, age, gender, email, ...JSON.parse(localStorage.getItem("registeredUser")) };
  
    localStorage.setItem("registeredUser", JSON.stringify(updatedUser));
    localStorage.setItem("Name", name); // Keep navbar in sync
    document.getElementById("profileMessage").style.color = "green";
    document.getElementById("profileMessage").textContent = "Profile updated successfully!";
  }
  
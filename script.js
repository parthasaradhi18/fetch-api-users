const userList = document.getElementById("userList");
const errorDiv = document.getElementById("error");
const reloadBtn = document.getElementById("reloadBtn");

async function fetchUsers() {
  userList.innerHTML = "";
  errorDiv.textContent = "";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const users = await response.json();

    users.forEach(user => {
      const userCard = document.createElement("div");
      userCard.classList.add("user-card");
      userCard.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
      `;
      userList.appendChild(userCard);
    });
  } catch (error) {
    errorDiv.textContent = "Failed to fetch users: " + error.message;
  }
}

// Load data on page load
fetchUsers();

// Reload button handler
reloadBtn.addEventListener("click", fetchUsers);

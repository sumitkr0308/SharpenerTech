const form = document.getElementById("loginForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Login successful!");
      // redirect  expense page
      window.location.href = "expense.html"; 
    } else {
      alert(data.message || "Invalid email or password.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Unable to connect to server. Please try again later.");
  }
});

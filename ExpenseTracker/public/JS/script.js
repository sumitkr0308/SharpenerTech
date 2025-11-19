// CONFIG

const API_URL = "http://localhost:4000/api/expenses";
const token = localStorage.getItem("token");

// handle logout
const logoutBtn = document.getElementById("logout-btn");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "login.html";
});

// TOKEN → DECODE USER ID

function getUserIdFromToken() {
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.userId;
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
}

const tokenUserId = getUserIdFromToken();

//PREMIUM UI HANDLING

function showPremiumUI() {
  document.getElementById("premium-message").style.display = "block";
  document.getElementById("premiumBtn").style.display = "none";
  document.getElementById("leaderboardBtn").style.display = "block";
}

document.getElementById("leaderboardBtn").style.display = "none";

// CHECK PREMIUM STATUS FROM BACKEND

async function checkPremiumStatus() {
  try {
    const response = await fetch("http://localhost:4000/user/status", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();

    if (data.isPremium === true) {
      localStorage.setItem("isPremium", "true");
      showPremiumUI();
    } else {
      localStorage.setItem("isPremium", "false");
    }
  } catch (err) {
    console.error("Premium status check failed:", err);
  }
}

// CASHFREE PAYMENT (Premium Purchase)

const cashfree = new Cashfree({ mode: "sandbox" });

document.getElementById("premiumBtn").addEventListener("click", async () => {
  try {
    const response = await fetch(
      "http://localhost:4000/api/payments/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: 500,
          customerId: tokenUserId,
          customerPhone: "9999999999",
        }),
      }
    );

    const data = await response.json();

    if (!data.paymentSessionId) {
      alert("Failed to start payment");
      return;
    }

    cashfree.checkout({
      paymentSessionId: data.paymentSessionId,
      redirectTarget: "_self",
    });
  } catch (err) {
    console.error("Payment error:", err);
    alert("Payment failed");
  }
});

//  LEADERBOARD (Only For Premium Users)

document
  .getElementById("leaderboardBtn")
  .addEventListener("click", async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/premium/showleaderboard",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();

      const container = document.getElementById("leaderboardContainer");
      container.innerHTML = `<h3>Leaderboard</h3>`;

      if (!Array.isArray(data)) {
        container.innerHTML += `<p>${data.message || "Access Denied"}</p>`;
        return;
      }

      data.forEach((user, index) => {
        container.innerHTML += `
        <p>${index + 1}. <strong>${user.name || "Unknown"}</strong> - ₹${
          user.totalExpense
        }</p>
      `;
      });
    } catch (err) {
      console.error("Leaderboard error", err);
    }
  });

//REDIRECT IF NOT LOGGED IN

if (!token) {
  alert("Please login first.");
  window.location.href = "login.html";
}

// EXPENSE FEATURES

const expenseForm = document.getElementById("expenseForm");
const expenseDisplay = document.getElementById("expenseDisplay");
const addBtn = document.getElementById("AddBtn");

// Load all expenses
async function renderExpenses() {
  expenseDisplay.innerHTML = "";

  try {
    const response = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const expenses = await response.json();
    const list = Array.isArray(expenses) ? expenses : [];

    list.forEach((exp) => addExpenseToList(exp));
  } catch (err) {
    console.error("Error fetching expenses:", err);
  }
}

// Add / Update Expense
expenseForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const description = document.getElementById("expName").value.trim();
  const amount = parseFloat(document.getElementById("amt").value);
  // const category = document.getElementById("expenseCategory").value.trim();

  if (!description || !amount) {
    alert("Please fill all fields");
    return;
  }

  const editId = expenseForm.dataset.editId;

  if (editId) {
    const expenseData = { description, amount };
    await fetch(`${API_URL}/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(expenseData),
    });

    delete expenseForm.dataset.editId;
    addBtn.textContent = "Add";
  } else {
    const expenseData = { description, amount };
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(expenseData),
    });
  }

  renderExpenses();
  expenseForm.reset();
});

// Add Item To UI
function addExpenseToList(exp) {
  const li = document.createElement("li");
  li.className =
    "list-group-item d-flex justify-content-between align-items-center my-2 border p-2";

  li.innerHTML = `
    <div>
      <strong>${exp.description}</strong> - ₹${exp.amount}
      <span class="badge bg-secondary ms-2">${exp.category}</span>
    </div>
    <div>
      <button class="btn btn-warning btn-sm me-2"
        onclick="editExpense(${exp.id}, '${exp.description}', ${exp.amount}, '${exp.category}')">
        Edit
      </button>

      <button class="btn btn-danger btn-sm"
        onclick="deleteExpense(${exp.id})">
        Delete
      </button>
    </div>
  `;

  expenseDisplay.appendChild(li);
}

// Delete Expense
async function deleteExpense(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  renderExpenses();
}

// Edit Expense
function editExpense(id, description, amount, category) {
  document.getElementById("expName").value = description;
  document.getElementById("amt").value = amount;
  document.getElementById("expenseCategory").value = category;

  expenseForm.dataset.editId = id;
  addBtn.textContent = "Update";
}

//INITIAL LOAD

document.addEventListener("DOMContentLoaded", async () => {
  await checkPremiumStatus();
  renderExpenses();
});

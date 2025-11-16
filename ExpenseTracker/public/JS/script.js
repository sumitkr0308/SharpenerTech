const API_URL = "http://localhost:4000/api/expenses";
const token = localStorage.getItem("token");


// Decode token to get userId
function getUserIdFromToken() {
  if (!token) return null;

  const tokenPayload = JSON.parse(atob(token.split(".")[1])); 
  return tokenPayload.userId;
}

const tokenUserId = getUserIdFromToken();


// PREMIUM UI

function showPremiumUI() {
  document.getElementById("premium-message").style.display = "block";
  document.getElementById("premiumBtn").style.display = "none";
  document.getElementById("leaderboardBtn").style.display = "block";
}

// Initially hide leaderboard
document.getElementById("leaderboardBtn").style.display = "none";

// CHECK PREMIUM STATUS FROM BACKEND

async function checkPremiumStatus() {
  try {
    const response = await fetch("http://localhost:4000/user/status", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await response.json();

    if (data.isPremium) {
      localStorage.setItem("isPremium", "true");
      showPremiumUI();
    } else {
      localStorage.setItem("isPremium", "false");
    }
  } catch (err) {
    console.error("Premium status check failed", err);
  }
}

// Show premium UI if stored
if (localStorage.getItem("isPremium") === "true") {
  showPremiumUI();
}

// PREMIUM → CREATE ORDER

const cashfree = new Cashfree({ mode: "sandbox" });



document.getElementById("premiumBtn").addEventListener("click", async () => {

    const response = await fetch("http://localhost:4000/api/payments/create-order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            amount: 500,
            customerId: tokenUserId,
            customerPhone: "9999999999"
        })
    });

    const data = await response.json();

    cashfree.checkout({
        paymentSessionId: data.paymentSessionId,
        redirectTarget: "_self"
    });
});

// ============================
// LEADERBOARD
// ============================
document.getElementById("leaderboardBtn").addEventListener("click", async () => {
  const response = await fetch("http://localhost:4000/premium/showleaderboard", {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await response.json();

  const container = document.getElementById("leaderboardContainer");
  container.innerHTML = `<h3>Leaderboard</h3>`;

  data.forEach((entry, index) => {
    container.innerHTML += `
      <p>${index + 1}. <strong>${entry.user.name}</strong> - ₹${entry.dataValues.totalAmount}</p>
    `;
  });
});


// REDIRECT IF NOT LOGGED IN

if (!token) {
  alert("Please login first.");
  window.location.href = "login.html";
}

// ============================
// EXPENSE FUNCTIONS (same as before)
// ============================
const expenseForm = document.getElementById("expenseForm");
const expenseDisplay = document.getElementById("expenseDisplay");
const addBtn = document.getElementById("AddBtn");

// Render expenses
async function renderExpenses() {
  expenseDisplay.innerHTML = "";

  try {
    const response = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const expenses = await response.json();

    const list = Array.isArray(expenses) ? expenses : [];

    list.forEach(exp => addExpenseToList(exp));
  } catch (error) {
    console.error("Error fetching expenses:", error);
  }
}

// Add / update expense
expenseForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const description = document.getElementById("expName").value.trim();
  const amount = parseFloat(document.getElementById("amt").value);
  const category = document.getElementById("expenseCategory").value.trim();

  if (!description || !amount || !category) {
    alert("Fill all fields");
    return;
  }

  const expenseData = { description, amount, category };
  const editId = expenseForm.dataset.editId;

  let response;

  if (editId) {
    response = await fetch(`${API_URL}/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(expenseData)
    });

    delete expenseForm.dataset.editId;
    addBtn.textContent = "Add";
  } else {
    response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(expenseData)
    });
  }

  renderExpenses();
  expenseForm.reset();
});

// Add to UI
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
        onclick="editExpense(${exp.id}, '${exp.description}', ${exp.amount}, '${exp.category}')">Edit</button>
      <button class="btn btn-danger btn-sm"
        onclick="deleteExpense(${exp.id})">Delete</button>
    </div>
  `;

  expenseDisplay.appendChild(li);
}

// Delete expense
async function deleteExpense(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  renderExpenses();
}

// Edit expense
function editExpense(id, description, amount, category) {
  document.getElementById("expName").value = description;
  document.getElementById("amt").value = amount;
  document.getElementById("expenseCategory").value = category;

  expenseForm.dataset.editId = id;
  addBtn.textContent = "Update";
}

// Initial page load
document.addEventListener("DOMContentLoaded", async () => {
  await checkPremiumStatus();
  renderExpenses();
});

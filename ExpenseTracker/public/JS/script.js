if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "login.html"; // redirect if not logged in
}


const expenseForm = document.getElementById("expenseForm");
const expenseDisplay = document.getElementById("expanseDisplay");
const addBtn = document.getElementById("AddBtn");

// 1. FIX: Your API path was missing '/api/expenses'
const API_URL = 'http://localhost:4000/api/expenses'; 

// We don't need these lines anymore, the server handles all data
// let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
// let editIndex = null; 

// Render Expenses
async function renderExpenses() {
  expenseDisplay.innerHTML = "";
  
  // Use the correct API_URL
  const response = await fetch(API_URL);
  const expenses = await response.json();

  // We don't need 'index' here, we use 'exp.id'
  expenses.forEach((exp) => { 
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center my-2 border p-2";

    li.innerHTML = `
      <div>
        <strong>${exp.description}</strong> - ₹${exp.amount} 
        <span class="badge bg-secondary ms-2">${exp.category}</span>
      </div>
      <div>
        <button class="btn btn-warning btn-sm me-2" 
          onclick="editExpense(${exp.id}, '${exp.description}', ${exp.amount}, '${exp.category}')">Edit</button>
        
        <button class="btn btn-danger btn-sm" onclick="deleteExpense(${exp.id})">Delete</button>
      </div>
    `;

    expenseDisplay.appendChild(li);
  });
}

// Add or Update Expense
expenseForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const description = document.getElementById("expName").value;
  const amount = parseFloat(document.getElementById("amt").value);
  const category = document.getElementById("expenseCategory").value;

  const editId = expenseForm.dataset.editId;
  const expenseData = { description, amount, category };

  if (editId) {
    // --- UPDATE (PUT Request) ---
    // Use the correct API_URL
    await fetch(`${API_URL}/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expenseData)
    });
    delete expenseForm.dataset.editId;
  } else {
    // --- ADD NEW (POST Request) ---
    // Use the correct API_URL
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expenseData)
    });
  }

  addBtn.textContent = "Add";
  expenseForm.reset();
  renderExpenses(); // Re-fetch all expenses from server
});

// Delete Expense
async function deleteExpense(id) { // This 'id' is now the correct database ID
  // --- DELETE Request ---
  // Use the correct API_URL
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  renderExpenses(); // Re-fetch
}

// Edit Expense
// This function now receives the correct data from the 'onclick' event
function editExpense(id, description, amount, category) { 
  // Populate the form
  document.getElementById("expName").value = description;
  document.getElementById("amt").value = amount;
  document.getElementById("expenseCategory").value = category;

  // Store the ID on the form element itself
  expenseForm.dataset.editId = id;
  addBtn.textContent = "Update";
}

// Initial Render
renderExpenses();
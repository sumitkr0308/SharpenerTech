const expenseForm = document.getElementById("expenseForm");
const expenseDisplay = document.getElementById("expanseDisplay");
const addBtn = document.getElementById("AddBtn");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let editIndex = null;

// Render Expenses
function renderExpenses() {
  expenseDisplay.innerHTML = "";
  expenses.forEach((exp, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center my-2 border p-2";

    li.innerHTML = `
      <div>
        <strong>${exp.name}</strong> - ₹${exp.amount} 
        <span class="badge bg-secondary ms-2">${exp.category}</span>
      </div>
      <div>
        <button class="btn btn-warning btn-sm me-2" onclick="editExpense(${index})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteExpense(${index})">Delete</button>
      </div>
    `;

    expenseDisplay.appendChild(li);
  });

  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Add or Update Expense
expenseForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("expName").value;
  const amount = parseFloat(document.getElementById("amt").value);
  const category = document.getElementById("expenseCategory").value;

  if (editIndex === null) {
    // Add new
    expenses.push({ name, amount, category });
  } else {
    // Update existing
    expenses[editIndex] = { name, amount, category };
    editIndex = null;
    addBtn.textContent = "Add";
  }

  expenseForm.reset();
  renderExpenses();
});

// Delete Expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
}

// Edit Expense
function editExpense(index) {
  const exp = expenses[index];
  document.getElementById("expName").value = exp.name;
  document.getElementById("amt").value = exp.amount;
  document.getElementById("expenseCategory").value = exp.category;

  editIndex = index;
  addBtn.textContent = "Update";
}

// Initial Render
renderExpenses();

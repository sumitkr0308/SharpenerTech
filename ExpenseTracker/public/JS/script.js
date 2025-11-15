const API_URL = "http://localhost:4000/api/expenses";
const token = localStorage.getItem("token");
const premiumBtn = document.getElementById("premiumBtn");

      premiumBtn.addEventListener("click", async () => {
        try {
          const response = await fetch("http://localhost:4000/api/orders/create-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await response.json();

          if (!response.ok) {
            alert("Failed to start payment");
            return;
          }

          const cf = new Cashfree();

          // Open Cashfree checkout
          cf.pay({
            orderToken: data.cashfreeData.order_token
          });

          alert("Transaction Successful!");
        } catch (error) {
          alert("Transaction Failed!");
          console.error(error);
        }
      });

// Redirect if user not logged in
if (!token) {
  alert("Please login first.");
  window.location.href = "login.html";
}

// DOM Elements
const expenseForm = document.getElementById("expenseForm");
const expenseDisplay = document.getElementById("expenseDisplay");
const addBtn = document.getElementById("AddBtn");

// Render all expenses
async function renderExpenses() {
  expenseDisplay.innerHTML = "";

  try {
    const response = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const expenses = await response.json();

    if (!response.ok) {
      console.error("Failed to load expenses:", expenses);
      alert(expenses.message || "Unable to fetch expenses. Please login again.");
      return;
    }

    // Wrap in array if single object
    const expenseList = Array.isArray(expenses) ? expenses : [expenses];

   

    expenseList.forEach((exp) => addExpenseToList(exp));
  } catch (error) {
    console.error("Error fetching expenses:", error);
  }
}

//  Add expense (POST) or Update expense (PUT)
expenseForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const description = document.getElementById("expName").value.trim();
  const amount = parseFloat(document.getElementById("amt").value);
  const category = document.getElementById("expenseCategory").value.trim();

  if (!description || !amount || !category) {
    alert("Please fill in all fields.");
    return;
  }

  const expenseData = { description, amount, category };
  const editId = expenseForm.dataset.editId;

  try {
    let response;
    if (editId) {
      // Update existing expense
      response = await fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(expenseData),
      });

      addBtn.textContent = "Add";
      delete expenseForm.dataset.editId;
    } else {
      // ✅ Add new expense
      response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(expenseData),
      });
    }

    const data = await response.json();

    if (response.ok) {
      if (editId) {
        // Re-render all for simplicity
        await renderExpenses();
      } else {
        addExpenseToList(data); // Add single expense dynamically
      }
      expenseForm.reset();
    } else {
      console.error("Error adding/updating expense:", data);
      alert(data.message || "Failed to save expense.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

// Add expense item to UI
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
      <button class="btn btn-danger btn-sm" onclick="deleteExpense(${exp.id})">Delete</button>
    </div>
  `;

  expenseDisplay.appendChild(li);
}

//  Delete expense
async function deleteExpense(id) {
  if (!confirm("Are you sure you want to delete this expense?")) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();

    if (response.ok) {
      alert("Expense deleted!");
      renderExpenses(); 
    } else {
      console.error("Delete error:", data);
      alert(data.message || "Failed to delete expense.");
    }
  } catch (error) {
    console.error("Error deleting expense:", error);
  }
}


function editExpense(id, description, amount, category) {
  document.getElementById("expName").value = description;
  document.getElementById("amt").value = amount;
  document.getElementById("expenseCategory").value = category;

  expenseForm.dataset.editId = id;
  addBtn.textContent = "Update";
}

// ✅ Initial load
document.addEventListener("DOMContentLoaded", renderExpenses);

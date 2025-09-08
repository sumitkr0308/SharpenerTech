 // Select elements
const bookInput = document.querySelector("#content input");
const descInput = document.querySelector("#description");
const addBtn = document.querySelector("#content button");
const resultList = document.querySelector("#result ul");
const searchInput = document.querySelector("#bookName");
const searchBtn = document.querySelector("#search-btn");
const totalBooksEl = document.querySelector("#total-books");
const displayedBooksEl = document.querySelector("#displayed-books");

// Local storage key
const STORAGE_KEY = "books";

// Get books from localStorage
function getBooks() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// Save books to localStorage
function saveBooks(books) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

// Render books to UI
function renderBooks(books = getBooks()) {
  resultList.innerHTML = "";
  books.forEach((book, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <h3>${book.title}</h3>
      <p>${book.description}</p>
      <button onclick="editBook(${index})">Edit</button>
      <button onclick="deleteBook(${index})">Delete</button>
    `;
    resultList.appendChild(li);
  });

  // Update stats
  totalBooksEl.textContent = `Total Books: ${getBooks().length}`;
  displayedBooksEl.textContent = `Displayed Books: ${books.length}`;
}

// Add new book
addBtn.addEventListener("click", () => {
  const title = bookInput.value.trim();
  const description = descInput.value.trim();

  if (!title) {
    alert("Book title cannot be empty!");
    return;
  }

  const books = getBooks();
  books.push({ title, description });
  saveBooks(books);

  bookInput.value = "";
  descInput.value = "";

  renderBooks();
});

// Delete book
function deleteBook(index) {
  const books = getBooks();
  books.splice(index, 1);
  saveBooks(books);
  renderBooks();
}

// Edit book
function editBook(index) {
  const books = getBooks();
  const book = books[index];

  bookInput.value = book.title;
  descInput.value = book.description;

  // Remove old entry before saving edited version
  books.splice(index, 1);
  saveBooks(books);
  renderBooks();
}

// Search books
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.toLowerCase();
  const books = getBooks();
  const filtered = books.filter(book =>
    book.title.toLowerCase().includes(query)
  );
  renderBooks(filtered);
});

// Initial load
renderBooks();

let myLibrary = [];

class Book {
  constructor(author, title, pages, isRead) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.isRead = isRead;
    this.uniqueID = crypto.randomUUID();
  }

  toggleRead() {
    this.isRead = !this.isRead;
  }
}

const libraryContainer = document.querySelector(".library-container");

function addBookToLibrary(bookAuthor, bookTitle, bookPages, isBookRead) {
  let book = new Book(bookAuthor, bookTitle, bookPages, isBookRead);
  myLibrary.push(book);
}

function displayBooksFromArray() {
  libraryContainer.innerHTML = "";

  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    bookCard.innerHTML = `
    <h3>${book.title}</h3>
    <p>Author: ${book.author}</p>
    <p>Pages: ${book.pages}</p>
    <p>Read: ${book.isRead ? "Yes" : "No"}</p>
    <p>ID: ${book.uniqueID}</p>
    <button data-id="${book.uniqueID}" class="remove-btn">Remove</button>
    <button data-id="${
      book.uniqueID
    }" class="toggle-read-btn">Toggle Read</button>`;

    libraryContainer.appendChild(bookCard);
  });
}

libraryContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("toggle-read-btn")) {
    const id = e.target.dataset.id;
    const book = myLibrary.find((book) => book.uniqueID === id);
    book.toggleRead();
    displayBooksFromArray();
  }
});

document.querySelector("#new-book-btn").addEventListener("click", () => {
  document.querySelector("#book-form").style.display = "block";
});

document.querySelector("#book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const author = document.querySelector("#author");
  const title = document.querySelector("#title");
  const pages = document.querySelector("#pages");

  let hasError = false;

  if (author.validity.valueMissing) {
    author.setCustomValidity("Need Author Name!");
    hasError = true;
  }

  if (title.validity.valueMissing) {
    title.setCustomValidity("Need Title");
    hasError = true;
  }

  if (pages.validity.valueMissing) {
    pages.setCustomValidity("Need Number of Pages!");
    hasError = true;
  }

  if (hasError) {
    document.querySelector("#book-form").reportValidity();
    return;
  }

  const isRead = document.querySelector("#is-read").checked;
  addBookToLibrary(author.value, title.value, pages.value, isRead);
  displayBooksFromArray();
  e.target.reset();
  e.target.style.display = "none";
});

libraryContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const id = e.target.dataset.id;
    myLibrary = myLibrary.filter((book) => book.uniqueID !== id);
    displayBooksFromArray();
  }
});

addBookToLibrary("J.K. Rowling", "Harry Potter", 400, true);
addBookToLibrary("George Orwell", "1984", 328, false);

displayBooksFromArray();
console.log(myLibrary);

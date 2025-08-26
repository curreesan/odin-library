const myLibrary = [];

function Book(author, title, pages, isRead) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.isRead = isRead;
  this.uniqueID = crypto.randomUUID();
}

function addBookToLibrary(bookAuthor, bookTitle, bookPages, isBookRead) {
  // take params, create a book then store it in the array

  let book = new Book(bookAuthor, bookTitle, bookPages, isBookRead);
  myLibrary.push(book);
}

addBookToLibrary("J.K. Rowling", "Harry Potter", 400, true);
addBookToLibrary("George Orwell", "1984", 328, false);


function displayBooksFromArray() { 
  const libraryContainer = document.querySelector('.library-container');
  libraryContainer.innerHTML = '';
  
  myLibrary.forEach(book => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    
    bookCard.innerHTML = `
    <h3>${book.title}</h3>
    <p>Author: ${book.author}</p>
    <p>Pages: ${book.pages}</p>
    <p>Read: ${book.isRead ? "Yes" : "No"}</p>
    <p>ID: ${book.uniqueID}</p>`;
    
    libraryContainer.appendChild(bookCard);
  })
  
}

displayBooksFromArray();
console.log(myLibrary)

// Book CLass
class Book {
  constructor(isbn, title, author, pages) {
    this.isbn = isbn;
    this.title = title;
    this.author = author;
    this.pages = pages;
  }
}

// UI Class
class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${book.isbn}</td>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>
      <!--
      <a id="${book.isbn}" href="#" class="btn btn-success btn-sm edit">Edit</a>
      -->
      <a id="${book.isbn}" href="#" class="btn btn-danger btn-sm delete">Delete</a>
      </td>
      `;

    list.appendChild(row);
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);

    setInterval(() => {
      div.remove();
    }, 3000);
  }

  static deleteElement(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector("#isbn").value = "";
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#pages").value = "";
  }
}

// Store Class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    localStorage.setItem(
      "books",
      JSON.stringify(books.filter((book) => book.isbn !== isbn))
    );
  }
}

// Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event: Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const isbn = document.querySelector("#isbn").value;
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;

  if (isbn !== "" && title !== "" && author !== "" && pages !== "") {
    const book = new Book(isbn, title, author, pages);
    // console.log(book);
    UI.addBookToList(book);
    Store.addBook(book);

    UI.showAlert("Successfully added the record", "success");

    //Clear fields
    UI.clearFields();
  } else {
    UI.showAlert("Please! fill in all the field", "warning");
  }
});

// Event: Remove a Book
document.querySelector("#book-list").addEventListener("click", (e) => {
  UI.deleteElement(e.target);
  // console.log(e.target.id);
  Store.removeBook(e.target.id);
  UI.showAlert("Book Removed!", "success");
});

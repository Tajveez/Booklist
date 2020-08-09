// Book CLass
class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
  }
}

// UI Class
class UI {
  static displayBooks() {
    const StoreBooks = [
      {
        title: "Book one",
        author: "John doe",
        pages: "150",
      },
      {
        title: "Book two",
        author: "John dam",
        pages: "250",
      },
    ];

    const books = StoreBooks;

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
      `;

    list.appendChild(row);
  }
  static deleteElement(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#pages").value = "";
  }
}

// Store Class

// Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event: Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;

  if (title !== "" && author !== "" && pages !== "") {
    const book = new Book(title, author, pages);
    // console.log(book);
    UI.addBookToList(book);

    //Clear fields
    UI.clearFields();
  }
});

// Event: Remove a Book
document.querySelector("#book-list").addEventListener("click", (e) => {
  UI.deleteElement(e.target);
});

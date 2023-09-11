const addBookButton = document.getElementById("addBookButton");
const modal = document.getElementById("modal");
const confirmBtn = modal.querySelector("#confirmBtn");

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function toggleRead(index) {
  myLibrary[index].toggleRead();
  render();
}

function render() {
  let libraryEl = document.getElementById("libraryContainer");
  libraryEl.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    let bookEl = document.createElement("div");
    bookEl.setAttribute("class", "bookCard");
    bookEl.innerHTML = `
    <div class="cardText">
      <h3>${book.title}</h3>
      <h5>by ${book.author}</h5>
    </div>
    <div>
      <p class="pages">${book.pages} pages</p>
      <p class="status">${book.read ? "Read" : "Not read yet"}</p>
      <button class="toggleRead" onClick="toggleRead(${i})">Toggle Read</button>
    </div>
    <button class="removeButton" onClick="removeBook(${i})">Remove</button>
    `;
    libraryEl.appendChild(bookEl);
  }
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  render();
}

function addBookToLibrary() {
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let read = document.querySelector("#read").checked;

  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  render();
}

addBookButton.addEventListener("click", () => {
  modal.showModal();
});

document.getElementById("addBookForm").addEventListener("submit", function (e) {
  e.preventDefault();
  addBookToLibrary();
});

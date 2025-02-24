"use strict";

const libraryShelf = document.querySelector(".library-shelf");
const addBookBtn = document.querySelector(".add-book-btn");
const newBookModal = document.querySelector(".new-book-modal");

let myLibrary = [
  {
    title: "wow",
    author: "yudhi",
    year: 1999,
    pages: 4,
    finishRead: "No",
  },
  {
    title: "nyaharo",
    author: "sakura miko",
    year: 2018,
    pages: 35,
    finishRead: "Yes",
  },
  {
    title: "kyou mo kawaii",
    author: "hoshimachi suisei",
    year: 2018,
    pages: 125,
    finishRead: "Yes",
  },
  {
    title: "glasses are versatile",
    author: "shirakami fubuki",
    year: 2019,
    pages: 1277,
    finishRead: "No",
  },
];

myLibrary = myLibrary.map(book => Object.setPrototypeOf(book, Book.prototype)); //to make sure default books inherit the prototype of Book

function Book(title, author, year, pages, finishRead) {
  (this.title = title),
    (this.author = author),
    (this.year = year),
    (this.pages = pages),
    (this.finishRead = finishRead),
    (this.description = function () {
      console.log(
        `${this.title} by ${this.author}, released in ${this.year}, ${
          this.pages
        } pages long. ${
          this.finishRead === "yes"
            ? "You've read this book."
            : "You haven't finished this book yet."
        }`
      );
    });
}

Book.prototype.toggleReadStatus = function() {
  this.finishRead = this.finishRead === "Yes" ? "No" : "Yes"
}

function addBookToLibrary(title, author, year, pages, finishRead) {
  const newBook = new Book(title, author, year, pages, finishRead);
  return myLibrary.push(newBook);
}

const refreshDisplay = () => {
  libraryShelf.innerHTML = ``;
  for (let book of myLibrary) {
    libraryShelf.innerHTML += `<div class="book">
      <h3>Title: ${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Year: ${book.year}</p>
      <p>${book.pages} pages</p>
      <p class="read-status">Finished? ${book.finishRead} </p>
      <button class="toggle-read">Change</button>
      <p></p>
      <button class="remove-button">Remove</button>
    </div>`;
  }
};

refreshDisplay();

addBookBtn.addEventListener("click", () => newBookModal.showModal());

newBookModal.addEventListener("click", (e) => {
  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  const year = document.querySelector("#year");
  const pages = document.querySelector("#pages");
  const finishRead = document.querySelector("#finished-reading");
  if (e.target.classList.contains("cancel-btn")) {
    newBookModal.close();
  } else if (e.target.classList.contains("submit-btn")) {
    e.preventDefault();
    addBookToLibrary(
      title.value,
      author.value,
      year.value,
      pages.value,
      finishRead.value
    );
    console.log(myLibrary);
    refreshDisplay();
    title.value, author.value, year.value, pages.value = "";
    newBookModal.close();
  }
});

  libraryShelf.addEventListener("click", function(e) {
    const editedBook = e.target.closest(".book"); // to make sure change only happens in interacted book
    if (!editedBook) return;
    const titleToRemove = editedBook.querySelector("h3").textContent.slice(7);
    let index = myLibrary.findIndex(book => book.title === titleToRemove);

    if (e.target.classList.contains("remove-button")) {
      myLibrary.splice(index,1);
      refreshDisplay();
    } else if (e.target.classList.contains("toggle-read")) {
      console.log("button pressed");
      console.log(myLibrary[index].title);
      myLibrary[index].toggleReadStatus();
      refreshDisplay();
    }
  });

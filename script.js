"use strict";

const libraryShelf = document.querySelector(".library-shelf");
const addBookBtn = document.querySelector(".add-book-btn");
const newBookModal = document.querySelector(".new-book-modal");

const myLibrary = [];

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

function addBookToLibrary(title, author, year, pages, finishRead) {
  const newBook = new Book(title, author, year, pages, finishRead);
  return myLibrary.push(newBook);
}

addBookToLibrary("wow", "yudhi", 1999, 69, "no");
addBookToLibrary("nyaharo", "sakura miko", 2018, 35, "yes");
addBookToLibrary("kyou mo kawaii", "hoshimachi suisei", 2018, 125, "yes");
addBookToLibrary("glasses are versatile", "shirakami fubuki", 2019, 3, "yes");

const refreshDisplay = () => {
  libraryShelf.innerHTML = ``;
  for (let book of myLibrary) {
    libraryShelf.innerHTML += `<div class="book">
      <h3>Title: ${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Year: ${book.year}</p>
      <p>${book.pages} pages</p>
      <p>Finished reading? ${book.finishRead}</p>
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

console.log(myLibrary);

"use strict";

const libraryShelf = document.querySelector(".library-shelf");
const addBookBtn = document.querySelector(".add-book-btn");
const newBookModal = document.querySelector(".new-book-modal");

class Book {
  constructor(title, author, year, pages, finishRead) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.finishRead = finishRead;
  }

  toggleReadStatus() {
    this.finishRead = !this.finishRead;
  }
}

class Library {
  static books = [];

  static getBooks() {
    return Library.books;
  }
  static addBookConsole(...book) {
    return Library.books.push(...book);
  }

  static addBookUI(e) {
    const title = document.querySelector("#title");
    const author = document.querySelector("#author");
    const year = document.querySelector("#year");
    const pages = document.querySelector("#pages");
    const finishRead = document.querySelector("#finished-reading");
    if (e.target.classList.contains("cancel-btn")) {
      newBookModal.close();
    } else if (e.target.classList.contains("submit-btn")) {
      e.preventDefault();
      if ((!title, !author, !year, !pages, finishRead)) {
        alert("Please fill the book details!");
      } else {
        const newBook = new Book(
          title.value,
          author.value,
          year.value,
          pages.value,
          finishRead.value
        );
        Library.addBookConsole(newBook);
        console.log(Library.getBooks());
        Library.refreshDisplay();
        newBookModal.close();
      }
    }
  }
  static refreshDisplay() {
    libraryShelf.innerHTML = "";
    for (let book of Library.books) {
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
  }
  static shelfEdit(e) {
    const editedBook = e.target.closest(".book"); // to make sure change only happens in interacted book
    if (!editedBook) return;
    const titleToRemove = editedBook.querySelector("h3").textContent.slice(7);
    let index = Library.books.findIndex((book) => book.title === titleToRemove);

    if (e.target.classList.contains("remove-button")) {
      Library.books.splice(index, 1);
      Library.refreshDisplay();
    } else if (e.target.classList.contains("toggle-read")) {
      console.log("button pressed");
      console.log(Library.books[index].title);
      Library.books[index].toggleReadStatus();
      Library.refreshDisplay();
    }
  }
}

const book1 = new Book("wow", "yudhi", 1999, 4, false);
const book2 = new Book("nyaharo", "sakura miko", 2018, 35, true);
const book3 = new Book("kyou mo kawaii", "hoshimachi suisei", 2018, 125, true);
const book4 = new Book(
  "glasses are versatile",
  "shirakami fubuki",
  2019,
  1277,
  false
);

Library.addBookConsole(book1, book2, book3, book4);
Library.refreshDisplay();

addBookBtn.addEventListener("click", () => newBookModal.showModal());

newBookModal.addEventListener("click", Library.addBookUI);

libraryShelf.addEventListener("click", Library.shelfEdit);

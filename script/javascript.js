const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.toggleReadStatus = function() {
        this.read = !this.read;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

// Example book
addBookToLibrary('Dune', 'Frank Herbert', 453, false);
addBookToLibrary('1984', 'George Orwell', 328, true);
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, false);

console.log(myLibrary);

// Each book in myLibrary and it's attributes 
function displayBooks(libraryBooks) {
    const container = document.getElementById('book-list'); // Get the container element by its ID
    container.innerHTML = libraryBooks.map((book, index) => `
        <div class="book">
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: ${book.read ? 'Yes' : 'No'} <input type="checkbox" onchange="toggleReadStatusAndUpdate(${index}, this.checked)" ${book.read ? 'checked' : ''}></p>
            <p>Read: </p>
            <button onclick="deleteBook(${index})">Delete</button>
        </div>
    `).join('');
}

function toggleReadStatusAndUpdate(index, isChecked) {
    myLibrary[index].toggleReadStatus();
    displayBooks(myLibrary);
}


// Toggles new book form
const openDialogButton = document.getElementById('openDialog');
const addBookDialog = document.getElementById('addBookDialog');

openDialogButton.addEventListener('click', function() {
  addBookDialog.showModal(); // Open the dialog
});

function closeDialog() {
  addBookDialog.close(); // Close the dialog
}

// Adds new book through form
function addBook(event) {
    event.preventDefault(); // prevents from submission

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = parseInt(document.getElementById('pages').value);
    const read = document.getElementById('read').checked;

      console.log('Form values:', title, author, pages, read);
    
    if (!title || !author || !pages) {
        console.log('Condition met:', !title, !author, isNaN(pages));
        alert('please fill in all fields.')
        return;
    }

    addBookToLibrary(title, author, pages, read);

    displayBooks(myLibrary);
    // clear form
    document.getElementById('addbook_form').reset();

    // Close dialog box
    addBookDialog.close(); 
}

// Delete book from library
function deleteBook(index){
    myLibrary.splice(index, 1);
    displayBooks(myLibrary);
}

// Display all books in the library
displayBooks(myLibrary);
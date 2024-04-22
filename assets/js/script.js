// Hamburger menu creation
document.addEventListener('DOMContentLoaded', function () {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const navList = document.querySelector('.nav-list');

  hamburgerMenu.addEventListener('click', function () {
      navList.classList.toggle('show'); // Add/remove 'show' when hamburger menu is clicked
  });
});

// Search functionality
document.addEventListener('DOMContentLoaded', function () {
  const bookListDiv = document.getElementById('bookList');
  const searchButton = document.querySelector('button');
  const loadingIndicator = document.getElementById('loading');
  const searchInput = document.getElementById('searchInput'); 
// Search books--input
  searchButton.addEventListener('click', function () {
      const category = searchInput.value.toLowerCase();
      searchCategory(category);
  });
  searchInput.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
          const category = searchInput.value.toLowerCase();
          searchCategory(category);
      }
  });
// Search books--processing
function searchCategory(category) {
  const apiUrl = `https://openlibrary.org/subjects/${category}.json`;
  showLoadingIndicator();
  clearBookList();
  getData(apiUrl, displayBooksOnScreen);
}

function showLoadingIndicator() {
  loadingIndicator.innerHTML = 'Caricamento...'
  loadingIndicator.style.display = 'block';
}

function clearBookList() {
  bookListDiv.innerHTML = '';
}

function getData(apiUrl, callback) {
  fetch(apiUrl)
      .then(handleResponse)
      .then(callback)
      .catch(handleError);
}
// Search books--output
function displayBooksOnScreen(data) {
  const books = data.works || [];
  books.forEach(displayBook);
  hideLoadingIndicator();
}

function displayBook(book) {
  const title = book.title;
  const authors = book.authors.map(author => author.name).join(', ');
  const bookDiv = document.createElement('div');
  bookDiv.classList.add('book-box');
  bookDiv.innerHTML = `<p><strong>${title}</strong> - ${authors}</p>`;
  bookDiv.addEventListener('mouseenter', () => bookDiv.classList.add('highlight'));
  bookDiv.addEventListener('mouseleave', () => bookDiv.classList.remove('highlight'));
  bookDiv.addEventListener('click', () => bookDescription(book.key)); // Book description--input
  bookListDiv.classList.add('book-list-box');
  bookListDiv.appendChild(bookDiv);
}

function hideLoadingIndicator() {
  loadingIndicator.style.display = 'none';
}

function handleError(error) {
  console.error('Si è verificato un errore:', error);
  hideLoadingIndicator();
}
// Book description--processing
function bookDescription(key) {
  const apiUrl = `https://openlibrary.org${key}.json`;
  getData(apiUrl, displayBookDescriptionOnScreen);
}

function getData(apiUrl, callback) {
  fetch(apiUrl)
      .then(handleResponse)
      .then(callback)
      .catch(handleError);
}
// Book description--output
function displayBookDescriptionOnScreen(data) {
  let description = data.description;
  if (typeof description === 'object') {
      description = JSON.stringify(description);
  } else if (typeof description === 'string' && description.startsWith('http')) {
      description = 'Descrizione non disponibile';
  }
  showDescriptionAlert(description || 'Descrizione non disponibile');
}

function showDescriptionAlert(description) {
  alert(description);
}

function handleError(error) {
  console.error('Si è verificato un errore:', error);
}

function handleResponse(response) {
  if (!response.ok) {
      throw new Error('Errore nella richiesta');
  }
  return response.json();
}
});
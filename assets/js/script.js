//Hamburger menu on mobile and tablet devices
document.addEventListener('DOMContentLoaded', function () {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const navList = document.querySelector('.nav-list');

  hamburgerMenu.addEventListener('click', function () {
    navList.classList.toggle('show'); // Add/remove'show' when hamburger menu is clicked
  });
});

//Search engine
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const bookListDiv = document.getElementById('bookList');
    const searchButton = document.querySelector('button');
  
    searchButton.addEventListener('click', searchBooks);
  
    function searchBooks() {
      const category = searchInput.value.toLowerCase();
      const apiUrl = `https://openlibrary.org/subjects/${category}.json`;

      bookListDiv.innerHTML = '';
  
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Errore nella richiesta');
          }
          return response.json();
        })
        .then(data => {
          const books = data.works || [];
          books.forEach(book => {
            const title = book.title;
            const authors = book.authors.map(author => author.name).join(', ');
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book-box');
            bookDiv.innerHTML = `<p><strong>${title}</strong> - ${authors}</p>`;
            bookDiv.addEventListener('mouseenter', () => bookDiv.classList.add('highlight'));
            bookDiv.addEventListener('mouseleave', () => bookDiv.classList.remove('highlight'));
            bookDiv.addEventListener('click', () => fetchBookDescription(book.key));
            bookListDiv.classList.add('book-list-box');
            bookListDiv.appendChild(bookDiv);
          });
        })
        .catch(error => {
          console.error('Si è verificato un errore:', error);
        });
    }
  
    function fetchBookDescription(key) {
      const apiUrl = `https://openlibrary.org${key}.json`;
  
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Errore nella richiesta');
          }
          return response.json();
        })
        .then(data => {
          const description = data.description || 'Descrizione non disponibile';
          alert(description);
        })
        .catch(error => {
          console.error('Si è verificato un errore:', error);
        });
    }
  });
// Hamburge menu creation
  document.addEventListener('DOMContentLoaded', function () {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const navList = document.querySelector('.nav-list');

  hamburgerMenu.addEventListener('click', function () {
    navList.classList.toggle('show'); // Add/remove'show' when hamburger menu is clicked
  });
});

//Search functionality & input
  document.addEventListener('DOMContentLoaded', function () { 
  const bookListDiv = document.getElementById('bookList');
  const searchButton = document.querySelector('button');
  const loadingIndicator = document.getElementById('loading');

  searchButton.addEventListener('click', searchBooks); 
  searchInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        searchBooks();
    }
  });

//Search books function
  function searchBooks() {
      const category = searchInput.value.toLowerCase(); 
      const apiUrl = `https://openlibrary.org/subjects/${category}.json`;
      loadingIndicator.innerHTML = 'Caricamento...' //processing
      loadingIndicator.style.display = 'block'; 
      bookListDiv.innerHTML = '';
      fetch(apiUrl) 
          .then(response => {
              if (!response.ok) {
                  throw new Error('Errore nella richiesta');
              }
              return response.json();
          })
          .then(data => { //output
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
              loadingIndicator.style.display = 'none'; 
          })
          .catch(error => {
              console.error('Si è verificato un errore:', error);
              loadingIndicator.style.display = 'none'; 
          });
  }
  
//Book Desription function 
  function fetchBookDescription(key) {
      const apiUrl = `https://openlibrary.org${key}.json`;

      fetch(apiUrl) //processing
          .then(response => {
              if (!response.ok) {
                  throw new Error('Errore nella richiesta');
              }
              return response.json();
          })
          .then(data => { 
            let description = data.description;
            if (typeof description === 'object') {
                description = JSON.stringify(description);
            }
            else if (typeof description === 'string' && description.startsWith('http')) {
              description = 'Descrizione non disponibile';
            }
            alert(description || 'Descrizione non disponibile'); //output
        })
          .catch(error => {
              console.error('Si è verificato un errore:', error);
          });
  }
});


document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');
  const bookListDiv = document.getElementById('bookList');
  const searchButton = document.querySelector('button');
  const loadingIndicator = document.getElementById('loading'); // Aggiungi l'elemento di caricamento

  searchButton.addEventListener('click', searchBooks);

  searchInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        searchBooks();
    }
  });

  function searchBooks() {
      const category = searchInput.value.toLowerCase();
      const apiUrl = `https://openlibrary.org/subjects/${category}.json`;

      bookListDiv.innerHTML = '';
      loadingIndicator.innerHTML = 'Caricamento...'
      loadingIndicator.style.display = 'block'; // Mostra l'indicatore di caricamento

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
              loadingIndicator.style.display = 'none'; // Nascondi l'indicatore di caricamento dopo il completamento
          })
          .catch(error => {
              console.error('Si è verificato un errore:', error);
              loadingIndicator.style.display = 'none'; // Assicurati che l'indicatore di caricamento venga nascosto anche in caso di errore
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
            let description = data.description;

            // Verifica se la descrizione è un oggetto
            if (typeof description === 'object') {
                // Se è un oggetto, converte la descrizione in una stringa
                description = JSON.stringify(description);
            }
            else if (typeof description === 'string' && description.startsWith('http')) {
              description = 'Descrizione non disponibile';
            }
            // Visualizza la descrizione
            alert(description || 'Descrizione non disponibile');
        })
          .catch(error => {
              console.error('Si è verificato un errore:', error);
          });
  }
});


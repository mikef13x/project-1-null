const searchForm = document.querySelector('#searchForm');
const searchInput = document.querySelector('#searchInput');
const genreSelect = document.querySelector('#genreSelect');
const searchButton = document.querySelector('#searchButton');
const resultsContainer = document.getElementById('resultsContainer'); 

searchForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const searchTerm = searchInput.value.trim();
    const selectedGenre = genreSelect.value;
    
    const apiUrl = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(searchTerm)}&genre=${encodeURIComponent(selectedGenre)}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(responseData => {
            const animeData = responseData.data;
            console.log('Anime Data:', animeData);

            
            // Clear previous search results
            resultsContainer.innerHTML = '';

            // Loop through the search results and create cards for each result
            animeData.forEach(anime => {
                const resultCard = document.createElement('div');
                resultCard.classList.add('column');

                const card = document.createElement('div');
                card.classList.add('card');

                const cardImage = document.createElement('div');
                cardImage.classList.add('card-image');

                const image = document.createElement('img');
                image.src = anime.images['poster']; 

                const cardContent = document.createElement('div');
                cardContent.classList.add('card-content');

                const title = document.createElement('p');
                title.classList.add('title');
                title.textContent = anime.title;

                const subtitle = document.createElement('p');
                subtitle.classList.add('subtitle');
                subtitle.textContent = anime.synopsis;

                cardImage.appendChild(image);
                cardContent.appendChild(title);
                cardContent.appendChild(subtitle);

                card.appendChild(cardImage);
                card.appendChild(cardContent);

                resultCard.appendChild(card);

                resultsContainer.appendChild(resultCard);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

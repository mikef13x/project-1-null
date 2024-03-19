const searchForm = document.querySelector('#searchForm');
const searchInput = document.querySelector('#searchInput');
const genreSelect = document.querySelector('#genreSelect');
const searchButton = document.querySelector('#searchButton');
const resultsContainer = document.getElementById('resultsContainer'); 

searchForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const searchTerm = searchInput.value.trim();
    const selectedGenre = genreSelect.value.toLowerCase();
    
    const apiUrl = `https://api.jikan.moe/v4/anime?q=${(searchTerm)}&genre=${(selectedGenre)}`

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Bad Response');
            }
            return response.json();
        })
        .then(data => {
            const animeData = data.data;
            console.log('Anime Data:', animeData);
            // Filter anime data based on the selected genre
            // const filteredAnime = animeData.filter(anime => {
            //     const lowerCaseName = anime.title.toLowerCase();
            //     const matchesGenre = anime.genres(genre => genre.name.toLowerCase() === selectedGenre);
            //     const matchesSearchTerm = lowerCaseName.includes(searchTerm.toLowerCase());
            //     return matchesGenre && matchesSearchTerm;


            

            
            // Clear previous search results
            resultsContainer.innerHTML = '';

            // Loop through the search results and create cards for each result

                animeData.forEach(anime => {
                const resultCard = document.createElement('div');
                resultCard.classList.add('column');

                const card = document.createElement('div');
                card.classList.add('card');
                card.classList.add('animeCard')

                const cardImage = document.createElement('div');
                cardImage.classList.add('card-image');
                
                const image = document.createElement('img');
                image.src = anime.images.jpg.large_image_url;

                const cardContent = document.createElement('div');
                cardContent.classList.add('card-content');

                const title = document.createElement('p');
                title.classList.add('title');
                title.textContent = anime.title;

                const synopsis = document.createElement('p');
                synopsis.classList.add('synopsis');
                synopsis.textContent = anime.synopsis;
                
                const animeScore =document.createElement('p')
                animeScore.classList.add('animeScore')
                animeScore.textContent='Rating:'+'⭐'+ anime.score

                const animeTrailer =document.createElement('a')
                animeTrailer.classList.add('animeTrailer')
                animeTrailer.href=anime.trailer.url
                animeTrailer.textContent='Anime Trailer'
                // so trailer loads in new tab
                animeTrailer.target = "_blank";

                cardImage.appendChild(image);
                cardContent.appendChild(title);
                cardContent.appendChild(synopsis);
                cardContent.appendChild(animeScore);
                cardContent.appendChild(animeTrailer);

                card.appendChild(cardImage);
                card.appendChild(cardContent);
                resultCard.appendChild(card);

                resultsContainer.appendChild(resultCard);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

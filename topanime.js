var topAnimeURL = 'https://api.jikan.moe/v4/top/anime';
var currentPage = 1;
var itemsPerPage = 10;

function getTopAnime() {
    fetch(`${topAnimeURL}?page=${currentPage}`)
        .then(response => response.json())
        .then(data => {
            data.data.sort((a, b) => a.rank - b.rank) //data will now display in increasing order
            for (let i = 0; i < itemsPerPage; i++) {
                var animeTitle = data.data[i].titles[0].title;
                var synopsis = data.data[i].synopsis;
                var newSynopsis = synopsis.substring(0, synopsis.length - 24); // this will remove the last 24 characters of the synopsis.
                var rank = 'Rank: ' + data.data[i].rank;
                var score = '⭐' + data.data[i].score;
                var image = data.data[i].images.jpg.small_image_url;
                var episodes = '(' + data.data[i].episodes + ' eps)';

                var animeCard = document.createElement('div');
                animeCard.classList.add('box');
                // ADD BUTTON TO ADD ANIME TO 'MY LIST'. add <p>${newSynopsis}</p> maybe as a modal.
                animeCard.innerHTML = `
                     <img src="${image}">
                     <div class='anime-info'>
                     <h1><strong>${animeTitle}</strong></h1>
                     <h4><strong>${rank}</strong></h4>
                     <p>${newSynopsis}</p>
                     <p>${episodes}</p>
                     <p>${score}</p>
                        `;
                document.querySelector('.top-anime-content').appendChild(animeCard);
            }
            var nextPageButton = document.createElement('button');
            nextPageButton.classList.add('are-medium', 'is-responsive', 'is-hovered', 'is=white');
            nextPageButton.textContent = 'Next Page';
            nextPageButton.addEventListener('click', () => {
                currentPage++;
                document.querySelector('.top-anime-content').innerHTML = '';
                getTopAnime();
            });
            var prevPageButton = document.createElement('button');
            prevPageButton.classList.add('are-medium', 'is-responsive', 'is-hovered', 'is-white');
            prevPageButton.textContent = 'Previous Page';
            prevPageButton.addEventListener('click', () => {
                currentPage--;
                document.querySelector('.top-anime-content').innerHTML = '';
                getTopAnime();
            })
            document.querySelector('.top-anime-content').appendChild(prevPageButton);
            document.querySelector('.top-anime-content').appendChild(nextPageButton);
        })
}


getTopAnime();

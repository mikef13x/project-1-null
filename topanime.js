var topAnimeURL = 'https://api.jikan.moe/v4/top/anime';
var currentPage = 1;
var itemsPerPage = 25;

function getTopAnime(){
    fetch(`${topAnimeURL}?page=${currentPage}`)
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < itemsPerPage; i++) {
            var animeTitle = data.data[i].titles[0].title;
            var synopsis = data.data[i].synopsis;
            var rank = 'Rank: ' + data.data[i].rank;
            var score = '⭐' + data.data[i].score;
            var image = data.data[i].images.jpg.small_image_url;
            var episodes = '(' + data.data[i].episodes + ' eps)';

    var animeCard = document.createElement('div');
    animeCard.classList.add('box');
// ADD BUTTON TO ADD ANIME TO 'MY LIST'
    animeCard.innerHTML = `
    <img src="${image}">
    <div class='anime-info'>
    <h1><strong>${animeTitle}</strong></h1>
    <h4><strong>${rank}</strong></h4>
    <p>${episodes}</p>
    <p>${synopsis}</p>
    <p>${score}</p>
    `;
    document.querySelector('.top-anime-content').appendChild(animeCard);
}
var nextPageButton = document.createElement('button');
nextPageButton.textContent = 'Next Page';
nextPageButton.addEventListener('click', () => {
    currentPage++;
    document.querySelector('.top-anime-content').innerHTML = '';
    getTopAnime();
});
var prevPageButton = document.createElement('button');
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

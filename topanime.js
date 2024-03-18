var topAnimeURL = 'https://api.jikan.moe/v4/top/anime';
var currentPage = 1;
var itemsPerPage = 25;

function getTopAnime(){
fetch(topAnimeURL).then(response => response.json()).then(data => {
    for (let i = 0; i < itemsPerPage; i++) {
        var animeTitle = data.data[i].titles[0].title;
        var synopsis = data.data[i].synopsis;
        var rank = 'Rank: ' + data.data[i].rank;
        var score = '⭐' + data.data[i].score;
        var image = data.data[i].images.jpg.small_image_url;

    var animeCard = document.createElement('div');
    animeCard.classList.add('box');

    animeCard.innerHTML = `
    <h2>${animeTitle}</h2>
    <img src="${image}">
    <h4><strong>${rank}</strong></h4>
    <p>${synopsis}</p>
    <p>${score}</p>
    `;
    document.querySelector('.top-anime-content').appendChild(animeCard);
}
var nextPageButton = document.createElement('button');
nextPageButton.textContent = 'Next Page';
nextPageButton.addEventListener('click', () => {
    currentPage++;
    document.querySelector('.top-anime-content').innerHTML = ''; // Clear previous content
    getTopAnime();
});
document.querySelector('.top-anime-content').appendChild(nextPageButton);

})
}

getTopAnime();

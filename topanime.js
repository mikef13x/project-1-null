// global variables
var topAnimeURL = 'https://api.jikan.moe/v4/top/anime';
var currentPage = 1;
var animeList = JSON.parse(localStorage.getItem("Anime")) || [];
var itemsPerPage = 25;
var animeCard;

function getTopAnime() {
    fetch(`${topAnimeURL}?page=${currentPage}`)
        .then(response => response.json())
        .then(data => {
            data.data.sort((a, b) => a.rank - b.rank)
            for (let i = 0; i < itemsPerPage; i++) {
                var animeTitle = data.data[i].titles[0].title;
                var synopsis = data.data[i].synopsis;
                var newSynopsis = synopsis.substring(0, synopsis.length - 24);
                var rank = data.data[i].rank;
                var score = data.data[i].score;
                var image = data.data[i].images.jpg.large_image_url;
                var episodes = data.data[i].episodes;
                var malId = data.data[i].mal_id;
                // Any data that has no episodes and no rank then create a div and box for the anime.
                if (!!rank && !!episodes) {
                    animeCard = document.createElement('div');
                    animeCard.classList.add('box');
                    animeCard.setAttribute('id', malId);

                    animeCard.innerHTML = `
                            <img class='anime-img' src="${image}">
                            <div class='anime-info is-text-align-center'>
                            <h1><strong>${animeTitle}</strong></h1>
                            <h4><strong>Rank: ${rank}</strong></h4>
                            <p>(${episodes} eps)</p>
                            <p>⭐${score}</p>
                            <button id="${malId}" data-anime-title="${animeTitle.toString()}" data-anime-image=${image} class="button is-danger m-4">+ Add to MyList</button>
                                `;

                    document.querySelector('.top-anime-content').appendChild(animeCard);
                    var myListBtn = document.getElementById(malId);
                    myListBtn.addEventListener("click", setList);
                    //creates the modal
                    var modal = document.createElement('div');
                    modal.classList.add('modal', 'modal-card', 'p-4');
                    modal.innerHTML = `<p>${newSynopsis}</p>`;
                    modal.setAttribute('id', `${malId}-modal`);

                    animeCard.appendChild(modal);

                    (function (currentAnimeCard, currentModal) {
                        currentAnimeCard.addEventListener('mouseenter', () => {
                            currentModal.style.display = 'block';
                        });
                        currentAnimeCard.addEventListener('mouseleave', () => {
                            currentModal.style.display = 'none';
                        });
                    })(animeCard, modal);
                }
            }
            //next and previous buttons
            var nextPageButton = document.createElement('button');
            nextPageButton.classList.add('button', 'are-medium', 'is-responsive', 'is-hovered', 'is-danger', 'm-4');

            nextPageButton.textContent = 'Next Page';
            nextPageButton.addEventListener('click', () => {
                currentPage++;
                document.querySelector('.top-anime-content').innerHTML = '';
                getTopAnime();
            });
            var prevPageButton = document.createElement('button');

            prevPageButton.classList.add('button', 'are-medium', 'is-responsive', 'is-hovered', 'is-danger', 'm-4');

            prevPageButton.textContent = 'Previous Page';
            prevPageButton.addEventListener('click', () => {
                currentPage--;
                document.querySelector('.top-anime-content').innerHTML = '';
                getTopAnime();

            });
            document.querySelector('.top-anime-content').appendChild(prevPageButton);
            document.querySelector('.top-anime-content').appendChild(nextPageButton);
        });

}


getTopAnime();

// function for setting localstorage for the myList page.
function setList(event) {
    var animeTitle = event.target.getAttribute("data-anime-title");
    var imgUrl = event.target.getAttribute("data-anime-image");
    var animeObj = {
        title: animeTitle,
        image: imgUrl,
    }
    const isTitleInArray = animeList.some(obj => obj.title === animeTitle);
    //if title is not in array then push the object to local storage, if it is already in local storage then return.
    if (!isTitleInArray) {
        animeList.push(animeObj);
        animeList.push(animeCard);
        localStorage.setItem("Anime", JSON.stringify(animeList.filter(obj => Object.keys(obj).length !== 0))); // set the object to local storage only if the object is not equal in value or type to 0
    } else {
        return;
    }
}
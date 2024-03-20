var topAnimeURL = 'https://api.jikan.moe/v4/top/anime';
var currentPage = 1;
var animeList = JSON.parse(localStorage.getItem("Anime")) || []
var itemsPerPage = 25;


function getTopAnime() {
    fetch(`${topAnimeURL}?page=${currentPage}`)
        .then(response => response.json())
        .then(data => {

            for (let i = 0; i < itemsPerPage; i++) {
                var animeTitle = data.data[i].titles[0].title;
                var synopsis = data.data[i].synopsis;
                var newSynopsis = synopsis.substring(0, synopsis.length - 24);
                var rank = 'Rank: ' + data.data[i].rank;
                var score = '⭐' + data.data[i].score;
                var image = data.data[i].images.jpg.large_image_url;
                var episodes = '(' + data.data[i].episodes + ' eps)';
                var malId = data.data[i].mal_id;

                console.log(animeTitle)
                var animeCard = document.createElement('div');
                animeCard.classList.add('box');
                animeCard.setAttribute('id', malId);



                // ADD BUTTON TO ADD ANIME TO 'MY LIST'
                animeCard.innerHTML = `
                    <img class='anime-img' src="${image}">
                    <div class='anime-info'>
                    <h1><strong>${animeTitle}</strong></h1>
                    <h4><strong>${rank}</strong></h4>
                    <p>${episodes}</p>
                    <p>${score}</p>
                    <button id="${malId}" data-anime-title="${animeTitle.toString()}" data-anime-image=${image} class="button is-danger">+ Add to MyList</button>
                         `;

                document.querySelector('.top-anime-content').appendChild(animeCard);
                var myListBtn = document.getElementById(malId);
                myListBtn.addEventListener("click", setList);

                var modal = document.createElement('div');
                modal.classList.add('modal', 'modal-card');
                modal.innerHTML = `<p>${newSynopsis}</p>`;
                modal.setAttribute('id', `${malId}-modal`);

                animeCard.appendChild(modal);

                (function(currentAnimeCard, currentModal) {
                    currentAnimeCard.addEventListener('mouseenter', () => {
                        currentModal.style.display = 'block';
                    });
                    currentAnimeCard.addEventListener('mouseleave', () => {
                        currentModal.style.display = 'none';
                    });
                })(animeCard, modal);
            }

            var nextPageButton = document.createElement('button');
            nextPageButton.classList.add('button', 'are-medium', 'is-responsive', 'is-hovered', 'is-danger');

            nextPageButton.textContent = 'Next Page';
            nextPageButton.addEventListener('click', () => {
                currentPage++;
                document.querySelector('.top-anime-content').innerHTML = '';
                getTopAnime();
            });
            var prevPageButton = document.createElement('button');

            prevPageButton.classList.add('button', 'are-medium', 'is-responsive', 'is-hovered', 'is-danger');

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


function setList(event) {
    console.log("working", event.target.getAttribute("data-anime-title"));
    var animeTitle = event.target.getAttribute("data-anime-title");
    console.log(animeTitle);
    var imgUrl = event.target.getAttribute("data-anime-image");
    console.log(imgUrl);
    console.log(animeList);
    var animeObj = {
        title: animeTitle,
        image: imgUrl,
    }
    console.log(animeObj);
    animeList.push(animeObj);
    console.log(animeList);
    localStorage.setItem("Anime", JSON.stringify(animeList));
    //     if (animeList.join("").includes(animeCard) === false) {
    //         animeList.push(animeCard)
    //         localStorage.setItem("Anime", JSON.stringify(animeList))

    //     }

}



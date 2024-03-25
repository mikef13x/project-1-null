document.addEventListener('DOMContentLoaded',function(){
  const urlParameters = new URLSearchParams(window.location.search);
  const homepageSearchTerm = urlParameters.get('q')
  if(homepageSearchTerm){
      searchAnime(homepageSearchTerm);
  }


// query selectors
const searchForm = document.querySelector('#searchForm');
const searchInput = document.querySelector('#searchInput');
const resultsContainer = document.getElementById('resultsContainer');

searchForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const searchTerm = searchInput.value.trim();
  searchAnime(searchTerm)

  
  
});
// function to make the api call
function searchAnime(searchTerm){
  let apiUrl = `https://api.jikan.moe/v4/anime?q=${(searchTerm)}`

  fetch(apiUrl)
      .then(response => {
          if (!response.ok) {
              throw new Error('Bad Response');
          }
          return response.json();
      })
      .then(data => {
        // lets animeDate = data.data from the jikan database
          const animeData = data.data;
          console.log('Anime Data:', animeData);
        

          // Clear previous search results
          resultsContainer.innerHTML = '';

          // Loop through the search results and create cards for each result
          animeData.forEach(anime => {
              console.log('anime:', anime)
              const resultCard = document.createElement('div');
              resultCard.classList.add('column');

              const card = document.createElement('div');
              card.classList.add('box');
              card.classList.add('animeCard');

              const cardImage = document.createElement('div');
              cardImage.classList.add('card-image');
              cardImage.classList.add('is-flex','is-justify-content-center','is-align-items-center')

              const image = document.createElement('img');
              image.src = anime.images.jpg.large_image_url;
              image.classList.add('image');
              image.classList.add('displayImage')


              const cardContent = document.createElement('div');
              cardContent.classList.add('card-content');

              const title = document.createElement('p');
              title.classList.add('title');
              title.textContent = anime.title;

              const synopsis = document.createElement('p');
              synopsis.classList.add('synopsis');
              synopsis.textContent = anime.synopsis;

              const animeScore = document.createElement('p');
              animeScore.classList.add('animeScore');
              animeScore.textContent = 'Rating: ⭐' + anime.score;

              const animeTrailer = document.createElement('a');
            //   if statement when anime trailer = null / doesnt exist
              if (anime.trailer.url){  
              
              animeTrailer.classList.add('animeTrailer');
              animeTrailer.href = anime.trailer.url;
              animeTrailer.textContent = 'Watch Trailer';
              animeTrailer.classList.add('has-text-danger')
            //  Opens a new tab for the trailer instead of redirecting the current page
              animeTrailer.target = "_blank";

              }else{
                animeTrailer.textContent='Trailer Not Available'
                animeTrailer.classList.add('has-text-danger')
              }
            //   font awesome youtube icon for trailers
              const trailerIcon= document.createElement('i')
              trailerIcon.classList.add('fas')
              trailerIcon.classList.add('fa-brands')
              trailerIcon.classList.add('fa-youtube')
              trailerIcon.classList.add('has-text-danger')
              trailerIcon.classList.add('mr-2','mt-4',)

              const savebutton = document.createElement('button')
              savebutton.classList.add('button','is-danger','mt-2','ml-5')
              savebutton.setAttribute('data-anime-title',anime.title.toString());
              savebutton.setAttribute('data-anime-image',anime.images.jpg.large_image_url)
              savebutton.textContent= ('+ Add to My List')
              savebutton.addEventListener('click',setList)
             
            //   append card elements to the document
              cardImage.appendChild(image);
              cardContent.appendChild(title);
              cardContent.appendChild(synopsis);
              cardContent.appendChild(animeScore);
              cardContent.appendChild(trailerIcon)
              cardContent.appendChild(animeTrailer);
              
              card.appendChild(cardImage);
              card.appendChild(cardContent);
              cardContent.appendChild(savebutton)

              resultCard.appendChild(card);
              resultsContainer.appendChild(resultCard);
          });
      })
      .catch(error => console.error('Failed to fetch data:', error));
}
});
// function for saving items to local storage
var animeList = JSON.parse(localStorage.getItem("Anime")) || []
function setList(event) {
    event.preventDefault()
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
  const isTitleInArray = animeList.some(obj => obj.title === animeTitle); 
  if (!isTitleInArray) {
      animeList.push(animeObj);
      animeList.push()
      localStorage.setItem("Anime", JSON.stringify(animeList.filter(obj => Object.keys(obj).length !== 0)));
  }else {
      localStorage.setItem("Anime", JSON.stringify(animeList.filter(obj => Object.keys(obj).length !== 0)));
  }  
}
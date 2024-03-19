document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    if(event.key === "Escape") {
      closeAllModals();
    }
  });
});


var topAnime = document.querySelector("#topAnime")
 var   topAnimeUrl = "./topanime.html"
function topAnimeList(event) {
    event.preventDefault()
    document.location.assign(topAnimeUrl)


}

topAnime.addEventListener("click", topAnimeList);

var goToResults = document.querySelector("#goToResults")
var resultsUrl = "./searchresults.html"
function resultsPage(event) {
    event.preventDefault()
    document.location.assign(resultsUrl)

}

goToResults.addEventListener("click", resultsPage)

var myList = document.querySelector("#myList")
var myListUrl = "./mylist.html"
function myListPage(event) {
    event.preventDefault()
    document.location.assign(myListUrl)
}

myList.addEventListener("click", myListPage)


var animeQuoteUrl = "https://animechan.xyz/api/random";

function getAnimeQuote() {
  fetch(animeQuoteUrl)
  .then(response => response.json())
  .then (data => {
    var quoteArea = document.querySelector(".quote")
    quoteArea.innerHTML = '"' + data["quote"] + '"';

    var quoteAuthor = document.createElement("p")
    quoteAuthor.innerHTML = "- " + data["character"]
    quoteArea.append(quoteAuthor);

    var quoteShow = document.createElement("p")
    quoteShow.innerHTML = "Anime: " + data["anime"] ;
    quoteAuthor.append(quoteShow);
  })
}

getAnimeQuote();
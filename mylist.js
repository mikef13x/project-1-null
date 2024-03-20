var ANIME = "Anime";
var storageList = JSON.parse(localStorage.getItem(ANIME)) || [];
var myListDiv = document.querySelector(".myAnimeList")
var currentPage = 1
var itemsPerPage = 10



function generateList(cardsList) {
    for (i = 0; i < itemsPerPage; i++) {
        var animeList = document.createElement("div")
        animeList.classList.add('box');

        var title = cardsList[i].title;
        var image = cardsList[i].image;
        var imageEl = document.createElement("img")
        var titleEl = document.createElement("p")
        imageEl.src = image;
        titleEl.textContent = title;
        animeList.append(imageEl);
        animeList.append(titleEl);
        imageEl.classList.add("listImage")
        animeList.classList.add("animeList")
        if (cardsList[i]) {
            myListDiv.append(animeList);
        }
    }
}

function createNextPrevBtn() {
    var nextBtn = document.createElement("button");
    var prevBtn = document.createElement("button");
    nextBtn.classList.add("button", "is-danger");
    prevBtn.classList.add("button", "is-danger");
    nextBtn.innerHTML = "next"
    prevBtn.innerHTML = "prev"

    myListDiv.append(nextBtn)


    if (!currentPage) {
        myListDiv.append(prevBtn)
    }

    nextBtn.addEventListener("click", () => {
        currentPage++;
        myListDiv.innerHTML = "";
        getNextCards(ANIME, itemsPerPage, currentPage);


    })

}
function getInitialMyList() {
  
    generateList(storageList);
    createNextPrevBtn();
    // for (i = 0; i < itemsPerPage; i++) {
    //     var animeList = document.createElement("div")
    //     animeList.classList.add('box');

    //     var title = storageList[i].title;
    //     var image = storageList[i].image;
    //     var imageEl = document.createElement("img")
    //     var titleEl = document.createElement("p")
    //     imageEl.src = image;
    //     titleEl.textContent = title;
    //     animeList.append(imageEl);
    //     animeList.append(titleEl);
    //     imageEl.classList.add("listImage")
    //     animeList.classList.add("animeList")
    //     if (storageList[i]) {
    //         myListDiv.append(animeList);
    //     }
    // }
    // var nextBtn = document.createElement("button");
    // var prevBtn = document.createElement("button");
    // nextBtn.classList.add("button", "is-danger");
    // prevBtn.classList.add("button", "is-danger");
    // nextBtn.innerHTML = "next"
    // prevBtn.innerHTML = "prev"

    // myListDiv.append(nextBtn)


    // if (!currentPage) {
    //     myListDiv.append(prevBtn)
    // }

    // nextBtn.addEventListener("click", () => {
    //     currentPage++;
    //     myListDiv.innerHTML = "";
    //     getNextCards(ANIME, itemsPerPage, currentPage);


    // })


}

function getNextCards(lsKey, pageSize, pageNumber) {
    const localAnimeCards = JSON.parse(localStorage.getItem(lsKey));
    console.log(localAnimeCards)
    var startCard = pageSize * (pageNumber - 1);
    console.log(startCard)
    var lastCard = pageSize * pageNumber;
    console.log(lastCard)
    var paginatedAnimeCards = localAnimeCards.slice(startCard, lastCard)
    console.log(paginatedAnimeCards)
    generateList(paginatedAnimeCards);
    createNextPrevBtn();

}






getInitialMyList();
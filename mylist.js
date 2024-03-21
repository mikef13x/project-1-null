var ANIME = "Anime";
var storageList = JSON.parse(localStorage.getItem(ANIME)) || [];
var myListDiv = document.querySelector(".myAnimeList")




function generateList(cardsList) {
    var clearList = document.createElement("button")
    clearList.classList.add("button", "is-danger")
    clearList.innerHTML = "clear list"
    for (i = 0; i < storageList.length; i++) {
        var animeList = document.createElement("div")
        var removeBtn = document.createElement("button")

        animeList.classList.add('box');
        animeList.classList.add("is-flex")
        animeList.classList.add("has-text-weight-bold")
        animeList.classList.add("is-align-items-center")

        myListDiv.classList.add("is-block")
        removeBtn.classList.add("button", "is-small", "is-danger", "m-6")
        removeBtn.innerHTML = "X"

        var title = cardsList[i].title;
        var image = cardsList[i].image;
        var imageEl = document.createElement("img")
        var titleEl = document.createElement("p")

        imageEl.src = image;
        titleEl.textContent = title;
        animeList.append(imageEl);
        animeList.append(titleEl);
        animeList.append(removeBtn);

        imageEl.classList.add("listImage")
        imageEl.classList.add("is-flex")
        animeList.classList.add("animeList")

        if (cardsList[i]) {
            myListDiv.append(animeList);
            myListDiv.append(clearList)
        }

    }
    clearList.addEventListener('click', function () {
        localStorage.removeItem("Anime")
        location.reload()
    });

}

// function createNextPrevBtn() {
//     var nextBtn = document.createElement("button");
//     var prevBtn = document.createElement("button");
//     nextBtn.classList.add("button", "is-danger");
//     prevBtn.classList.add("button", "is-danger");
//     nextBtn.innerHTML = "next"
//     prevBtn.innerHTML = "prev"
//     myListDiv.append(prevBtn)
//     myListDiv.append(nextBtn)


//     prevBtn.addEventListener("click", () => {
//         currentPage--;
//         myListDiv.innerHTML = "";
//         getNextCards(ANIME, itemsPerPage, currentPage);
//     })




//     nextBtn.addEventListener("click", () => {
//         currentPage++;
//         myListDiv.innerHTML = "";
//         getNextCards(ANIME, itemsPerPage, currentPage);


//     })

//     if(currentPage === 1) {
//         prevBtn.disabled = true
//     } else {
//         prevBtn.disabled = false
//     }


// }

function getInitialMyList() {

    generateList(storageList);
    // createNextPrevBtn();
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

// function getNextCards(lsKey, pageSize, pageNumber) {
//     const localAnimeCards = JSON.parse(localStorage.getItem(lsKey));

//     var startCard = pageSize * (pageNumber - 1);

//     var lastCard = pageSize * pageNumber;

//     var paginatedAnimeCards = localAnimeCards.slice(startCard, lastCard)

//     generateList(paginatedAnimeCards);
//     createNextPrevBtn();

// }






getInitialMyList();
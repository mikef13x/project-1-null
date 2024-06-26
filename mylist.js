var ANIME = "Anime";
var storageList = JSON.parse(localStorage.getItem(ANIME)) || [];
var myListDiv = document.querySelector(".myAnimeList");

function generateList(cardsList) {
    var clearList = document.createElement("button");
    clearList.classList.add("button", "is-danger");
    clearList.innerHTML = "clear list";
    for (i = 0; i < storageList.length; i++) {
        var animeList = document.createElement("div");
        var removeBtn = document.createElement("button");
       
        animeList.classList.add('box', 'is-flex', 'has-text-weight-bold', 'is-align-items-center', 'is-justify-content-space-between');
        myListDiv.classList.add("is-block");
        removeBtn.classList.add("button", "is-small", "is-danger","m-6");
        removeBtn.innerHTML = "X";
        var title = cardsList[i].title;
        var image = cardsList[i].image;
        var imageEl = document.createElement("img");
        var titleEl = document.createElement("p");
        titleEl.classList.add("has-text-centered");
       
        imageEl.src = image;
        titleEl.textContent = title;
        animeList.append(imageEl);
        animeList.append(titleEl);
        animeList.append(removeBtn);
       
        imageEl.classList.add("listImage");
        imageEl.classList.add("is-flex");
        animeList.classList.add("animeList");
      
        if (cardsList[i]) {
            myListDiv.append(animeList);
            myListDiv.append(clearList);
        };
        (function(index) {
        removeBtn.addEventListener('click', function() {
            storageList.splice(index, 1);
            localStorage.setItem(ANIME, JSON.stringify(storageList));
            animeList.remove();
            location.reload();
        });
    })(i);
    };
    clearList.addEventListener('click', function() {
        localStorage.removeItem("Anime");
        location.reload();
    });
   
};

 
function getInitialMyList() {
    generateList(storageList);
};
getInitialMyList();




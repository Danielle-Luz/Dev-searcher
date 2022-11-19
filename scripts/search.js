import { getRequest } from "./api.js";

(() => {
    const searchButton = document.getElementById("search-button");
    const inputSearch = document.getElementById("input-search");
    
    inputSearch.addEventListener("input", () => {
        changeButtonState();
    });

    searchButton.addEventListener("click", event => {
        event.preventDefault();

        getSearch();
    });
})();

function changeButtonState () {
    const inputSearchValue = document.getElementById("input-search").value;
    const searchButton = document.getElementById("search-button");

    if (inputSearchValue) {
        searchButton.removeAttribute("disabled");
    } else {
        searchButton.setAttribute("disabled", "true");
    }
}

function setButtonDefaultText () {
    const searchButton = document.getElementById("search-button");

    searchButton.innerHTML = "Ver perfil do github";
}

function getSearch () {
    const searchedDev = document.getElementById("input-search").value;
    const url = `https://api.github.com/users/${searchedDev}`;

    setButtonOnLoad();

    getRequest(url)
    .then( devData => {
        if (devData) {
            const profileLink = document.getElementById("profile-link");

            localStorage.setItem("searchedDev", JSON.stringify(devData));

            addSearchedDev(devData);

            profileLink.click();
        }
    })
    .then(() => setButtonDefaultText());
}

function setButtonOnLoad () {
    const searchButton = document.getElementById("search-button");
    
    searchButton.innerHTML = "<img width='15' height='15' class='spin' src='../../assets/imgs/spinner.svg'>";
}

function addSearchedDev (devData) {
    while (true) {
        let searchedDevsList = JSON.parse(localStorage.getItem("searchedDevsList"));
    
        if (!searchedDevsList) {
            localStorage.setItem("searchedDevsList", JSON.stringify([]));
            continue;
        }

        if (searchedDevsList.length == 3) {
            searchedDevsList.shift();
        }

        if (!checkUserOnTheList(devData)) {
            searchedDevsList.push(devData);
    
            localStorage.setItem("searchedDevsList", JSON.stringify(searchedDevsList));
        }
        break;
    }
}

function checkUserOnTheList ({login: seachedUser}) {
    let searchedDevsList = JSON.parse(localStorage.getItem("searchedDevsList"));

    const foundUser = searchedDevsList.find(({login}) => login == seachedUser);

    if (foundUser) {
        return true;
    }

    return false;
}
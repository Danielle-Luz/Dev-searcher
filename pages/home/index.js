(() => {
    showLastSeenUsers();
    addLastSeenListener();
})();


function showLastSeenUsers () {
    const lastSeenProfiles = JSON.parse(localStorage.getItem("searchedDevsList"))||[];
    
    lastSeenProfiles.forEach( (profileData, index) => {
        const profilesContainer = document.querySelector(".users-img-wrapper");
        const profileElement = createLastSeenUser(profileData, index);
        
        addLastSeenTitle();
        
        profilesContainer.insertAdjacentHTML("beforeend", profileElement);
    })
}

function addLastSeenTitle () {
    const lastSeenWrapper = document.querySelector(".found-users-info");
    if (!lastSeenWrapper.querySelector(".title-3")) {
        lastSeenWrapper.insertAdjacentHTML("afterbegin", '<h2 class="title-3">Achados Recentemente:</h2>');
    }
}

function createLastSeenUser ({avatar_url, name}, index) {
    return `
    <li>
        <span class="tooltip" aria-label="botão para exibir perfil de um dos 3 últimos usuários vistos" role="button" data-profile-index=${index}>
            <img src="${avatar_url}" alt="${name}">
        </span>
    </li>`;
}

function addLastSeenListener () {
    const lastSeenProfiles = document.querySelectorAll(".users-img-wrapper span");

    lastSeenProfiles.forEach( profile => {
        profile.addEventListener("click", event => {
            const profileLink = document.getElementById("profile-link");
            
            event.preventDefault();
            
            openLastSeenUser(profile);
            
            profileLink.click();
        });
    });
}

function openLastSeenUser (profile) {
    const profileDataIndex = parseInt(profile.getAttribute("data-profile-index"));
    const lastSeenProfiles = JSON.parse(localStorage.getItem("searchedDevsList"));
    const userData = lastSeenProfiles[profileDataIndex];

    localStorage.setItem("searchedDev", JSON.stringify(userData));
}
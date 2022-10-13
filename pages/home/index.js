(() => {
    showLastSeenUsers();
    addLastSeenListener();
})();


function showLastSeenUsers () {
    const lastSeenProfiles = JSON.parse(localStorage.getItem("searchedDevsList"));
    
    lastSeenProfiles.forEach( (profileData, index) => {
        const profilesContainer = document.querySelector(".users-img-wrapper");
        const profileElement = createLastSeenUser(profileData, index);
        
        profilesContainer.insertAdjacentHTML("beforeend", profileElement);
    })
}

function createLastSeenUser ({avatar_url, name}, index) {
    return `
    <li>
        <span class="tooltip" aria-label="botão para exibir perfil de um dos 3 últimos usuários vistos" role="button" data-profile-index=${index}>
            <img src="${avatar_url}" alt="${name}">
        </span>
    </li>`;
}

function openLastSeenUser (profile) {
    const profileDataIndex = parseInt(profile.getAttribute("data-profile-index"));
    const lastSeenProfiles = JSON.parse(localStorage.getItem("searchedDevsList"));
    const userData = lastSeenProfiles[profileDataIndex];

    localStorage.setItem("searchedDev", JSON.stringify(userData));
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
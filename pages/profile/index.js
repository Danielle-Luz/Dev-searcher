(() => {
    appendDevProfileInfo();
    getRepos();
})();

function renderAllRepositoryCards (repositoryList) {
    const cardsContainer = document.querySelector(".cards-container");

    cardsContainer.innerHTML = "";

    repositoryList.forEach(repoInfo => {
        const repoElement = createRepositoryCard(repoInfo);
        cardsContainer.insertAdjacentHTML("beforeend", repoElement);
    });
}

function appendDevProfileInfo () {
    const userData = JSON.parse(localStorage.getItem("searchedDev"));
    const profileContainer = document.getElementById("profile-wrapper");
    const {avatar_url, name, bio, email, html_url: profileUrl} = userData;
    const profileInfo =
    `<a href="${profileUrl}" class="align-center d-flex profile">
        <img src="${avatar_url}" alt="${name}" width="80" height="80">
        <section>
            <h1 class="title-2">${name}</h1>
            <p class="text-1 text-ellipsis">${bio||"Sem descrição disponível."}</p>
        </section>
    </a>`
    ;

    setUserEmail(email);

    profileContainer.insertAdjacentHTML("beforeend", profileInfo);
}

function createRepositoryCard ({name, description, svn_url: repoUrl}) {
    const repo = 
    `<article class="align-center d-flex card full-width justify-center">
    <div class="full-width">
      <h2 class="title-3">${name}</h2>
      <p class="text-2 text-ellipsis">
        ${description||"Nenhuma descrição disponível."}
      </p>
      <div class="button-group d-flex">
        <a href="${repoUrl}" class="button-brand text-2" role="button">Repositório</a>
        <a class="button-outline text-2" role="button">Demo</a>
      </div>
    </div>
  </article>`;

  return repo;
}

function setUserEmail (email) {
    const emailButton = document.getElementById("email-button");
    let emailLink = "";

    if (email) {
        emailLink = `mailto:${email}`;
    }

    emailButton.setAttribute("href", emailLink);
}

async function getRepos () {
    const {repos_url} = JSON.parse(localStorage.getItem("searchedDev"));

    const response = await fetch(repos_url);
    const repositoryList = await response.json();

    renderAllRepositoryCards(repositoryList);
}
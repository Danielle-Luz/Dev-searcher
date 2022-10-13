(() => {
    appendDevProfileInfo();
    getRepos();
})();

async function renderAllRepositoryCards (repositoryList) {
    const cardsContainer = document.querySelector(".cards-container");

    cardsContainer.innerHTML = "";

    if (repositoryList.length == 0) {
        cardsContainer.innerHTML = "Nenhum repositório disponível.";
        cardsContainer.classList.add("text-1");
    }

    repositoryList.forEach( async repoInfo => {
        const repoElement = await createRepositoryCard(repoInfo);
        cardsContainer.insertAdjacentHTML("beforeend", repoElement);
    });

}

function appendDevProfileInfo () {
    const userData = JSON.parse(localStorage.getItem("searchedDev"));
    const profileContainer = document.getElementById("profile-wrapper");
    const {avatar_url, name, bio, email, html_url: profileUrl} = userData;
    const profileInfo =
    `<a href="${profileUrl}" class="align-center d-flex profile">
        <img src="${avatar_url}" alt="${name||"Descrição indisponível"}" width="80" height="80">
        <section>
            <h1 class="title-2">${name||"Nome indisponível"}</h1>
            <p class="text-1 text-ellipsis">${bio||"Sem descrição disponível."}</p>
        </section>
    </a>`
    ;

    document.title = name;

    setUserEmail(email);

    profileContainer.insertAdjacentHTML("beforeend", profileInfo);
}

async function createRepositoryCard ({name, description, svn_url: repoUrl, url: repoRequestUrl}) {
    const pagesUrl = await getGithubPagesUrl(repoRequestUrl);
    const repo = 
    `<article class="align-center d-flex card full-width justify-center">
    <div class="full-width">
      <h2 class="title-3">${name}</h2>
      <p class="text-2 text-ellipsis">
        ${description||"Nenhuma descrição disponível."}
      </p>
      <div class="button-group d-flex">
        <a href="${repoUrl}" class="button-brand text-2" role="button">Repositório</a>
        <a class="button-outline text-2" role="button"${(() => {
            if (pagesUrl) {
                return "href='"+ pagesUrl + "'"
            }
            return ""
        })()}">Demo</a>
      </div>
    </div>
  </article>`;

  return repo;
}

async function getGithubPagesUrl(repoRequestUrl) {
    const repoInfo = await fetch(repoRequestUrl);
    const repoInfoJson = await repoInfo.json();
    const {deployments_url} = repoInfoJson;
    const deploymentsInfo = await fetch(deployments_url);
    const {url: deploymentsUrl} = deploymentsInfo;
    const repoDeploymentInfo = await fetch(deploymentsUrl);
    const repoDeploymentInfoJson = await repoDeploymentInfo.json();
    
    if (repoDeploymentInfoJson.length != 0) {
        const {statuses_url} = repoDeploymentInfoJson[0];
        const statusesInfo = await fetch(statuses_url);
        const statusesInfoJson = await statusesInfo.json();
        const {environment_url} = statusesInfoJson[0];
        return `${environment_url}`; 
    }
    
    return "";
}

function setUserEmail (email) {
    const emailButton = document.getElementById("email-button");
    let emailLink = "";

    if (email) {
        emailLink = `mailto:${email}`;
        emailButton.setAttribute("href", emailLink);
    } else {
        const emailButtonWrapper = document.querySelector(".email-button-wrapper");
        emailButtonWrapper.setAttribute("disabled", "true");
        emailButtonWrapper.setAttribute("title", "Email indisponível");
    }

}

async function getRepos () {
    const {repos_url} = JSON.parse(localStorage.getItem("searchedDev"));

    const response = await fetch(repos_url);
    const repositoryList = await response.json();

    renderAllRepositoryCards(repositoryList);
}
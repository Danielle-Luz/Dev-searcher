
async function getRequest (url) {
    try {
        const response = await fetch(url);
        const responseJson = await response.json();

        userWasFound(responseJson);

        removeNotFoundMessage();

        return responseJson;
    } catch (err) {
        showNotFoundMessage();
    }
}

function userWasFound ({message}) {
    if (message == "Not Found") {
        throw new Exception();
    }
}

function showNotFoundMessage () {
    const notFoundElement = document.querySelector(".not-found-message");
    
    if (!notFoundElement) {
        const inputWrapper = document.querySelector(".input-wrapper");
        const notFoundMessage = '<span class="not-found-message text-2">Usuário não encontrado</span>';
    
        inputWrapper.insertAdjacentHTML("beforeend", notFoundMessage);
    }
}

function removeNotFoundMessage () {
    const notFoundMessage = document.querySelector(".not-found-message");

    if (notFoundMessage) {
        notFoundMessage.remove();
    }
}

export { getRequest };
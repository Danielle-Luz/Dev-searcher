
async function getRequest (url) {
    try {
        const response = await fetch(url);
        const responseJson = await response.json();

        removeNotFoundMessage();

        const wasFound = userWasFound(responseJson);
        
        return wasFound ? responseJson : undefined;
    } catch (err) {
        showNotFoundMessage();
    }
}

function userWasFound ({message}) {
    if (message) {
        if (message == "Not Found") {
            showNotFoundMessage("Usuário não encontrado.");
        } else {
            showNotFoundMessage("Limite de requisições diário atingido.");
        }
        return false;
    }

    return true;
}

function showNotFoundMessage (message) {
    const notFoundElement = document.querySelector(".not-found-message");
    
    if (!notFoundElement) {
        const inputWrapper = document.querySelector(".input-wrapper");
        const notFoundMessage = `<span class="not-found-message text-2">${message}</span>`;
        
        console.log(notFoundMessage)
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
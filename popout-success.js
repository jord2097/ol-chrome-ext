chrome.storage.local.get(["userID"], function (result){
    document.getElementById("loggedInUser").innerHTML = result.userID
    
}) // obtains current logged in username

document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();
    chrome.storage.local.remove(["userID"], function (){
        const error = chrome.runtime.lastError;
        if (error) {
            console.error(error)
        }
    })
    window.location.replace("./popout-login.html")
}) // logs out and returns to login form 
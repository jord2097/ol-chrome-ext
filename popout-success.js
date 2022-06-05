chrome.storage.local.get(["userID"], function (result) {
    document.getElementById("loggedInUser").innerHTML = result.userID;
}); // obtains current logged in username
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    chrome.storage.local.remove(["userID"], function () {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    });
    window.location.replace("./popout-login.html");
}); // logs out and returns to login form

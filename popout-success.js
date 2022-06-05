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
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "user_logged_out" }, function (response) { });
    });
    window.location.replace("./popout-login.html");
}); // logs out and returns to login form

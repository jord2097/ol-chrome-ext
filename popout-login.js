chrome.storage.local.get(["userID"], function (result) {
    if (result.userID) {
        window.location.replace("./popout-success.html");
    }
});
var input = document.querySelectorAll('input');
var _loop_1 = function (i) {
    input[i].addEventListener('input', function (e) {
        var value = input[i].value;
        if (!value) {
            input[i].dataset.state = '';
            return;
        }
        var trimmed = value.trim();
        if (trimmed) {
            input[i].dataset.state = "valid";
        }
        else {
            input[i].dataset.state = "invalid";
        }
    });
};
for (var i = 0; i < input.length; i++) {
    _loop_1(i);
} // validates characters in input fields, red outline if no non-space characters, green if valid
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    var username = document.querySelector('#username').value;
    var password = document.querySelector('#password').value;
    if (!username.trim()) {
        document.querySelector('#username').dataset.state = "invalid";
        document.getElementById("usernameHelp").innerHTML = "Please enter a username";
    }
    if (!password.trim()) {
        document.querySelector('#password').dataset.state = "invalid";
        document.getElementById("passwordHelp").innerHTML = "Please enter a password";
    }
    if (password.trim() !== "password") {
        document.querySelector('#password').dataset.state = "invalid";
        document.getElementById("passwordHelp").innerHTML = "Incorrect Password";
    }
    if (username.trim() && password === "password") { // login
        chrome.storage.local.set({ userID: username }, function () {
            var error = chrome.runtime.lastError;
            if (error) {
                console.error("error");
            }
        });
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "user_logged_in" }, function (response) { });
        });
        window.location.replace("./popout-success.html");
    }
});

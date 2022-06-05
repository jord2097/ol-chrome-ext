var renderPopup = function () {
    fetch(chrome.runtime.getURL('modal.html')) // uses chrome API to fetch template (async)
        .then(function (response) { return response.text(); })
        .then(function (html) {
        // appends to end of body but css can be overriden by host page
        // document.body.insertAdjacentHTML('beforeend', html)       
        // creates a shadow root and appends the popup component under it, similar to web components     
        var maindiv = document.createElement('div');
        maindiv.className = "shadow-div";
        var shadowParent = maindiv.attachShadow({ mode: 'open' });
        shadowParent.innerHTML = "<link rel=\"stylesheet\" type=\"text/css\" href=\"".concat(chrome.extension.getURL("output.css"), "\"></link>") + html;
        document.body.appendChild(maindiv);
        var shadowRoot = document.querySelector('.shadow-div').shadowRoot;
        var btn = shadowRoot.querySelectorAll('button');
        if (btn) {
            for (var i = 0; i < btn.length; i++) {
                btn[i].addEventListener("click", function () {
                    maindiv.remove();
                });
            } // creates an event listener for each button found in the shadowRoot i.e. the two modal buttons 
        }
    });
};
var idleTimer = function () {
    var idleTime = 0;
    var executeOnce = false;
    var idleInterval = setInterval(timerIncrement, 1000);
    function timerIncrement() {
        idleTime++;
        if (idleTime > 5 && !executeOnce) {
            renderPopup();
            executeOnce = true;
            clearInterval(idleInterval);
        }
    }
    // resets timer for every new page load, possibly too frequent?
    // document.addEventListener("onload", () => {idleTime = 0})
    document.addEventListener("mousemove", function () { idleTime = 0; });
    document.addEventListener("keypress", function () { idleTime = 0; });
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.action === "user_logged_out") {
            clearInterval(idleInterval);
        }
    });
};
chrome.storage.local.get(["userID"], function (result) {
    if (result.userID) {
        idleTimer();
    }
    else {
        chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
            if (message.action === "user_logged_in") {
                idleTimer();
            }
        });
    }
});

chrome.storage.local.get(["userID"], function (result){
    if (result.userID) {
        window.location.replace("./popout-success.html")
    }    
})

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;    

    // Implement validation
    // When user submits check if input is either blank or contains only spaces using .trim() 
    // guide in bookmarks from freecodecamp

    if (username && password === "password") { // login
        chrome.storage.local.set({userID: username}, function() {
            const error = chrome.runtime.lastError
            if (error) {
                console.error("error")
            }            
            console.log("Logged in as " + username)
        })
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs){
            chrome.tabs.sendMessage(tabs[0].id, {action: "user_logged_in"}, function (response) {})
        })       
        window.location.replace("./popout-success.html")       
    }
})
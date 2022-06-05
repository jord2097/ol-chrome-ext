chrome.storage.local.get(["userID"], function (result){
    if (result.userID) {
        window.location.replace("./popout-success.html")
    }    
})

const input = document.querySelectorAll('input') 
for (let i = 0; i < input.length; i++) {
    input[i].addEventListener('input', e => {
        const value = input[i].value
        if (!value) {
            input[i].dataset.state = ''
            return
        }
        const trimmed = value.trim()
    
        if (trimmed) {
            input[i].dataset.state = "valid"           
        } else {
            input[i].dataset.state = "invalid"  
        }
        
    } )
} // validates characters in input fields, red outline if no non-space characters, green if valid

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();    
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;    
    if (!username) {
        document.querySelector('#username').dataset.state = "invalid"
        document.getElementById("usernameHelp").innerHTML = "Please enter a username"
    }
    if (!password) {
        document.querySelector('#password').dataset.state = "invalid"
        document.getElementById("passwordHelp").innerHTML = "Please enter a password"
    }
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
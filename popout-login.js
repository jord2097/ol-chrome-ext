document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;    

    // Implement validation
    // When user submits check if input is either blank or contains only spaces using .trim() 
    // guide in bookmarks from freecodecamp

    if (username && password === "password") {
        chrome.storage.local.set({userID: username}, function(result) {
            console.log("Logged in as " + username)
        })        
         window.location.replace("./popout-success.html")
                  
        
    }
})
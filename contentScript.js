const renderPopup = () => {       
    fetch(chrome.runtime.getURL('modal.html')) // uses chrome API to fetch template (async)
    .then(response => response.text())
    .then(html => {
        // appends to end of body but css can be overriden by host page
        // document.body.insertAdjacentHTML('beforeend', html)       
        
        // creates a shadow root and appends the popup component under it, similar to web components     
        const maindiv = document.createElement('div')
        maindiv.className = "shadow-div"
        let shadowParent = maindiv.attachShadow({mode: 'open'})
        shadowParent.innerHTML = `<link rel="stylesheet" type="text/css" href="${chrome.extension.getURL("output.css")}"></link>` + html        
        document.body.appendChild(maindiv)            
        
        maindiv.addEventListener("click", () => {
            console.log("hide after press yes/no")
            maindiv.style.display = "none"                      
        }) // as click event propagates up event listener can be placed on shadow root                                
    })   
}

const idleTimer = () => { 
    let idleTime = 0
    let executeOnce = false    
    const idleInterval = setInterval(timerIncrement, 1000)
    function timerIncrement() {
        idleTime++
        if (idleTime > 5 && !executeOnce) {
            renderPopup()
            executeOnce=true
            clearInterval(idleInterval)
        }
    }
    // resets timer for every new page load, possibly too frequent?
    // document.addEventListener("onload", () => {idleTime = 0})
    document.addEventListener("mousemove", () => {idleTime = 0})
    document.addEventListener("keypress", () => {idleTime = 0})
       

}
chrome.storage.local.get(["userID"], function (result){
    if (result.userID) {        
        idleTimer()      
    } else {
        chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {            
            if (message.action === "user_logged_in") {
                idleTimer()
            }
        })  
    }
})

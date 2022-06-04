const renderPopup = () => {
    console.log("timer working")     
    fetch(chrome.runtime.getURL('modal.html'))
    .then(response => response.text())
    .then(html => {
        document.body.insertAdjacentHTML('beforeend', html)
        /* const iframe = document.createElement('iframe')
        iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(html)
        document.body.appendChild(iframe) */
        const btn = document.getElementById("close-btn")
        const btn2 = document.getElementById("close-btn2")
        btn.addEventListener("click", () => {
            console.log("hide after press yes")
            const modal = document.getElementById("help-modal")
            modal.style.display = "none"                      
        })
        btn2.addEventListener("click", () => {
            console.log("hide after press no")
            const modal = document.getElementById("help-modal")
            modal.style.display = "none"                      
        })                                   
    })
    
    
}

const idleTimer = () => {
    let idleTime = 0
    let executeOnce = false    
    const idleInterval = setInterval(timerIncrement, 1000)
    function timerIncrement() {
        console.log(idleTime++)
        if (idleTime > 5 && !executeOnce) {
            renderPopup()
            executeOnce=true
            clearInterval(idleInterval)
        }
    }
    // resets timer for every new page load
    // document.addEventListener("onload", () => {idleTime = 0})
    document.addEventListener("mousemove", () => {idleTime = 0})
    document.addEventListener("keypress", () => {idleTime = 0})
       

}
chrome.storage.local.get(["userID"], function (result){
    if (result.userID) {
        console.log("user loggedin")
        idleTimer()      
    } else {
        chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {            
            if (message.action === "user_logged_in") {
                idleTimer()
            }
        })  
    }
})

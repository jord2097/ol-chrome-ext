chrome.storage.local.get(["userID"], function (result){
    if (result.userID) {
        console.log("user loggedin")
        const renderPopup = () => {
            console.log("timer working")
            fetch(chrome.runtime.getURL('modal.html'))
            .then(response => response.text())
            .then(html => {
                document.body.insertAdjacentHTML('beforeend', html)
                const btn = document.getElementById("close-btn")
                const btn2 = document.getElementById("close-btn2")
                btn.addEventListener("click", () => {
                    console.log("hide event")
                    const modal = document.getElementById("help-modal")
                    modal.style.display = "none"
                })
                btn2.addEventListener("click", () => {
                    console.log("hide no event")
                    const modal = document.getElementById("help-modal")
                    modal.style.display = "none"
                })
                                           
            })            
            
        }          
        const idleTimer = () => {
            let temp;
            resetTimer = () => {
                clearTimeout(temp)
                temp = setTimeout(renderPopup, 5000)
            }
            window.onload = resetTimer;
            document.onmousemove = resetTimer    
            
        }        
        idleTimer()
    }    
})

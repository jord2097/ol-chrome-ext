chrome.storage.local.get(["userID"], function (result){
    document.getElementById("welcomeMsg").innerHTML = "Successfully logged in as  " + result.userID

})
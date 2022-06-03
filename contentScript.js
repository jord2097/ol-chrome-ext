const init = function(){    
    const injectElement = document.createElement('div');
    injectElement.className = 'test-Element'
    injectElement.innerHTML = 'INJECTED VIA CONTENT SCRIPT'
    document.body.appendChild(injectElement)
}

init()
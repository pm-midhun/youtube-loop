let el = document.getElementById('repeat-enable');
document.addEventListener('DOMContentLoaded', function () {
    getAutoplayStatus().then((res)=> {
        let statVal= res[0];
        let {result} = statVal;
        let status  = (result === 'true')
        el.checked = status;
    })   
}, false);

el.addEventListener("change", function() {
   setAutoPlayStatus(this.checked).then(res => {
     console.log("done");
   })
});


function writeAutoplayStatus(status) {
   sessionStorage.setItem("autoplay", status)
   return true
}

function readAutoplayStatus(){
    return sessionStorage.getItem("autoplay");
}

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}
async function setAutoPlayStatus (status){

   let tab =  await getCurrentTab();
   return await chrome.scripting.executeScript({
        target : {
            tabId: tab.id,
        },
        function: writeAutoplayStatus,
        args: [status]
    })
}

async function getAutoplayStatus () {
    let tab = await getCurrentTab();

    return await chrome.scripting.executeScript({
        target : {
            tabId: tab.id,
        },
        function: readAutoplayStatus,
        args: [] 
    })
}


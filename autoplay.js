const isEnded = video => video.ended

const alredayBinded = false;

const reloadIfEnded = () => {
    let videoElem = document.getElementsByTagName('video')[0];
    console.log(isEnded(videoElem));
    if(isEnded(videoElem)){
        videoElem.play();
    }
}

const bindEvent =  () => {
    if(alredayBinded != true){
        let videoElem = document.getElementsByTagName('video')[0];
        videoElem.addEventListener("ended", function(){
            videoElem.play(); 
        });
        alredayBinded = true;
    }
}

const isAutoplayEnabled = () => {
    let autoplayStatus = sessionStorage.getItem("autoplay");
    return autoplayStatus === 'true'; 
}
setInterval(function(){
    if( isAutoplayEnabled()){
      //  reloadIfEnded();
        bindEvent()
    }
}, 500);
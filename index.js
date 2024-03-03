let startTime,endTime;
let imageSize="";
let image = new Image();
let bitSpeed = document.getElementById("bits"),
    kbSpeed =  document.getElementById("kbs"),
    mbSpeed =  document.getElementById("mbs"),
    info =  document.getElementById("info");
let totalBitSpeed = 0;
let totalKbSpeed = 0;
let totalMBSpeed = 0;
let numTests = 5;
let testCompleted = 0;
let imageApi = "https://source.unsplash.com/random?topic=nature";
image.onload =async function(){
    endTime = new Date().getTime();
    await fetch(imageApi).then((response)=>{
        imageSize=response.headers.get("content-length");
        calculateSpeed();
    });
};

function calculateSpeed(){
    let timeDuation = (endTime - startTime)/1000;
    let loadedBits = imageSize*8;
    let speedInBits = loadedBits / timeDuation;
    let speedInKbs = speedInBits / 1024;
    let speedInMbs = speedInKbs  / 1024;
    totalBitSpeed+=speedInBits;
    totalKbSpeed+=speedInKbs;
    totalMBSpeed+=speedInMbs;
    testCompleted++;
    if(testCompleted===numTests){
        let averageSpeedInBps = (totalBitSpeed / numTests).toFixed(2);
        let averageSpeedInKBps = (totalKbSpeed / numTests).toFixed(2);
        let averageSpeedInMBps = (totalMBSpeed / numTests).toFixed(2);
        bitSpeed.innerHTML+=`${averageSpeedInBps}`;
        kbSpeed.innerHTML+=`${averageSpeedInKBps}`;
        mbSpeed.innerHTML+=`${averageSpeedInMBps}`;
        info.innerHTML="Test Completed!";
    }
    else{
        startTime=new Date().getTime();
        image.src = imageApi;
    }

}
const init = async () =>{
    info.innerHTML="Testing...";
    startTime = new Date().getTime();
    image.src = imageApi;
};

window.onload = () =>{
    for(let i = 0;i < numTests; i++){
        init();
    }
};
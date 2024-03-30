const getaudioscreen = document.getElementById('audioscreen');
const playbtn = document.getElementById('play'),
prevbtn = document.getElementById('prev'),
nextbtn = document.getElementById('next'),
stopbtn = document.getElementById('stop');
const getprogress = document.getElementById('progress'),
getprogressbar = document.getElementById('progress-bar');
const getvolprogress = document.getElementById('volumeprogress');
const getdisplaytime = document.getElementById('displaytime');

const audios = ['sample1','sample2','sample3'];



let curridx = 0;
function loadaudio(audio){
    getaudioscreen.src = `./source/${audio}.mp3`;
}



function playaudio(){
    playbtn.querySelector('i.fas').classList.remove('fa-play');
    playbtn.querySelector('i.fas').classList.add('fa-pause');

    getaudioscreen.play();

}

function pauseaudio(){
    playbtn.querySelector('i.fas').classList.add('fa-play');
    playbtn.querySelector('i.fas').classList.remove('fa-pause');

    getaudioscreen.pause();

}

function playandpauseaudio(){
    if(getaudioscreen.paused){
        // playaudio();
        loadaudio(audios[curridx]);
        getaudioscreen.play();
        
    }else{
        // pauseaudio();
        getaudioscreen.pause();
    }
}

function nextaudio(){
    curridx++;

    if(curridx > audios.length-1){
        curridx = 0;
    }

    loadaudio(audios[curridx]); // change file name 
    playaudio(); // play the changed file 

}

function prevoiusaudio(){
    curridx--;
    
    if(curridx < 0){
        curridx = audios.length-1;
    }
    loadaudio(audios[curridx]);
    playaudio();
}

function updateprogress(e){
    const {duration,currentTime} = e.target;

    if(currentTime === 0){
        getprogressbar.style.width = "0%";
    }else{
        const progresspercent = (currentTime/duration)*100;
        getprogressbar.style.width = `${progresspercent}%`;
    }

    const mins = Math.floor((duration-currentTime)/60);
    const secs = Math.floor((duration-currentTime)%60);
    const minutevalue = mins.toString().padStart(2,'0');
    const secondvalue = secs.toString().padStart(2,'0');
    getdisplaytime.innerText = `${minutevalue}:${secondvalue}`;

}

function stopaudio(){
    getaudioscreen.currentTime = 0;
    getprogressbar.style.width = '0%';

    pauseaudio();
}

function volumecontrol(){
    getaudioscreen.volume = getvolprogress.value/100;
}

function progressaudioclick(e){
    const width = this.clientWidth;
    const clickx = e.offsetX;
    const getduration = getaudioscreen.duration;
    getaudioscreen.currentTime = (clickx/width) * getduration;
}




getaudioscreen.addEventListener('timeupdate',updateprogress);
getaudioscreen.addEventListener('play',playaudio);
getaudioscreen.addEventListener('pause',pauseaudio);

playbtn.addEventListener('click',playandpauseaudio);
nextbtn.addEventListener('click',nextaudio);
prevbtn.addEventListener('click',prevoiusaudio);
stopbtn.addEventListener('click',stopaudio);
getvolprogress.addEventListener('change',volumecontrol);
getprogress.addEventListener('click',progressaudioclick);

const $ = document;
const repeat = $.querySelector("#repeat");
const backward = $.querySelector("#backward");
const play = $.querySelector("#play");
const forward = $.querySelector("#forward");
const shuffle = $.querySelector("#shuffle");
const image = $.querySelector(".music-img");
const musicPlayer = $.querySelector("#music-player");
const lineIn = $.querySelector(".line-in");
const title = $.querySelector(".music__title");
const lineOut = $.querySelector(".line-out");
const heart = $.querySelector(".wrapper-icon-heart");
const player=$.querySelector('.player')
let counter = 1;
let clicked = false;
let percent;
let shuffleBTN = false;
let repeatBTN=false;
let noRepeatShuffle = true;
const addNewMedia = () => {
    musicPlayer.setAttribute("src", `./media/${counter}.mp3`);
    image.setAttribute("src", `./image/${counter}.jpg`);
};
const deletePause = () => {
    play.firstElementChild.classList.remove("fa-pause");
    play.firstElementChild.classList.add("fa-play");
};
const addPause = () => {
    play.firstElementChild.classList.remove("fa-play");
    play.firstElementChild.classList.add("fa-pause");
};
const newTitle = () => {
    title.textContent = `MUSIC 0${counter}`;
};
const removeClass = (active) => {
    document.querySelector(`.${active}`)?.classList.remove(active);
};
const playMusic = () => {
    setTimeout(function () {
        musicPlayer.play();
    }, 15);
};
let playSong = false;

// forward
forward.addEventListener("click", (e) => {
 
    if (counter > 5) {
        counter = 1;
    }
    repeatBTN=false
    shuffleBTN=false
    clicked = false;
    addNewMedia();
    if (playSong) {
        playMusic();
    }
    newTitle();
  
    counter++;
   
});

// backward
backward.addEventListener("click", (e) => {

    if (counter < 1) {
        counter = 5;
    }
    clicked = false;
    repeatBTN=false
    shuffleBTN=false
    addNewMedia();
    newTitle();
    if (playSong) {
        playMusic();
    }
   
    counter--;
    

});

// play

play.addEventListener("click", (e) => {
    if (!playSong) {
        if (clicked) {
            musicPlayer.currentTime = (musicPlayer.duration * percent) / 100;
        }
        addPause();
        playMusic();
    } else {
        deletePause();
        musicPlayer.pause();
    }

    let clear = setInterval(() => {
        if (!playSong) {
            clearInterval(clear);
        }

        let percentSong = (
            (musicPlayer.currentTime / musicPlayer.duration) *
            100
        ).toFixed(0);
        lineIn.style.width = `${percentSong}%`;
    }, 1000);

    playSong = !playSong;
});

// shuffle


shuffle.addEventListener("click", () => {
    shuffleBTN = true;
    repeatBTN=false
    clicked = false;
   if(shuffleBTN && !repeatBTN){
    removeClass("icon--active");
    shuffle.firstElementChild.classList.add("icon--active");
   }

    let clear = setInterval(() => {
        if (!shuffleBTN ) {
            removeClass('icon--active')
            clearInterval(clear);
        }
        if (
            +musicPlayer.duration.toFixed(0) ==
            +musicPlayer.currentTime.toFixed(0)
        ) {
            counter = Math.floor(Math.random() * 5) + 1;
            addNewMedia();
            newTitle();
            if (playSong) {
                playMusic();
            }
        }
    }, 1000);
});
// repeat

repeat.addEventListener("click", () => {
    clicked = false;
    shuffleBTN = false;
    repeatBTN=true
    
   if(repeatBTN && !shuffleBTN){
    removeClass("icon--active");
    repeat.firstElementChild.classList.add("icon--active");
   }
    let clear = setInterval(() => {
        if (!repeatBTN) {
            removeClass('icon--active')
            clearInterval(clear);
        }
        if (
            +musicPlayer.duration.toFixed(0) ==
            +musicPlayer.currentTime.toFixed(0)
        ) {
            musicPlayer.currentTime = 0;
            if (playSong) {
                playMusic();
            }
        }
    }, 1000);
});

lineOut.addEventListener("click", (event) => {
    clicked = true;
    percent = ((event.offsetX / 310) * 100).toFixed(0);
    lineIn.style.width = `${percent}%`;
    musicPlayer.currentTime = (musicPlayer.duration * percent) / 100;
});
setInterval(() => {
    if (musicPlayer.duration == musicPlayer.currentTime ) {
        if (counter < 5) {
           
            addNewMedia();
            newTitle();
            if (playSong) {
                playMusic();
            }
            counter++;
        } else counter = 1;

        clicked = false;
    }
}, 1000);

let favorite = false;
heart.addEventListener("click", (e) => {
    if (!favorite) {
        heart.firstElementChild.classList.remove("far");
        heart.firstElementChild.classList.add("fas");
       heart.firstElementChild.style.color='red'
        

    } else {
        heart.firstElementChild.classList.remove("fas");
        heart.firstElementChild.classList.add("far");
  heart.firstElementChild.style.color='white'

    }
    favorite = !favorite;
});
image.addEventListener('dblclick',e=>{
    if (!favorite) {
        heart.firstElementChild.classList.remove("far");
        heart.firstElementChild.classList.add("fas");
       heart.firstElementChild.style.color='red'
        

    }
    favorite = !favorite;
})



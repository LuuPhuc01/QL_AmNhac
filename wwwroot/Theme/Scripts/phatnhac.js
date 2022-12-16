//Phat nhac
const song = document.getElementById("song");
const playBtn = document.querySelector(".player-inner");
const rangeBar = document.querySelector(".range");
const remainingTime = document.querySelector(".remaining");
const durationTime = document.querySelector(".duration");
const musicThumbnail = document.querySelector(".music-thumb");
const nextBtn = document.querySelector(".play-forward");
const prevBtn = document.querySelector(".play-back");
const playRepeat = document.querySelector(".play-repeat");
const playRandom = document.querySelector(".play-random");
const musicImage = document.querySelector(".playbar-info img")
const musicName = document.querySelector(".playbar-song-name");

let isPlaying = true;
var indexSong = 0;
let isRepeat = false;
let isRandom = false;

const musics = [
    {
        id: 1,
        title: "Unstoppable",
        file: "Sia-Unstoppable.mp3",
        image:
            "https://usercontent.one/wp/www.deejaymakina.fr/wp-content/uploads/2019/12/Sia-Unstoppable-e1575223352464.jpg?media=1627259016",
    },
    {
        id: 2,
        title: "Cheap Thrills",
        file: "Sia-Cheap-Thrills.mp3",
        image:
            "https://f4.bcbits.com/img/a3060371296_10.jpg",
    },
    {
        id: 3,
        title: "Chandelier",
        file: "Sia-Chandelier.mp3",
        image:
            "https://i.pinimg.com/736x/c2/f7/88/c2f788197471e6596e94ac1f1df1cf37.jpg",
    },
    {
        id: 4,
        title: "The Greatest",
        file: "Sia-The-Greatest.mp3",
        image:
            "https://i.pinimg.com/originals/cc/a0/4d/cca04d86d3775292c232ed59af1923f2.jpg",
    },
    {
        id: 5,
        title: "Move Your Body",
        file: "Sia-Move-Your-Body-Audio.mp3",
        image:
            "https://img.discogs.com/Yy6wrVgZTXugg_Ex6Cs3FaIGNqs=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-14769277-1581245650-9760.jpeg.jpg",
    },
];


let timer;

playRandom.addEventListener("click", function () {
    if (isRandom) {
        isRandom = false;
        playRandom.removeAttribute("style");
    } else {
        isRandom = true;
        playRandom.style.color = "#ffb86c";

        musics.splice(indexSong, 1);
        console.log(musics);
    }
});
playRepeat.addEventListener("click", function () {
    if (isRepeat) {
        isRepeat = false;
        playRepeat.removeAttribute("style");
    } else {
        isRepeat = true;
        playRepeat.style.color = "#ffb86c";
    }
});

song.addEventListener("ended", handleEndedSong);
function handleEndedSong() {
    if (isRepeat) {
        // handle repeat song
        isPlaying = true;
        playPause();
    }
    else if (isRandom) {
        isPlaying = true;
        var randomIndex = Math.floor(Math.random() * (musics.length - 1));


        //console.log(randomIndex);
        init(randomIndex);
        musics.splice(randomIndex, 1);
        //console.log(musics);

        playPause();
    }
    else {
        changeSong(1);
    }
}
prevBtn.addEventListener("click", function () {
    changeSong(-1);
});
nextBtn.addEventListener("click", function () {
    changeSong(1);
});
function changeSong(dir) {
    if (dir === 1) {
        // next song
        indexSong++;
        if (indexSong >= musics.length) {
            indexSong = 0;
        }
        isPlaying = true;
    } else if (dir === -1) {
        // prev song
        indexSong--;
        if (indexSong < 0) {
            indexSong = musics.length - 1;
        }
        isPlaying = true;
    }
    init(indexSong);
    //song.setAttribute("src", `./music/${musics[indexSong].file}`);
    playPause();
}

playBtn.addEventListener("click", playPause);
function playPause() {
    if (isPlaying) {
        /*        musicThumbnail.classList.add("is-playing");*/
        song.play();
        playBtn.innerHTML = `<ion-icon name="pause-circle"></ion-icon>`;
        isPlaying = false;
        timer = setInterval(displayTimer, 500);
    } else {
        /*        musicThumbnail.classList.remove("is-playing");*/
        song.pause();
        playBtn.innerHTML = `<ion-icon name="play"></ion-icon>`;
        isPlaying = true;
        clearInterval(timer);
    }
}

function displayTimer() {
    const { duration, currentTime } = song;
    rangeBar.max = duration;
    rangeBar.value = currentTime;
    remainingTime.textContent = formatTimer(currentTime);
    if (!duration) {
        durationTime.textContent = "00:00";
    } else {
        durationTime.textContent = formatTimer(duration);
    }
}

function formatTimer(number) {
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60);
    return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds
        }`;
}

rangeBar.addEventListener("change", handleChangeBar);
function handleChangeBar() {
    song.currentTime = rangeBar.value;
}

function init(indexSong) {
    song.setAttribute("src", `../../Theme/media/${musics[indexSong].file}`);
    musicImage.setAttribute("src", musics[indexSong].image);
    musicName.textContent = musics[indexSong].title;
}

displayTimer();
init(indexSong);


//////////////////////////////////////////////


$(document).ready(function () {
    $("#icon-lyric").click(function () {
        $("#lyric-more").removeClass("lyric-background-hidden");
        $("#lyric-more").addClass("lyric-background");
        $("#lyric").removeClass("lyric-detail-hidden");
        $("#lyric").addClass("lyric-detail");
    });

});
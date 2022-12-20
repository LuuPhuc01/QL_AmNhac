document.addEventListener('DOMContentLoaded', () => {
    const song = document.getElementById("song");
    const playBtn = document.querySelector(".player-inner");
    const nextBtn = document.querySelector(".play-forward");
    const prevBtn = document.querySelector(".play-back");
    const durationTime = document.querySelector(".duration");
    const remainingTime = document.querySelector(".remaining");
    const rangeBar = document.querySelector(".range");
    const musicName = document.querySelector(".music-name");
    const musicThumbnail = document.querySelector(".music-thumb");
    const musicImage = document.querySelector(".music-thumb img");
    const playRepeat = document.querySelector(".play-repeat");
    const playRandom = document.querySelector(".play-random");

    const volumeButton = document.querySelector(".volume-btn");
    const volumeMax = volumeButton.querySelector(".max-volume");
    const volumeMin = volumeButton.querySelector(".min-volume");
    const volumeCur = document.querySelector(".range-volume");

    const playAudios = document.querySelectorAll(".play_audio");
    const updateAudio = document.querySelector(".update_playlist_audio");
    const nameAudios = document.querySelectorAll(".name_audio");
    const imgAudios = document.querySelectorAll(".img_audio");
    const playSong = document.querySelectorAll(".play_song");


    const expandPlaylist = document.querySelector(".playlist-expand");
    const closePlaylist = document.querySelector(".playlist-close");
    const modalPlaylist = document.querySelector(".modal-playlist");
    const modalMain = document.querySelector(".modal-playlist-main");
    
    closePlaylist.style.display = 'none';
    volumeMin.style.display = 'none';
    let isPlaying = true;
    let indexSong = 0;
    let isRepeat = false;
    let isRandom = false;
    //const musics = ["holo.mp3", "summer.mp3", "spark.mp3", "home.mp3"];


    const musics = new Array(
        {
            id: 0,
            title: "Định Mệnh",
            file: "../../theme/media/dinhmenh.mp3",
            image:
                "https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        },

        {
            id: 1,
            title: "Anh Nhớ Ra",
            file: "../../theme/media/anhnhora.mp3",
            image:
                "https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        },
        {
            id: 2,
            title: "Xuân Thì",
            file: "../../theme/media/xuanthi.mp3",
            image:
                "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1931&q=80",
        },
    )

let timer;
let repeatCount = 0;
let randomCount = 0;
var isEqual;
var isCheckExist;


    for (var i = 0; i < musics.length; i++) {

    }

    //Open ModalPlaylist
    expandPlaylist.addEventListener('click',showPlaylist)

    function showPlaylist() {
        modalPlaylist.classList.add('open')
        expandPlaylist.style.display = 'none';
        closePlaylist.style.display = '';
    }
    closePlaylist.addEventListener('click',hidePlaylist)
    function hidePlaylist() {
        modalPlaylist.classList.remove('open')
        closePlaylist.style.display = 'none';
        expandPlaylist.style.display = '';
    }
    modalPlaylist.addEventListener('click', hidePlaylist)

    modalMain.addEventListener('click', function (event) {
        event.stopPropagation()
    })
    // Update new playlist
    updateAudio.addEventListener("click", update_playlist_audio)
    function update_playlist_audio() {
        for (var i = 0; i < playAudios.length; i++) {
            if (musics.length >= playAudios.length) {
                musics.length = playAudios.length;
                musics[i].file = playAudios[i].getAttribute("link");
                musics[i].title = nameAudios[i].textContent;
                musics[i].image = imgAudios[i].getAttribute("src");
            }
            else if (musics.length < playAudios.length) {
                const addLink = playAudios[i].getAttribute("link");
                const addTitle = nameAudios[i].textContent;
                const addImg = imgAudios[i].getAttribute("src");
                const id = musics.length +1;
                const obj = {};
                obj['id'] = id;
                obj['title'] = addTitle;
                obj['file'] = addLink;
                obj['image'] = addImg;
                musics.push(obj);
            }
        
       
        }

        randomSong();
        init(indexSong);
        isPlaying = true;
        playPause();
        compareArr();
    }

    compareArr();
    const indexLength = musics.length -1
    for (var i = 0; i < playAudios.length; i++) {

        playAudios[i].onclick = function (e) {
            compareArr();
            if (isEqual === true) {
                var Check = e.target.closest('.play_audio').getAttribute("id") - 1
                indexSong = Check
                init(indexSong);

            }
            else if (isEqual === false) {
                var CheckLink = e.target.closest('.play_audio').getAttribute("link")
                CheckExist(CheckLink);
                if (isCheckExist === false) {
                    var Link = e.target.closest('.play_audio').getAttribute("link")
                    var Img = e.target.closest('.play_audio').getAttribute("img")
                    var Title = e.target.closest('.play_audio').getAttribute("name")
                    var ID = musics.length;
                    const obj = {};
                    obj['id'] = ID;
                    obj['title'] = Title;
                    obj['file'] = Link;
                    obj['image'] = Img;
                    musics.push(obj);
                    indexSong = ID;
                    init(indexSong);
                    
                }
                else {
                   /* var CheckId = e.target.closest('.play_audio').getAttribute("link")*/
                    var Link = e.target.closest('.play_audio').getAttribute("link")
                    var Img = e.target.closest('.play_audio').getAttribute("img")
                    var Title = e.target.closest('.play_audio').getAttribute("name")
                    song.setAttribute("src", `${Link}`);
                    musicImage.setAttribute("src", `${Img}`);
                    musicName.textContent = Title;


                }
            }
            isPlaying = true;
            playPause();
 
 
        }
    }

/*    for (const Song of playAudios) {
        Song.addEventListener('click', function (e) {
            console.log(e.target.closest('.play_audio').getAttribute("name"))
        })
    }
*/  /*document.getElementById("update-playlist").innerHTML = '';*/

    function compareArr() {
        if (musics.length !== playAudios.length) {
            isEqual = false;
        }
        else {
            for (let i = 0; i < musics.length; i++) {
                if (musics[i].file !== playAudios[i].getAttribute("link")) {
                    isEqual = false;
                    break;
                }
                isEqual = true;
            }
        }
        console.log( "Hai mang giong nhau " + isEqual);
    }
    function CheckExist(CheckLink) {
        for (let i = 0; i < musics.length; i++) {
            if (CheckLink == musics[i].file) {
                  isCheckExist = true;
                  break;
            }
            isCheckExist = false;
        }
        console.log(" Có tôn tại không? "+ isCheckExist);
    }


    function play_Audio(i) {
        console.log("OK");
        song.setAttribute("src", `${musics[i].file}`);
        playPause();
    
    }
    playRepeat.addEventListener("click", function () {
        if (isRepeat) {
            isRepeat = false;
            playRepeat.removeAttribute("style");
        } else {
            isRepeat = true;
            playRepeat.style.color = "#ffb86c";
        }
    });
    playRandom.addEventListener("click", function () {
        if (isRandom) {
            isRandom = false;
            playRandom.removeAttribute("style");
        } else {
            isRandom = true;
            playRandom.style.color = "#ffb86c";
        }
    });
    let prevolume;
    volumeButton.addEventListener("click", function () {

        song.muted = !song.muted;
        if (song.muted) {
            volumeMax.style.display = 'none';
            volumeMin.style.display = '';
            volumeCur.value = 0;
        } else {
            volumeMax.style.display = '';
            volumeMin.style.display = 'none';
            volumeCur.value = prevolume;
        }
    });
    volumeCur.addEventListener("change", handleChangeVol);
    function handleChangeVol() {
        song.volume = volumeCur.value / 100;
        prevolume = volumeCur.value;

        if (volumeCur.value == 0) {
            volumeMax.style.display = 'none';
            volumeMin.style.display = '';
            song.muted;
        }
        else {
            volumeMax.style.display = '';
            volumeMin.style.display = 'none';
            volumeCur.value = prevolume;
        }
    }

    nextBtn.addEventListener("click", function () {
        if (isRandom) {
            randomSong();
            init(indexSong);
        }
        changeSong(1);
    });
    prevBtn.addEventListener("click", function () {
        if (isRandom) {
            randomSong();
            init(indexSong);
        }
        changeSong(-1);
    });
    song.addEventListener("ended", handleEndedSong);
    function handleEndedSong() {
        if (isRepeat) {
            // handle repeat song
            isPlaying = true;
            playPause();
        }
        else if (isRandom === true) {
            // handle random song

            randomSong();
            init(indexSong);
            isPlaying = true;
            playPause();
        } else {
            changeSong(1);
        }
    }
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
        //song.setAttribute("src", `../them/music/${musics[indexSong].file}`);

        playPause();
    }
    playBtn.addEventListener("click", playPause);
    function playPause() {
        if (isPlaying) {
            musicThumbnail.classList.add("is-playing");
            song.play();
            playBtn.innerHTML = `<ion-icon name="pause-circle"></ion-icon>`;
            isPlaying = false;
            timer = setInterval(displayTimer, 500);
        } else {
            musicThumbnail.classList.remove("is-playing");
            song.pause();
            playBtn.innerHTML = `<ion-icon name="play"></ion-icon>`;
            isPlaying = true;
            clearInterval(timer);
        }
        console.log(musics);
    }

    /*testPlay[indexSong].addEventListener("click", play_Test);*/

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
        song.setAttribute("src", `${musics[indexSong].file}`);
        musicImage.setAttribute("src", musics[indexSong].image);
        musicName.textContent = musics[indexSong].title;
    }
    function randomSong() {
        let newIndexSong;
        do {
            newIndexSong = Math.floor(Math.random() * musics.length);
        } while (indexSong === newIndexSong)
        indexSong = newIndexSong;

    }
    displayTimer();
    init(indexSong);

})
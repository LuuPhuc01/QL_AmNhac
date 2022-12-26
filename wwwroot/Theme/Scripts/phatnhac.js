/*localStorage.clear();*/
document.addEventListener('DOMContentLoaded', () => {
    const song = document.getElementById("song");
    const playBtn = document.querySelector(".player-inner");
    const nextBtn = document.querySelector(".play-forward");
    const prevBtn = document.querySelector(".play-back");
    const durationTime = document.querySelector(".duration");
    const remainingTime = document.querySelector(".remaining");
    const rangeBar = document.querySelector(".range");
    const musicName = document.querySelector(".playbar-song-name");
    const musicThumbnail = document.querySelector(".playbar-info");
    const musicImage = document.querySelector(".playbar-info img");
    const playRepeat = document.querySelector(".play-repeat");
    const playRandom = document.querySelector(".play-random");

    const volumeButton = document.querySelector(".volume-btn");
    const volumeMax = volumeButton.querySelector(".max-volume");
    const volumeMin = volumeButton.querySelector(".min-volume");
    const volumeCur = document.querySelector(".range-volume");

    volumeMin.style.display = 'none';
    let isPlaying = true;
    let indexSong = 0;
    let isRepeat = false;
    let isRandom = false;
    //const musics = ["holo.mp3", "summer.mp3", "spark.mp3", "home.mp3"];


    const musics = [
        {
            id: 0,
            title: 'Anh Chưa Thương Em Đến Vậy Đâu',
            file: ' http://res.cloudinary.com/dccswqs2m/video/upload/v1671346705/osakynpjqygtjpp9q8ga.mp3',
            image: 'https://res.cloudinary.com/dsh8zkuek/image/upload/v1671456977/Myra_nyhvtl.jpg',
            name_art: 'Noo Phước Thịnh',
            idbh: 0
        }
    ]

    let timer;
    let repeatCount = 0;
    let randomCount = 0;
    var isEqual;
    var isCheckExist;
    Khoitao();

    //updateLocalStorage

    function updateLocalStorage() {
        //let dsphats = localStorage.getItem('dsphat') ? JSON.parse(localStorage.getItem('dsphat')) : [];
        let dsphats = [];
        for (var i = 0; i < musics.length; i++) {
            dsphats.push({
                id: musics[i].id,
                title: musics[i].title,
                image: musics[i].image,
                file: musics[i].file,
                name_art: musics[i].name_art,
                idbh: musics[i].idbh
            })


        }
        localStorage.setItem('dsphat', JSON.stringify(dsphats));
    }


    function updateMusics() {
        let dsphats = localStorage.getItem('dsphat') ? JSON.parse(localStorage.getItem('dsphat')) : [];
        var count = 0;
        dsphats.forEach((dsphat, index) => {
            count = index;
            index++;
            console.log(dsphat.title);
        })
        var i = 0;
        count = count + 1;
        console.log('count = ' + count);
        //    musics.length = count + 1;
        //    console.log('dai: ' + musics.length);
        dsphats.forEach((dsphat, index) => {
            if (i >= 0) {
                if (musics.length >= count) {
                    musics.length = count;
                    musics[i].file = dsphat.file;
                    musics[i].title = dsphat.title;
                    musics[i].image = dsphat.image;
                    musics[i].name_art = dsphat.name_art;
                    musics[i].idbh = dsphat.idbh;
                }
                else if (musics.length < count) {
                    musics[i].file = dsphat.file;
                    musics[i].title = dsphat.title;
                    musics[i].image = dsphat.image;
                    musics[i].name_art = dsphat.name_art;
                    musics[i].idbh = dsphat.idbh;
                    const addLink = dsphat.file;
                    const addTitle = dsphat.title;
                    const addImg = dsphat.image;
                    const nameArt = dsphat.name_art;
                    const idBh = dsphat.idbh;
                    //Phuc sua cho nay nha  const id = musics.length + 1;
                    const id = musics.length;
                    const obj = {};
                    obj['id'] = id;
                    obj['title'] = addTitle;
                    obj['file'] = addLink;
                    obj['image'] = addImg;
                    obj['name_art'] = nameArt;
                    obj['idbh'] = idBh;
                    musics.push(obj);
                }
            }
            i++;
        })
        updateLocalStorage();
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
        console.log(indexSong);

        let statusDangphat = localStorage.getItem('dangphat') ? JSON.parse(localStorage.getItem('dangphat')) : [];
        statusDangphat[0].isPlayingStorage = isPlaying;
        localStorage.setItem('dangphat', JSON.stringify(statusDangphat));
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

        //Luu currentTime vao localStorage
        let tempDangphat = localStorage.getItem('dangphat') ? JSON.parse(localStorage.getItem('dangphat')) : [];
        if (tempDangphat) {
            tempDangphat[0].tg = currentTime;
            localStorage.setItem('dangphat', JSON.stringify(tempDangphat));
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
    function randomSong() {
        let newIndexSong;
        do {
            newIndexSong = Math.floor(Math.random() * musics.length);
        } while (indexSong === newIndexSong)
        indexSong = newIndexSong;

    }
    function init(indexSong) {
        song.setAttribute("src", `${musics[indexSong].file}`);
        musicImage.setAttribute("src", musics[indexSong].image);
        musicName.textContent = musics[indexSong].title;

        //Luu bai hat dang phat vao localStorage
        let dangphat = [];
        dangphat.push({
            linkbh: song.getAttribute("src"),
            anhbh: musicImage.getAttribute("src"),
            tenbh: musicName.innerHTML,
            tg: null,
            index: indexSong,
        })
        localStorage.setItem('dangphat', JSON.stringify(dangphat));
    }


    var sessionCount;
    function Khoitao() {
        updateMusics();
        let sessionStatus = sessionStorage.getItem('status') ? true : false;
        if (sessionStatus) {
            sessionCount = 1;
            sessionStorage.setItem('status', sessionCount);
            updateMusics();
        }
        else {
            sessionCount = 0;
            sessionStorage.setItem('status', sessionCount);
            /*            updateLocalStorage();*/

        }

        if (sessionStorage.getItem('status') == 0) {
            let temp2 = localStorage.getItem('dangphat') ? true : false;
            console.log('temp2 co gia tri: ' + temp2);
            if (temp2) {
                console.log('okokok');
                let temp2 = JSON.parse(localStorage.getItem('dangphat'));
                temp2[0].isPlayingStorage = false;
                localStorage.setItem('dangphat', JSON.stringify(temp2));
            }
        }

        let dangphats = JSON.parse(localStorage.getItem('dangphat')) ? true : false;
        //console.log('ket qua: ' + dangphats);
        if (dangphats) {

            let dangphats = JSON.parse(localStorage.getItem('dangphat'));
            dangphats.forEach((dangphat, index) => {
                srcBaihat = dangphat.linkbh;
                anhBaihat = dangphat.anhbh;
                tenBaihat = dangphat.tenbh;
                tg = dangphat.tg;
                status = dangphat.isPlayingStorage;
                stt = dangphat.index;
            })
            indexSong = stt;
            song.setAttribute("src", srcBaihat);
            musicImage.setAttribute("src", anhBaihat);
            musicName.textContent = tenBaihat;
            song.currentTime = tg;
            if (status == 'true') {
                isPlaying = false;
                console.log('dung');
            }
            else {
                isPlaying = true;
                console.log('sai');
            }
            if (sessionStorage.getItem('status') == 0) isPlaying = false;
            playPause();
        }
        else {
            init(indexSong);
            displayTimer();
        }
    }
    console.log(musics);
})


$(document).ready(function () {
    $("#icon-lyric").click(function () {
        $("#lyric-more").removeClass("lyric-background-hidden");
        $("#lyric-more").addClass("lyric-background");
        $("#lyric").removeClass("lyric-detail-hidden");
        $("#lyric").addClass("lyric-detail");
    });

});


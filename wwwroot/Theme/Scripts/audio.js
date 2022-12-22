/*localStorage.clear();*/
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

    const addPlaylists = document.querySelectorAll(".add-playlist");

    const detailSong = document.querySelector(".play-expand");
    const expandPlaylist = document.querySelector(".playlist-expand");
    const closePlaylist = document.querySelector(".playlist-close");
    const modalPlaylist = document.querySelector(".modal-playlist");
    const modalMain = document.querySelector(".modal-playlist-main");

    closePlaylist.style.display = 'none';
    volumeMin.style.display = 'none';
    let isPlaying = true;
    var indexSong = 0;
    let isRepeat = false;
    let isRandom = false;
    //const musics = ["holo.mp3", "summer.mp3", "spark.mp3", "home.mp3"];


    const musics = [
        {
            id: 0, title: 'Anh Chưa Thương Em Đến Vậy Đâu',
            file: ' http://res.cloudinary.com/dccswqs2m/video/upload/v1671346705/osakynpjqygtjpp9q8ga.mp3',
            image: 'https://res.cloudinary.com/dsh8zkuek/image/upload/v1671456977/Myra_nyhvtl.jpg'
        }
    ]

    let timer;
    let repeatCount = 0;
    let randomCount = 0;
    var isEqual;
    var isCheckExist;
    userToken();
    Khoitao();
    //Detail Song
    detailSong.addEventListener('click', detailSongs)
    function detailSongs() {
        detailSong.setAttribute('href', '/user/Phatnhac/Index/')
    }

    //Open ModalPlaylist
    expandPlaylist.addEventListener('click', showPlaylist)

    function updateLocalStorage() {
        //let dsphats = localStorage.getItem('dsphat') ? JSON.parse(localStorage.getItem('dsphat')) : [];
        let dsphats = [];
        for (var i = 0; i < musics.length; i++) {
            dsphats.push({
                title: musics[i].title,
                image: musics[i].image,
                file: musics[i].file,
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
                }
                else if (musics.length < count) {
                    musics[i].file = dsphat.file;
                    musics[i].title = dsphat.title;
                    musics[i].image = dsphat.image;
                    const addLink = dsphat.file;
                    const addTitle = dsphat.title;
                    const addImg = dsphat.image;
                    const id = musics.length + 1;
                    const obj = {};
                    obj['id'] = id;
                    obj['title'] = addTitle;
                    obj['file'] = addLink;
                    obj['image'] = addImg;
                    musics.push(obj);
                }
            }
            i++;
        })
        updateLocalStorage();
    }
    //        console.log('dai: ' + musics.length);
    //        console.log('musics: ' + musics);
    //        //console.log(index);
    //        //musics[1].id = 2;
    //        //musics[1].file = 3;
    //        //musics[1].image = 4;
    //        //musics[1].title = 5;

    //        //let musics = [];
    //        //musics.push({
    //        //    id: index,
    //        //    title: dsphat.title,
    //        //    image: dsphat.image,
    //        //    file: dsphat.file,
    //        //})
    //        //index++;
    //        //if (i > 0) {
    //        //    musics[i].id = i;
    //        //    musics[i].image = dsphat.image;
    //        //    musics[i].title = dsphat.title;
    //        //}
    //        //i++;


    //    })
    //    for (int i = 0; i < musics.length; i++) {
    //        musics[i].id = i;
    //    }
    //    console.log('musics: '+musics);
    ////    console.log('index=' + count);
    ////    for (var i = 0; i < count; i++) {
    ////        musics[i].file = i;
    ////    }


    //for (var i = 0; i < count; i++) {

    //    if (musics.length >= count) {
    //        musics.length = count;
    //        musics[i].file = playAudios[i].getAttribute("link");
    //        musics[i].title = nameAudios[i].textContent;
    //        musics[i].image = imgAudios[i].getAttribute("src");
    //    }
    //    else if (musics.length < count) {
    //        musics[i].file = playAudios[i].getAttribute("link");
    //        musics[i].title = nameAudios[i].textContent;
    //        musics[i].image = imgAudios[i].getAttribute("src");
    //        const addLink = playAudios[i].getAttribute("link");
    //        const addTitle = nameAudios[i].textContent;
    //        const addImg = imgAudios[i].getAttribute("src");
    //        const id = musics.length + 1;
    //        const obj = {};
    //        obj['id'] = id;
    //        obj['title'] = addTitle;
    //        obj['file'] = addLink;
    //        obj['image'] = addImg;
    //        musics.push(obj);
    //    }


    //}



    function showPlaylist() {
        modalPlaylist.classList.add('open')
        expandPlaylist.style.display = 'none';
        closePlaylist.style.display = '';
    }
    closePlaylist.addEventListener('click', hidePlaylist)
    function hidePlaylist() {
        modalPlaylist.classList.remove('open')
        closePlaylist.style.display = 'none';
        expandPlaylist.style.display = '';
    }
    modalPlaylist.addEventListener('click', hidePlaylist)

    modalMain.addEventListener('click', function (event) {
        event.stopPropagation()
    })


    compareArr();
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
                musics[i].file = playAudios[i].getAttribute("link");
                musics[i].title = nameAudios[i].textContent;
                musics[i].image = imgAudios[i].getAttribute("src");
                const addLink = playAudios[i].getAttribute("link");
                const addTitle = nameAudios[i].textContent;
                const addImg = imgAudios[i].getAttribute("src");
                const id = musics.length + 1;
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
        updateLocalStorage();

    }

    const indexLength = musics.length - 1





    //update 1 Song


    for (const addPlaylist of addPlaylists) {
        addPlaylist.addEventListener('click', addOneSong(addPlaylists))
    }


    function addOneSong(a) {
        for (var i = 0; i < playAudios.length; i++) {

            a[i].onclick = function (e) {
/*            compareArr();
            if (isEqual === true) {
                var Check = e.target.closest('.play_audio').getAttribute("id") - 1
                indexSong = Check
                init(indexSong);

            }
            else*/ if (isEqual === false) {
                    const CheckLink = e.target.closest('.add-playlist').getAttribute("name")
                    CheckExist(CheckLink);
                    if (isCheckExist === false) {
                        const Link = e.target.closest('.add-playlist').getAttribute("link")
                        const Img = e.target.closest('.add-playlist').getAttribute("img")
                        const Title = e.target.closest('.add-playlist').getAttribute("name")
                        const ID = musics.length;
                        const obj = {};
                        obj['id'] = ID;
                        obj['title'] = Title;
                        obj['file'] = Link;
                        obj['image'] = Img;
                        musics.push(obj);
                        indexSong = ID;
                        console.log(musics)
                        console.log(indexSong)
                    }

                    else {
                        alert("Bài hát đã nằm trong danh sách phát")

                    }
                }
                /*
                            isPlaying = true;
                            playPause();*/


            }
        }
        updateLocalStorage();
    }
    //add 1 song

    for (var i = 0; i < playAudios.length; i++) {

        playAudios[i].onclick = function (e) {
            compareArr();
            if (isEqual === true) {
                var Check = e.target.closest('.play_audio').getAttribute("id") - 1
                indexSong = Check
                init(indexSong);

            }
            else if (isEqual === false) {
                var CheckLink = e.target.closest('.play_audio').getAttribute("name")
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
                    var CheckId = e.target.closest('.play_audio').getAttribute("link")
                    var Link = e.target.closest('.play_audio').getAttribute("link")
                    var Img = e.target.closest('.play_audio').getAttribute("img")
                    var Title = e.target.closest('.play_audio').getAttribute("name")
                    song.setAttribute("src", `${Link}`);
                    musicImage.setAttribute("src", `${Img}`);
                    musicName.textContent = Title;
                    indexSong = e.target.closest('.play_audio').getAttribute("id")

                }
            }

            isPlaying = true;
            playPause();
            updateLocalStorage();

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
        console.log("Hai mang giong nhau " + isEqual);
    }
    function CheckExist(CheckLink) {
        for (let i = 0; i < musics.length; i++) {
            if (CheckLink == musics[i].title) {
                isCheckExist = true;
                break;
            }
            isCheckExist = false;
        }
        console.log(" Có tôn tại không? " + isCheckExist);
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
        })
        localStorage.setItem('dangphat', JSON.stringify(dangphat));
    }


    var sessionCount;
    function Khoitao() {

        let sessionStatus = sessionStorage.getItem('status') ? true : false;
        if (sessionStatus) {
            sessionCount = 1;
            sessionStorage.setItem('status', sessionCount);
            updateMusics();
        }
        else {
            sessionCount = 0;
            sessionStorage.setItem('status', sessionCount);
            updateLocalStorage();

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
            })
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


////Luu userToken
//let user = localStorage.setItem('user', null);
function userToken() {
    var check = document.getElementById("usertoken");
    if (check != null) {
        sessionStorage.setItem('userToken', check.value);
    }

    const logoutButton = document.getElementById("logoutButton");
    const loginButton = document.getElementById("loginButton2");

    logoutButton.addEventListener("click", function () {
        sessionStorage.removeItem('userToken');
    })

    let user = sessionStorage.getItem('userToken') ? true : false;
    if (user) {
        loginButton.style.display = 'none';
    } else {
        logoutButton.style.display = 'none';
    }
}



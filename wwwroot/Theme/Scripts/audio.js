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
    const playOneaudio = document.querySelector(".play-one-audio");
    const updateAudio = document.querySelector(".update_playlist_audio");
    const nameAudios = document.querySelectorAll(".name_audio");
    const imgAudios = document.querySelectorAll(".img_audio");
    const nameArt = document.querySelectorAll(".js-name_art");

    const addPlaylists = document.querySelectorAll(".add-playlist");

    const detailSong = document.querySelector(".play-expand");
    const expandPlaylist = document.querySelector(".playlist-expand");
    const closePlaylist = document.querySelector(".playlist-close");
    const modalPlaylist = document.querySelector(".modal-playlist");
    const modalMain = document.querySelector(".modal-playlist-main");

    const updateModal = document.querySelector(".js-update");

    closePlaylist.style.display = 'none';
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
    userToken();
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
    //Open ModalPlaylist
    expandPlaylist.addEventListener('click', showPlaylist)
    //update Modalplaylist
    function updateModalplaylist() {
        // Index Modal Playlist

        for (var i = 0; i < musics.length; i++) {
            var ul = document.createElement('ul');
            ul.classList.add('songs');
            ul.classList.add('list1');
            ul.innerHTML = `<li class="main-song" onmouseenter="mouseenterIcon(this)" onmouseleave="mouseleaveIcon(this)" data-music-index="` + musics[i].id + `">
                                    <div class="row" style="margin-left:0px">
                                        <div class="main-song-title">
                                            <div class="play_audio main-song-cover" link="${musics[i].file}" name="${musics[i].title}" img="${musics[i].image}" nameart="${musics[i].name_art}">
                                                <img class="img_audio main-song-img " src="${musics[i].image}"/>
                                                <div class="main-song-play mini-song-play"><i class="fa-solid fa-play"></i></div>
                                            </div>
                                            <div class="main-song-text">
                                                <p  class="name_audio"><a href="/User/BaiHat/Index/${musics[i].idbh}" class="color_white">${musics[i].title}</a></p>
                                                <p><a href="#" class="caSi js-name_art">${musics[i].name_art}</a></p>
                                            </div>
                                        </div>
                                        <div class="col-md-1">
                                            <span style="font-size:20px" class="songId"><i class="fa-solid fa-trash-can"></i></span>
                                        </div>
                                    </div>
                                </li>`
            updateModal.appendChild(ul);
        }
        //Click to Play
        const playInplaylist = document.querySelectorAll(".play_audio")
        playOneSong(playInplaylist);

        const songId = document.querySelectorAll(".songId");
        for (const singlesongId of songId) {
            singlesongId.addEventListener("click", xoaBHDSPhat(songId))
        }
    }
    //Delete Modalplaylist
    function delModalplaylist() {
        for (var i = 0; i < musics.length; i++) {
            if (updateModal.hasChildNodes()) {
                updateModal.removeChild(updateModal.children[0]);
            }
        }
    }

    function xoaBHDSPhat(songId) {
        for (var j = 0; j < songId.length; j++) {
            songId[j].onclick = function (e) {
                console.log("ok nha");
                var a = e.target.closest('.main-song').getAttribute("data-music-index");
                if (a == (musics.length - 1)) {
                    musics.pop();
                }
                else {
                    musics.splice(a, 1);
                    for (var i = a; i < musics.length; i++) {
                        musics[i].id = parseInt(i);
                    }
                }
                updateLocalStorage();
                console.log(musics);
                window.location.reload();
            }
        }
    }

    function showPlaylist() {
        modalPlaylist.classList.add('open')
        expandPlaylist.style.display = 'none';
        closePlaylist.style.display = '';

        updateModalplaylist();

    }
    closePlaylist.addEventListener('click', hidePlaylist)
    function hidePlaylist() {
        modalPlaylist.classList.remove('open')
        closePlaylist.style.display = 'none';
        expandPlaylist.style.display = '';
        delModalplaylist();
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
                musics[i].title = playAudios[i].getAttribute("name");
                musics[i].image = imgAudios[i].getAttribute("src");
                musics[i].name_art = playAudios[i].getAttribute("nameart");
                musics[i].idbh = Number(playAudios[i].getAttribute("idbh"));
            }
            else if (musics.length < playAudios.length) {
                musics[i].file = playAudios[i].getAttribute("link");
                musics[i].title = playAudios[i].getAttribute("name");
                musics[i].image = imgAudios[i].getAttribute("src");
                musics[i].name_art = playAudios[i].getAttribute("nameart");
                musics[i].idbh = Number(playAudios[i].getAttribute("idbh"));
                musics.push({
                    id: musics.length,
                    title: playAudios[i].getAttribute("name"),
                    image: imgAudios[i].getAttribute("src"),
                    file: playAudios[i].getAttribute("link"),
                    name_art: playAudios[i].getAttribute("nameart"),
                    idbh: Number(playAudios[i].getAttribute("idbh"))
                })
            }
        }

        playRandom.style.color = "#ffb86c";
        isRandom = true;
        randomSong();
        init(indexSong);
        isPlaying = true;
        playPause();
        compareArr();
        updateLocalStorage();

    }

    //update 1 Song
    for (const addPlaylist of addPlaylists) {
        addPlaylist.addEventListener('click', addOneSong(addPlaylists))
    }
    function addOneSong(a) {
        for (var i = 0; i < playAudios.length; i++) {

            a[i].onclick = function (e) {
                compareArr();
                if (isEqual === true) {
                    alert("Bài hát đã nằm trong danh sách phát")

                }
                else if (isEqual === false) {
                    const CheckLink = e.target.closest('.add-playlist').getAttribute("name")
                    CheckExist(CheckLink);
                    if (isCheckExist === false) {

                        const Link = e.target.closest('.add-playlist').getAttribute("link")
                        const Img = e.target.closest('.add-playlist').getAttribute("img")
                        const Title = e.target.closest('.add-playlist').getAttribute("name")
                        const NameArt = e.target.closest('.add-playlist').getAttribute("nameart")
                        const idBH = Number(e.target.closest('.add-playlist').getAttribute("idbh"))
                        const ID = musics.length;
                        const obj = {};
                        obj['id'] = ID;
                        obj['title'] = Title;
                        obj['file'] = Link;
                        obj['image'] = Img;
                        obj['name_art'] = NameArt;
                        obj['idbh'] = idBH;
                        musics.push(obj);
                        console.log(musics)
                        indexSong = indexSong
                        console.log(indexSong)
                        alert("Đã thêm bài hát vào danh sách phát")
                    }

                    else {
                        alert("Bài hát đã nằm trong danh sách phát")

                    }
                }
            }
        }
        updateLocalStorage();
    }

    //add or play 1 song
    for (const playAudio of playAudios) {
        playAudio.addEventListener('click', playOneSong(playAudios))
    }
    function playOneSong(playAudios) {
        for (var i = 0; i < playAudios.length; i++) {
            playAudios[i].onclick = function (e) {
                compareArr();
                if (isEqual === true) {
                    var CheckLink = e.target.closest('.play_audio').getAttribute("name")
                    console.log(CheckLink)
                    x = CheckExist(CheckLink);
                    console.log(x)
                    indexSong = x;
                    init(indexSong);

                }
                else if (isEqual === false) {
                    var CheckLink = e.target.closest('.play_audio').getAttribute("name")
                    console.log(CheckLink)
                    x = CheckExist(CheckLink);
                    console.log(x)
                    indexSong = x;
                    if (isCheckExist === false) {
                        var Link = e.target.closest('.play_audio').getAttribute("link")
                        var Img = e.target.closest('.play_audio').getAttribute("img")
                        var Title = e.target.closest('.play_audio').getAttribute("name")
                        var NameArt = e.target.closest('.play_audio').getAttribute("nameart")
                        const idBH = Number(e.target.closest('.play_audio').getAttribute("idbh"))
                        var ID = musics.length;
                        const obj = {};
                        obj['id'] = ID;
                        obj['title'] = Title;
                        obj['file'] = Link;
                        obj['image'] = Img;
                        obj['name_art'] = NameArt;
                        obj['idbh'] = idBH;
                        musics.push(obj);
                        indexSong = ID;
                        init(indexSong);
                        console.log(NameArt)

                    }
                    else {
                        var CheckId = e.target.closest('.play_audio').getAttribute("link")
                        var Link = e.target.closest('.play_audio').getAttribute("link")
                        var Img = e.target.closest('.play_audio').getAttribute("img")
                        var Title = e.target.closest('.play_audio').getAttribute("name")
                        var NameArt = e.target.closest('.play_audio').getAttribute("nameart")
                        song.setAttribute("src", `${Link}`);
                        musicImage.setAttribute("src", `${Img}`);
                        musicName.textContent = Title;
                    }
                }
                init(indexSong);
                isPlaying = true;
                playPause();
                updateLocalStorage();
            }
        }
    }

    //Play one song ở index bài hát :(((
    playOneaudio.addEventListener('click', playOnesongindex)

        function playOnesongindex() {
        compareArr();
        if (isEqual === true) {
            var CheckName = playOneaudio.getAttribute("name")
            x = CheckExist(CheckName);
            console.log(CheckName);
            console.log(x)
            indexSong = x;
            init(indexSong);
        }
        else if (isEqual === false) {
            var CheckLink = playOneaudio.getAttribute("name")

            x = CheckExist(CheckLink);
            console.log(x)
            indexSong = x;
            if (isCheckExist === false) {
                var Link = playOneaudio.getAttribute("link")
                var Img = playOneaudio.getAttribute("img")
                var Title = playOneaudio.getAttribute("name")
                const NameArt = playOneaudio.getAttribute("nameart")
                const idBH = Number(playOneaudio.getAttribute("idbh"))
                var ID = musics.length;
                const obj = {};
                obj['id'] = ID;
                obj['title'] = Title;
                obj['file'] = Link;
                obj['image'] = Img;
                obj['name_art'] = NameArt;
                obj['idbh'] = idBH;
                musics.push(obj);
                indexSong = ID;
                init(indexSong);
            }
            else {

                var Link = playOneaudio.getAttribute("link")
                var Img = playOneaudio.getAttribute("img")
                var Title = playOneaudio.getAttribute("name")
      
                song.setAttribute("src", `${Link}`);
                musicImage.setAttribute("src", `${Img}`);
                musicName.textContent = Title;
            }
        }
        isPlaying = true;
        playPause();
        updateLocalStorage();
    }
    // So sánh musics hiện tại mà danh sách phát nhạc mới
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
    // Kiểm tra bài hát có tồn tại trong danh sách đang phát không
    function CheckExist(CheckLink) {
        for (var i = 0; i < musics.length; i++) {
            if (CheckLink == musics[i].title) {
                isCheckExist = true;
                return musics[i].id
                break;
            }
            isCheckExist = false;
        }
        console.log(" Có tôn tại không? " + isCheckExist);
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

//document.addEventListener("click", function () {
//    updateLocalStorage();
//})



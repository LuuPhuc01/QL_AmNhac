const loiBH = document.querySelector(".loiBH");

function convertBR() {
    var lyricInit = loiBH.innerHTML; 
    console.log("input:"+lyricInit);
    var output = "";

    for (var i = 0; i < lyricInit.length; i++) {
        if ((lyricInit.charCodeAt(i) == 13) && (lyricInit.charCodeAt(i + 1) == 10)) {
            output += "<BR>";
            i++;
        } else {
            output += lyricInit.charAt(i);
        }
    }
    console.log('output: ' + output);
    loiBH.innerHTML = output;
}

convertBR();

function mouseenterIcon(x) {

    x.children[0].children[0].children[0].children[1].style.display = "initial";
}
function mouseleaveIcon(x) {

    x.children[0].children[0].children[0].children[1].style.display = "none";
}

function mouseenterIconTK(x) {
    x.children[0].children[0].children[1].style.display = "initial";
}
function mouseleaveIconTK(x) {
    x.children[0].children[0].children[1].style.display = "none";
}

document.addEventListener('DOMContentLoaded', () => {
    var anhBH = document.querySelector(".anhBHHidden").value;
    var mask = document.querySelector(".header-artist");
    console.log(anhBH);
    mask.style.background = `no-repeat center url(${anhBH})`;
})

//function addFavorite(x) {
//    //console.log(x.children[1])
//    x.parentElement.children[1].style.display = "initial";
//    x.parentElement.children[0].style.display = "none";
//}
//function removeFavorite(x) {
//    //console.log(x.children[1])
//    x.parentElement.children[0].style.display = "initial";
//    x.parentElement.children[1].style.display = "none";
//}

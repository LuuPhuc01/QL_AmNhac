function mouseenterIcon(x, z) {
    var y = document.getElementById(x);
    y.children[0].style.display = "initial";
    y.children[4].style.display = "initial";
}
function mouseleaveIcon(x, z) {
    var y = document.getElementById(x);
    y.children[0].style.display = "none";
    y.children[4].style.display = "none";
}
function addFavorite(x) {
    //console.log(x.parentElement)
    x.parentElement.children[1].style.display = "initial";
    x.parentElement.children[0].style.display = "none";
}
function removeFavorite(x) {
    x.parentElement.children[0].style.display = "initial";
    x.parentElement.children[1].style.display = "none";
}
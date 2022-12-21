function mouseenterIcon(x) {
    //console.log(x);
    //var y = document.getElementById(x);
    //y = x;
    //console.log(y);
    //console.log(y.children[4]);
    x.children[0].children[0].children[0].children[1].style.display = "initial";

    //y.children[4].style.display = "initial";
}
function mouseleaveIcon(x) {
    //var y = document.getElementById(x);
    //var y = x;
    x.children[0].children[0].children[0].children[1].style.display = "none";
    //y.children[4].style.display = "none";
}
function addFavorite(x) {
    //console.log(x.children[1])
    x.parentElement.children[1].style.display = "initial";
    x.parentElement.children[0].style.display = "none";
}
function removeFavorite(x) {
    //console.log(x.children[1])
    x.parentElement.children[0].style.display = "initial";
    x.parentElement.children[1].style.display = "none";
}
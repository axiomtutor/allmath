function findDiv(button) {
    var baseName = button.getAttribute("name").split("_")[0];
    var div = document.getElementById(baseName);
    return div;
}

function showDiv(button) {
    var d = findDiv(button);
    d.className = "unhidden";

    button.setAttribute("name", d.getAttribute("id")+"_hide");
    button.setAttribute("onclick", "hideDiv(this)");
}

function hideDiv(button) {
    var d = findDiv(button);
    d.className = "hidden";

    button.setAttribute("name", d.getAttribute("id")+"_show");
    button.setAttribute("onclick", "showDiv(this)");
}

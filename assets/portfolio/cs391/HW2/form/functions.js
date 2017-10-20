var color = document.getElementById("color");
var colorHex = document.getElementById("colorHex"); 
var button = document.getElementById("submit");
var h1 = document.getElementById("hex1");
var h2 = document.getElementById("hex2");
var h3 = document.getElementById("hex3");
var pageRoot = document.documentElement;

function setColorPicker() {
    var fullHex = '#';
    fullHex += h1.value + h2.value + h3.value;
    colorHex.value = fullHex;
    color.value = fullHex;
    pageRoot.style.backgroundColor = fullHex;
}

button.onclick = setColorPicker;

function setHexFields() {
    var colorVal = color.value;
    pageRoot.style.backgroundColor = colorVal;
    colorHex.value = colorVal;
    colorVal = colorVal.substring(colorVal.indexOf("#")+1, colorVal.length);
    var incr = 0;
    h1.value = colorVal.substring(0,2);
    h2.value = colorVal.substring(2,4);
    h3.value = colorVal.substring(4,colorVal.length);
}

color.onchange = setHexFields;

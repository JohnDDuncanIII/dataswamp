var color = document.getElementById("preview");
var sliders = [document.getElementById("redSlider"),document.getElementById("greenSlider"),document.getElementById("blueSlider")];
var textBoxes =  [document.getElementById("redTextBox"),document.getElementById("greenTextBox"),document.getElementById("blueTextBox")];

function updateColor() {
    var colorHex = "rgb(";
    for(var i = 0; i<sliders.length; i++) {
	colorHex+= sliders[i].value;
	if(i != sliders.length-1) { colorHex+=","; }
	textBoxes[i].value = sliders[i].value;
    }
    colorHex +=  ")";
    color.style.backgroundColor = colorHex;
}

function updateSliders() {
    for(var i = 0; i<textBoxes.length; i++) {
	sliders[i].value = textBoxes[i].value;
    }
    updateColor();
}

sliders[0].oninput = updateColor;
sliders[1].oninput = updateColor;
sliders[2].oninput = updateColor;

textBoxes[0].oninput = updateSliders;
textBoxes[1].oninput = updateSliders;
textBoxes[2].oninput = updateSliders;



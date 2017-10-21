function letterize(element) {
        text = element.textContent;
        letterized = '';
        for (var i=0; i<text.length; i++) {
                var letter = text.charAt(i);
                if (letter==' ')
                        letterized = letterized + ' ';
                else
                        letterized = letterized + '<span class="letter">' + text.charAt(i) + '</span>';
        }
        element.innerHTML=letterized;
}


var headers = document.getElementsByTagName("h1");
for (var i=0; i<headers.length; i++)
    letterize(headers[i]);

var arena = document.getElementById("arena");
var context = arena.getContext("2d");
var width = arena.offsetWidth;
var height = arena.offsetHeight;

var image = context.getImageData(0,0,width,height);

var opacity = 82;

var offset = (Math.floor(height/2)*width+Math.floor(width/2))*4+3;
image.data[offset-4] = opacity;
image.data[offset] = opacity;
image.data[offset+4] = opacity;
image.data[offset-width*4] = opacity;
image.data[offset+width*4+4] = opacity;

context.putImageData(image,0,0);

window.setInterval(function(){
    var offset = 0;
    for (var i=0; i<height; i++) {
        for (var j=0; j<width; j++) {
            offset += 4;
            var px = -4;
            var sx = +4;
            var py = -width*4;
            var sy = +width*4;
            if (i==0) py += image.data.length;
            else if (i==height-1) sy -= image.data.length;
            if (j==0) px += width*4;
            else if (j==width-1) sx -= width*4;
            var count = 0;
            if (image.data[offset+px+3]>0) count++;
            if (image.data[offset+px+py+3]>0) count++;
            if (image.data[offset+py+3]>0) count++;
            if (image.data[offset+py+sx+3]>0) count++;
            if (image.data[offset+sx+3]>0) count++;
            if (image.data[offset+sx+sy+3]>0) count++;
            if (image.data[offset+sy+3]>0) count++;
            if (image.data[offset+sy+px+3]>0) count++;
            image.data[offset] = count;
        }
    }
    for (var i=0; i<image.data.length; i+=4) {
        var count = image.data[i];
        image.data[i] = 0;
        if (count<2 || count>3) {
            image.data[i+3] = 0;
        }
        else if (count==3) {
            image.data[i+3] = opacity;
        }
    }
    context.putImageData(image,0,0);
},100);

arena.onmousemove = function(event) {
    var x = Math.floor(event.clientX-arena.offsetLeft);
    var y = Math.floor(event.clientY-arena.offsetTop);
    image.data[(x+y*width)*4+3] = opacity;
}

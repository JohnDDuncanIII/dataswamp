var image = document.getElementById("hdrimg");
setInterval(
    function() {
        var rNum = Math.floor(Math.random() * (150));
        var lNum = Math.floor(Math.random() * (150));
        hdrimg.src = "images/about/me-dithered.gif";
        setTimeout(function(){
            hdrimg.src = "images/about/me.jpg";
            if(rNum < rNum/2) {return;}
            setTimeout(function(){
                hdrimg.src = "images/about/me-dithered.gif";
                setTimeout(function(){
                    hdrimg.src = "images/about/me.jpg"; },
                           rNum) },
                       lNum)  },
                   rNum);
    }, Math.floor(Math.random() * (2500)));

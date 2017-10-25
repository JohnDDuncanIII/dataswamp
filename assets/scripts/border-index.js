var NUM_PATS = 260;
var NUM_PATS_BW = 575;
var NUM_PATS_ANIM = 13;

var lev = document.getElementById("lever");
var www = document.getElementById("www");
var messagefaces = document.getElementById("messagefaces");
var browsers = document.getElementById("browsers");
var clipart = document.getElementById("clipart");
var writings = document.getElementById("writings");
var guestbook = document.getElementById("guestbook");
var headerVals = [document.getElementById("cards"),
                  document.getElementById("books"), document.getElementById("faces"),
                  document.getElementById("portfolio"), document.getElementById("weather"),
                  document.getElementById("berlinblue"), browsers, clipart, writings,
                  document.getElementById("soundcloud"), document.getElementById("bugzilla"),
                  document.getElementById("facebook"), document.getElementById("twitter"),
                  document.getElementById("youtube"), document.getElementById("guestbook"),
		  document.getElementById("linkedin"), document.getElementById("instagram"),
		  document.getElementById("spotify"), document.getElementById("mozillazine")];
var images = document.getElementById("images");
//var footer = document.getElementById("footer");
var mail = document.getElementById("mail");
var john = document.getElementById("illuminated");
var vanilla = document.getElementById("vanilla");
var seal = document.getElementById("seal");
var anybrowser = document.getElementById("anyBrowser");

var stylesheet = document.styleSheets[0];

var prev_action = '';

//var colors = ["#E0E8FF", "#FDC", "#EEE", "#f7e0ff", "#e0fdff", "#ffc"];

function blw() {
    john.src = john.src.substring(0, john.src.lastIndexOf('.'))+"_bw.gif"
    seal.src = seal.src.substring(0, seal.src.lastIndexOf('.'))+"_bw.png"
    images.classList.add('content-bw-image');
    www.src="assets/images/index/www_std.gif";
    messagefaces.onmouseover=function() {this.src='assets/images/header/mbox_bw.gif'}
    messagefaces.onclick= function() {this.src='assets/images/header/mbox-hover_bw.gif'; return this.href;}
    browsers.onmouseover= function() {this.src='assets/images/header/netscape-hover_bw.gif';}
    browsers.onmouseout=function() {this.src='assets/images/header/netscape_bw.gif';}
    clipart.onmouseover= function() {this.src='assets/images/header/clip-hover_bw.gif';}
    clipart.onmouseout=function() {this.src='assets/images/header/clip_bw.gif';}
    writings.onmouseover= function() {this.src='assets/images/header/writings-hover_bw.gif';}
    writings.onmouseout=function() {this.src='assets/images/header/writings_bw.gif';}
    guestbook.onmouseover= function() {this.src='assets/images/header/guestbook-hover_bw.gif';}
    guestbook.onmouseout=function() {this.src='assets/images/header/guestbook_bw.gif';}

    for(var i = 0; i < headerVals.length; i++) {
        headerVals[i].src = headerVals[i].src.substring(0, headerVals[i].src.lastIndexOf('.'))+"_bw.gif";
    }
}

function clr() {
    john.src = john.src.substring(0, john.src.lastIndexOf('_bw.gif'))+".gif";
    seal.src = seal.src.substring(0, seal.src.lastIndexOf('_bw.png'))+".png";
    images.classList.remove('content-bw-image');
    www.src="assets/images/index/www_color.gif";
    messagefaces.onmouseover=function() {this.src='assets/images/header/mbox.gif'}
    messagefaces.onclick= function() {this.src='assets/images/header/mbox-hover.gif'; return this.href;}
    browsers.onmouseover= function() {this.src='assets/images/header/netscape-hover.gif';}
    browsers.onmouseout=function() {this.src='assets/images/header/netscape.gif';}
    clipart.onmouseover= function() {this.src='assets/images/header/clip-hover.gif';}
    clipart.onmouseout=function() {this.src='assets/images/header/clip.gif';}
    writings.onmouseover= function() {this.src='assets/images/header/writings-hover.gif';}
    writings.onmouseout=function() {this.src='assets/images/header/writings.gif';}
    guestbook.onmouseover= function() {this.src='assets/images/header/guestbook-hover.gif';}
    guestbook.onmouseout=function() {this.src='assets/images/header/guestbook.gif';}

    for(var i = 0; i < headerVals.length; i++) {
        headerVals[i].src = headerVals[i].src.substring(0, headerVals[i].src.lastIndexOf('_bw.gif'))+".gif";
    }
}

if (window.localStorage) {
    if(!localStorage.getItem("pat")) {
	localStorage.setItem("pat", "clr");
    }

    if(localStorage.getItem("pat") == "bw") {
	if(mail) {
	    mail.src = mail.src.substring(0, mail.src.lastIndexOf('.'))+"_bw.gif"
	}

	if(vanilla) {
	    vanilla.src = vanilla.src.substring(0, vanilla.src.lastIndexOf('.'))+"_bw.gif";
	}
	if(anybrowser) {
	    var num = Math.floor(Math.random() * (4));
	    anybrowser.src = "assets/images/banners/"+num+"_bw.gif";
	}

        lev.src = "assets/images/index/lever_up.gif";
        blw();
        var num = Math.floor(Math.random() * (NUM_PATS_BW)+1);
	stylesheet.insertRule("html { background: transparent url(\"../images/patterns_bw/"+num+".gif\") repeat scroll 0% 0%; }", 0);
        document.addEventListener('click', function(event) {
            if(event.target.tagName === "HTML") {
                num = Math.floor(Math.random() * (NUM_PATS_BW)+1);
		stylesheet.deleteRule(0);
		stylesheet.insertRule("html { background: transparent url(\"../images/patterns_bw/"+num+".gif\") repeat scroll 0% 0%; }", 0);
            }
        });
    } else if (localStorage.getItem("pat") == "clr") {
	if(anybrowser) {
	    var num = Math.floor(Math.random() * (4));
	    anybrowser.src = "assets/images/banners/"+num+".gif";
	}

        lev.src = "assets/images/index/lever_down.gif";
        var num = Math.floor(Math.random() * (NUM_PATS)+1);
	stylesheet.insertRule("html { background: transparent url(\"../images/patterns/"+num+".gif\") repeat scroll 0% 0%; }", 0);
        document.addEventListener('click', function(event) {
            if(event.target.tagName === "HTML") {
                num = Math.floor(Math.random() * (NUM_PATS)+1);
		stylesheet.deleteRule(0);
		stylesheet.insertRule("html { background: transparent url(\"../images/patterns/"+num+".gif\") repeat scroll 0% 0%; }", 0);
            }
        });
    } else if (localStorage.getItem("pat") == "none") {
        lev.src = "assets/images/index/lever_middle.gif";
        prev_action = "down";
	var num = Math.floor(Math.random() * (NUM_PATS_ANIM)+1);
	stylesheet.insertRule("html { background: transparent url(\"../images/patterns/anim/"+num+".gif\") repeat scroll 0% 0%; }", 0);
        document.addEventListener('click', function(event) {
            if(event.target.tagName === "HTML") {
                num = Math.floor(Math.random() * (NUM_PATS_ANIM)+1);
		stylesheet.deleteRule(0);
		stylesheet.insertRule("html { background: transparent url(\"../images/patterns/anim/"+num+".gif\") repeat scroll 0% 0%; }", 0);
            }
        });
    }
} else {
    var num = Math.floor(Math.random() * (NUM_PATS)+1);
    stylesheet.insertRule("html { background: transparent url(\"../images/patterns/"+num+".gif\") repeat scroll 0% 0%; }", 0);
    document.addEventListener('click', function(event) {
        if(event.target.tagName === "HTML") {
	    stylesheet.deleteRule(0);
	    stylesheet.insertRule("html { background: transparent url(\"../images/patterns/"+num+".gif\") repeat scroll 0% 0%; }", 0);
        }
    });
}

function lever() {
    stylesheet.deleteRule(0);
    if(lev.src.indexOf("up") !== -1) {
        prev_action = "up";
        lev.src = "assets/images/index/lever_middle.gif";
	var num = Math.floor(Math.random() * (NUM_PATS_ANIM)+1);
	stylesheet.insertRule("html { background: transparent url(\"../images/patterns/anim/"+num+".gif\") repeat scroll 0% 0%; }", 0);
        document.addEventListener('click', function(event) {
            if(event.target.tagName === "HTML") {
                num = Math.floor(Math.random() * (NUM_PATS_ANIM)+1);
		stylesheet.deleteRule(0);
		stylesheet.insertRule("html { background: transparent url(\"../images/patterns/anim/"+num+".gif\") repeat scroll 0% 0%; }", 0);
            }
        });
        if (window.localStorage) {
            localStorage.setItem("pat", "none");
        }
    } else if(lev.src.indexOf("down") !== -1) {
        prev_action = "down";
        lev.src = "assets/images/index/lever_middle.gif";
	var num = Math.floor(Math.random() * (NUM_PATS_ANIM)+1);
	stylesheet.insertRule("html { background: transparent url(\"../images/patterns/anim/"+num+".gif\") repeat scroll 0% 0%; }", 0);
        document.addEventListener('click', function(event) {
            if(event.target.tagName === "HTML") {
                num = Math.floor(Math.random() * (NUM_PATS_ANIM)+1);
		stylesheet.deleteRule(0);
		stylesheet.insertRule("html { background: transparent url(\"../images/patterns/anim/"+num+".gif\") repeat scroll 0% 0%; }", 0);
            }
        });
        if (window.localStorage) {
            localStorage.setItem("pat", "none");
        }
    }
    else if(lev.src.indexOf("middle") !== -1) {
        if(prev_action == "up") {
            lev.src = "assets/images/index/lever_down.gif";
            clr();

            if (window.localStorage) {
		if(mail) {
		    mail.src = mail.src.substring(0, mail.src.lastIndexOf('_bw.gif'))+".gif";
		}

		if(vanilla) {
		    vanilla.src = vanilla.src.substring(0, vanilla.src.lastIndexOf('_bw.gif'))+".gif"
		}
		if(anybrowser) {
		    var num = Math.floor(Math.random() * (4));
		    anybrowser.src = "assets/images/banners/"+num+".gif";
		}

                localStorage.setItem("pat", "clr");
                var num = Math.floor(Math.random() * (NUM_PATS)+1);
		stylesheet.insertRule("html { background: transparent url(\"../images/patterns/"+num+".gif\") repeat scroll 0% 0%; }", 0);
                document.addEventListener('click', function(event) {
                    if(event.target.tagName === "HTML") {
                        num = Math.floor(Math.random() * (NUM_PATS)+1);
			stylesheet.deleteRule(0);
			stylesheet.insertRule("html { background: transparent url(\"../images/patterns/"+num+".gif\") repeat scroll 0% 0%; }", 0);
                    }
                });
            }
        } else if (prev_action == "down") {
            lev.src = "assets/images/index/lever_up.gif";
            blw();

            if (window.localStorage) {
		if(mail) {
		    mail.src = mail.src.substring(0, mail.src.lastIndexOf('.'))+"_bw.gif"
		}

		if(vanilla) {
		    vanilla.src = vanilla.src.substring(0, vanilla.src.lastIndexOf('.'))+"_bw.gif";
		}
		if(anybrowser) {
		    var num = Math.floor(Math.random() * (4));
		    anybrowser.src = "assets/images/banners/"+num+"_bw.gif";
		}

                localStorage.setItem("pat", "bw");
                var num = Math.floor(Math.random() * (NUM_PATS_BW)+1);
		stylesheet.insertRule("html { background: transparent url(\"../images/patterns_bw/"+num+".gif\") repeat scroll 0% 0%; }", 0);
                document.addEventListener('click', function(event) {
                    if(event.target.tagName === "HTML") {
                        num = Math.floor(Math.random() * (NUM_PATS_BW)+1);
			stylesheet.deleteRule(0);
			stylesheet.insertRule("html { background: transparent url(\"../images/patterns_bw/"+num+".gif\") repeat scroll 0% 0%; }", 0);
                    }
                });
            }
        }
    }
}
lev.onclick = lever;

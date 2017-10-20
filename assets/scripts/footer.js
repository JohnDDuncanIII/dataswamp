var mail = document.getElementById("mail");
var vanilla = document.getElementById("vanilla");
var home = document.getElementById("home");
var num = Math.floor(Math.random() * (4));
var anybrowser = document.getElementById("anyBrowser");
var sysarc = document.getElementById("sysarc");
var mit = document.getElementById("mit");
var seal = document.getElementById("seal");
var heart = document.getElementById("heart");
var tv = document.getElementById("tv");

var stylesheet = document.styleSheets[0];

if(anybrowser) {
    stylesheet.insertRule("#anyBrowser::after { content: url(\"../images/banners/"+num+".gif\"); }", 1);
}

if (window.localStorage) {
    if(localStorage.getItem("pat") == "bw") {
	if(mail){
	    mail.src = mail.src.substring(0, mail.src.lastIndexOf('.'))+"_bw.gif"
	}

	if(vanilla) {
	    vanilla.src = vanilla.src.substring(0, vanilla.src.lastIndexOf('.'))+"_bw.gif";
	}
	if(anybrowser) {
	    stylesheet.deleteRule(1);
	    stylesheet.insertRule("#anyBrowser::after { content: url(\"../images/banners/"+num+"_bw.gif\"); }", 1);
	}
	if(home) {
	    home.src = "images/house.gif";
	}

	if(sysarc) {
	    sysarc.src = "images/about/sysarc_bw.gif";
	}

	if(mit) {
	    mit.src = "images/about/mitll_bw.gif";
	}

	if(seal) {
	    seal.src = "images/about/seal_small_bw.gif";
	}
	if(heart) {
	    heart.src = "images/about/heart_bw.gif";
	    heart.onmouseout = function(){this.src='images/about/heart_bw.gif';};
	    heart.onmouseover = function(){this.src='images/about/heart_hover_bw.gif';};
	}
	if(tv) {
	    tv.src = "images/about/tv_bw.gif";
	}
    }
}

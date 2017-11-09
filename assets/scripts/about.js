var seal = document.getElementById("seal");
var mit = document.getElementById("mit");
var sysarc = document.getElementById("sysarc");
var heart = document.getElementById("heart");
var tv = document.getElementById("tv");

if (window.localStorage) {
	if(localStorage.getItem("pat") == "bw") {
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

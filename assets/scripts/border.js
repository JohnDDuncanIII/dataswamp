var NUM_PATS= 262;
var NUM_PATS_BW = 579;
var NUM_PATS_ANIM = 13;

/*
  var imagePath = window.location.protocol + "//" + window.location.host + "/";

  var cssRuleCode = document.all ? 'rules' : 'cssRules'; //account for IE and FF
  var rule = document.styleSheets[0][cssRuleCode][0];
  var selector = rule.selectorText;  //maybe '#tId'
  var value = rule.value;            //both selectorText and value are settable.
  console.log(value);
*/

var stylesheet = document.styleSheets[0];
//stylesheet.cssRules[0].style.backgroundColor="blue";

if (window.localStorage) {
	if(!localStorage.getItem("pat")) {
		localStorage.setItem("pat", "clr");
	}
	if(localStorage.getItem("pat") == "bw") {
		var num = Math.floor(Math.random() * (NUM_PATS_BW)+1);
		stylesheet.insertRule("html { background: transparent url(\"../images/patterns_bw/"+num+".png\") repeat scroll 0% 0%; }", 0);
		document.addEventListener('click', function(event) {
			if(event.target.tagName === "HTML"){
				num = Math.floor(Math.random() * (NUM_PATS_BW)+1);
				stylesheet.deleteRule(0);
				stylesheet.insertRule("html { background: transparent url(\"../images/patterns_bw/"+num+".png\") repeat scroll 0% 0%; }", 0);
			}
		});
		var mail = document.getElementById("mail");
		if(mail) {
			mail.src = mail.src.substring(0, mail.src.lastIndexOf('.'))+"_bw.gif"
			var vanilla = document.getElementById("vanilla");
			vanilla.src = vanilla.src.substring(0, vanilla.src.lastIndexOf('.'))+"_bw.gif"
		}
		var home = document.getElementById("home");
		if(home) {
			home.src = "images/house.gif";
		}
	} else if (localStorage.getItem("pat") == "clr") {
		var num = Math.floor(Math.random() * (NUM_PATS)+1);
		stylesheet.insertRule("html { background: transparent url(\"../images/patterns/"+num+".png\") repeat scroll 0% 0%; }", 0);
		document.addEventListener('click', function(event) {
			if(event.target.tagName === "HTML"){
				num = Math.floor(Math.random() * (NUM_PATS)+1);
				stylesheet.deleteRule(0);
				stylesheet.insertRule("html { background: transparent url(\"../images/patterns/"+num+".png\") repeat scroll 0% 0%; }", 0);
			}
		});
	}
	else if (localStorage.getItem("pat") == "none") {
		var num = Math.floor(Math.random() * (NUM_PATS_ANIM)+1);
		stylesheet.insertRule("html { background: transparent url(\"../images/patterns/anim/"+num+".gif\") repeat scroll 0% 0%; }", 0);
		document.addEventListener('click', function(event) {
			if(event.target.tagName === "HTML"){
				num = Math.floor(Math.random() * (NUM_PATS_ANIM)+1);
				stylesheet.deleteRule(0);
				stylesheet.insertRule("html { background: transparent url(\"../images/patterns/anim/"+num+".gif\") repeat scroll 0% 0%; }", 0);
			}
		});
	}
} else {
	var num = Math.floor(Math.random() * (NUM_PATS)+1);
	stylesheet.insertRule("html { background: transparent url(\"../images/patterns/"+num+".png\") repeat scroll 0% 0%; }", 0);

	document.addEventListener('click', function(event) {
		if(event.target.tagName === "HTML"){
			num = Math.floor(Math.random() * (NUM_PATS_ANIM)+1);
			stylesheet.deleteRule(0);
			stylesheet.insertRule("html { background: transparent url(\"../images/patterns/"+num+".png\") repeat scroll 0% 0%; }", 0);
		}
	});
}

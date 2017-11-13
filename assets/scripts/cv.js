var num = Math.floor((Math.random() * 3));
var count = num;
document.getElementById("stylesheet").href="styles/bisqwit/bisqw_" + num+".css";
document.addEventListener('click', function(event) {
	if(event.target.tagName === "HTML"){
		count++;
		if(count == 3) { count = 0; }
		document.getElementById("stylesheet").href="styles/bisqwit/bisqw_" + count+".css";
	}
});

if (document.addEventListener) {
	// Good browsers
	document.addEventListener("DOMContentLoaded", function() {
		document.removeEventListener( "DOMContentLoaded", arguments.callee, false );
		CC.init();
	}, false );

	// Just in case
	window.addEventListener("load", function() {
		window.removeEventListener( "load", arguments.callee, false );
		CC.init();
	}, false );

	window.addEventListener("resize", function() {
		CC.handleResize();
	}, false );
} else if (window.attachEvent) {
	/*window.attachEvent("onload", function() {
	  CC.init();
	  });

	  window.attachEvent("onresize", function() {
	  CC.handleResize();
	  });

	  // chrome frame
	  if(CFInstall) {
	  CFInstall.check({ mode: "overlay" });
	  }*/
}

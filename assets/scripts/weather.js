// written by John D. Duncan, III
// feel free to use in non-corporate settings
// if you would like enterprise support, please contact me at duncanjdiii@gmail.com

if (!String.prototype.includes) { // indexof polyfill
    String.prototype.includes = function() {
	'use strict';
	return String.prototype.indexOf.apply(this, arguments) !== -1;
    };
}

function computeImage(forecast) {
    var image = '';
    var fc = forecast.toString().toLowerCase();
    if(fc.includes("chance")) { image+= "maybe"; }
    if(fc.includes("partly") || fc.includes("decreasing") || fc.includes("a few")) { image+= "partly"; }
    if(fc.includes("heavy") || fc.includes("severe")) { image+= "heavy"; }
    if(fc.includes("wintry mix")) { image+= "sleety"; }
    if(fc.includes("drizzle") || fc.includes("sprinkles")) { image+= "drizzly"; }
    if(fc.includes("rain") || fc.includes("showers") && !fc.includes("snow")) {
	if(fc.includes("lt") || fc.includes("scattered showers")) {
	    image += "drizzly";
	} else { image+= "rainy"; }
    }
    if(fc.includes("snow") || fc.includes("flurries")) { image+= "snowy"; }
    if(fc.includes("frost")) { image+= "frosty"; }
    if(fc.includes("fog") || fc.includes("mist")) { image+= "foggy"; }
    if(fc.includes("storm")) { image+= "stormy"; }
    if(fc.includes("sunny")) { image+= "sunny"; }
    if(fc.includes("clear") || fc.includes("fair")) { image+= "sunny"; }
    if(fc.includes("hot")) { image+= "hot"; }
    if(fc.includes("cloud") || fc.includes("overcast")) { image+= "cloudy"; }
    //if(fc.includes("breez") || fc.includes("wind") || fc.includes("blust")) { image+= "windy"; }
    if(fc.includes("smoke")) { image = "smokey"; }
    if(fc == "sunny") { image = "sunny"; }
    if(fc == "" || fc == "na" || fc.includes("unknown") || fc.includes("obscured")) { image = true; }
    return image;
}

var d = new Date();
var weekday = new Array(7);
weekday[0]=  "sun";
weekday[1] = "mon";
weekday[2] = "tue";
weekday[3] = "wed";
weekday[4] = "thu";
weekday[5] = "fri";
weekday[6] = "sat";

var weekd = new Array(7);
weekd[0]=  "Sunday";
weekd[1] = "Monday";
weekd[2] = "Tuesday";
weekd[3] = "Wednesday";
weekd[4] = "Thursday";
weekd[5] = "Friday";
weekd[6] = "Saturday";

var n = weekday[d.getDay()]; // get picon val of current day
var hasShownMoon = false;
var firstRun = true;
var firstRunDay;
var LATITUDE = 0.0;
var LONGITUDE = 0.0;
//var geocoder = new google.maps.Geocoder();
var address = "Truth or Consequences";
var loc = location.toString();
var tLat = window.localStorage.getItem("latitude");
var tLong = window.localStorage.getItem("longitude");
var bw = window.localStorage.getItem("pat") == "bw";
var pCount = 0; // picon counter
var dCount = 0; // day counter (counts twice per day, for morning and evening)
var odCount = 0; // overall day counter
var tCount = 0; // thermometer counter
var lCount = 0; // letter counter
var gCount = 0; // graph counter
var bCount = 0; // bar counter (for graphs)
var piconArray = [];
var dayArray = [];
var thermArray = [];
var letterArray = [];
var windArray = [];
var barPrecipArray = [];
var barTempArray = [];
var barHumidArray = [];
var barDewArray = [];
var barCloudArray = [];
var barWindGustArray = [];
var lvrInit = false;

var doc; // this holds the extended XML data that is not available through the standard JSON service
var count = 2; // this is the overall counter for the weather temperature information
var position = 0; // this is the position in the array for the weather temperature information
var startTime; // this is the starting time to be used for each weather graph
var tmrw = false; // whether or not we have gotten passed the variable outcomes of current weather information
var LAST_DAY = 14; // final var to hold the "last" possible day from nws

// allow the user to specify any location in the United States (weather.gov) in the url
if(loc.includes("=")) {
    address = loc.substring(loc.indexOf("=")+1, loc.length);
    address = address.replace(/%20/g, " ");
}
// translate from given name to lat/long location from a google geocoder
/*function computeLocation() {
    geocoder.geocode( { 'address': address}, function(results, status) {
	if (status == google.maps.GeocoderStatus.OK) {
	    LATITUDE = results[0].geometry.location.lat();
	    LONGITUDE = results[0].geometry.location.lng();
	}
    });
}*/

// fetches the json file from weather.gov
function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
	if (httpRequest.readyState === 4) {
	    if (httpRequest.status === 200) {
		var data = JSON.parse(httpRequest.responseText);
		if (callback) callback(data);
	    }
	}
    };
    httpRequest.open('GET', path);
    httpRequest.send();
}

function reload(weatherBox, mapBox) {
    mapBox.src = mapBox.src;
    mapBox.onmouseover = mapBox.onmouseover;
    mapBox.onmouseout = mapBox.onmouseout;
    mapBox.onclick = mapBox.onclick;

    count = 2;
    position = 0;
    tmrw = false;
    LAST_DAY = 14;
    startTime = 0;
    dCount = 0;
    hasShownMoon = false;
    firstRun = true;
    pCount = 0;
    tCount = 0;
    lCount = 0;
    gCount = 0;
    bCount = 0;
    piconArray = [];
    dayArray = [];
    thermArray = [];
    letterArray = [];
    windArray = [];
    barPrecipArray = [];
    barTempArray = [];
    barHumidArray = [];
    barDewArray = [];
    barCloudArray = [];
    bw = window.localStorage.getItem("pat") == "bw";
    while (weatherBox.hasChildNodes()) {
	weatherBox.removeChild(weatherBox.lastChild);
    }
}

function weather() {
    // this is the master box that holds all of the children (days, high/low, graphs, etc.)
    var weatherBox = document.getElementById("weatherBox");
    var mapBox = document.getElementById("mapBox");

    reload(weatherBox, mapBox);

    var toAdd = document.createElement("hr");
    weatherBox.appendChild(toAdd);

    // if we have a saved geolocation in local storage, allow the user to wipe it
    if((tLat != null) &&
       (tLong != null)) {
	var buttonnode= document.createElement('input');
	buttonnode.setAttribute('type','button');
	buttonnode.setAttribute('name','geolocation');
	buttonnode.setAttribute('value','Reset Geolocation Coordinates');
	buttonnode.addEventListener("click", function(){
	    window.localStorage.removeItem("latitude");
	    window.localStorage.removeItem("longitude");
	    buttonnode.setAttribute('value','Geolocation Coordinates Reset!');
	});
	weatherBox.appendChild(buttonnode);

	var toAdd = document.createElement("br");
	weatherBox.appendChild(toAdd);
    }

    /* this requests the file and executes a
       callback with the parsed result once it is available */
    fetchJSONFile('https://forecast.weather.gov/MapClick.php?lat='+
		  LATITUDE+'&lon='+
		  LONGITUDE+'&FcstType=json',
		  function(data) {
		      // fetches the XML file from weather.gov
		      var x = new XMLHttpRequest();
		      var urll = "https://forecast.weather.gov/MapClick.php?lat="+LATITUDE+"&lon="+LONGITUDE+"&FcstType=digitalDWML";
		      x.open("GET", urll, true);
		      // execute once we get the data
		      x.onreadystatechange = function () {
			  if (x.readyState == 4 && x.status == 200) {
			      doc = x.responseXML;
			      var br = document.createElement("br");
			      weatherBox.appendChild(br);
			      var br = document.createElement("br");
			      weatherBox.appendChild(br);

			      // add the location name to the top
			      var centerName = data.location.areaDescription.toLowerCase();
			      var nameBox =  document.createElement("div");
			      nameBox.setAttribute('id', "areaDescriptionBox");
			      nameBox.setAttribute('style',"display: inline-block;");
			      var tmpCounter = 0;
			      for(var i = 0; i < centerName.length; i++) {
				  if((tmpCounter >= 9 && centerName.charAt(i)==' ') || (centerName.charAt(i)==',')) {
				      var brr = document.createElement("br");
				      nameBox.appendChild(brr);
				      tmpCounter=0;
				      if(centerName.charAt(i)==','){
					  i+=1;
				      }
				  } else {
				      var toAdd = document.createElement("img");
				      toAdd.setAttribute('id', "letter"+lCount);
				      lCount++;
				      letterArray.push(toAdd);
				      if(centerName == "M" || centerName =="" || centerName ==null || centerName == "NA") {
					  toAdd.setAttribute('src', "assets/weather/MISC/question/face.gif");
				      } else {
					  var toReplace = centerName.charAt(i);
					  if(centerName.charAt(i)=='/') {
					      toReplace = "slash";
					      var brr = document.createElement("br");
					      nameBox.appendChild(brr);
					  }
					  if(bw) {
					      toAdd.setAttribute('src', 'assets/weather/letters/'+toReplace+'_bw.gif');
					  } else {
					      toAdd.setAttribute('src', 'assets/weather/letters/'+toReplace+'.gif');
					  }
				      }
				      nameBox.appendChild(toAdd);
				  }
				  tmpCounter++;
			      }
			      weatherBox.appendChild(nameBox);

			      var toAdd = document.createElement("br");
			      weatherBox.appendChild(toAdd);

			      // add "Today" image
			      var toAdd = document.createElement("img");
			      toAdd.setAttribute('id', "today");
			      toAdd.setAttribute('src', "assets/weather/day/today/face.gif");
			      weatherBox.appendChild(toAdd);
			      weatherBox.appendChild(br);

			      // add the current observation location name
			      var curOb = data.currentobservation.name.toLowerCase();
			      var nameBox =  document.createElement("div");
			      nameBox.setAttribute('id', "currentObservationBox");
			      nameBox.setAttribute('style',"display: inline-block;");
			      tmpCounter = 0;
			      for(var i = 0; i < curOb.length; i++) {
				  if((tmpCounter >= 7 && curOb.charAt(i)==' ') || (curOb.charAt(i)==',')) {
				      var br = document.createElement("br");
				      nameBox.appendChild(br);
				      tmpCounter=0;
				      if(curOb.charAt(i)==','){
					  i+=1;
				      }
				  } else {
				      var toAdd = document.createElement("img");
				      toAdd.setAttribute('id', "letter"+lCount);
				      lCount++;
				      letterArray.push(toAdd);
				      //toAdd.className = "img-with-text-weather-letter";
				      if(centerName == "M" || centerName =="" || centerName ==null || centerName == "NA") {
					  toAdd.setAttribute('src', "assets/weather/MISC/question/face.gif");
				      } else {
					  var toReplace = curOb.charAt(i);
					  if(curOb.charAt(i)=='/') {
					      toReplace = "slash";
					      var brr = document.createElement("br");
					      nameBox.appendChild(brr);
					  }

					  if(bw) {
					      toAdd.setAttribute('src', 'assets/weather/letters/'+toReplace+'_bw.gif');
					  } else {
					      toAdd.setAttribute('src', 'assets/weather/letters/'+toReplace+'.gif');
					  }
				      }
				      nameBox.appendChild(toAdd);
				  }
				  tmpCounter++;
			      }
			      weatherBox.appendChild(nameBox);
			      var toAdd = document.createElement("br");
			      weatherBox.appendChild(toAdd);
			      var toAdd = document.createElement("br");
			      weatherBox.appendChild(toAdd);

			      var showDate = true;

			      var winds = data.currentobservation.Winds;
			      var windd = data.currentobservation.Windd;

			      // show the current conditions
			      helper(data.currentobservation.Temp, data.currentobservation.Relh ,data.currentobservation.Weather, showDate, data.currentobservation.Weather, winds, windd);
			      // break up the JSON data into separate vars
			      var tempArray = data.data.temperature;
			      var forecastArray = data.data.weather;
			      var precipArray = data.data.pop;
			      var text = data.data.text;
			      var counter = d.getDay();
			      var j = 0;
			      var afternoon = false;
			      var today = false;
			      var tonight = true;
			      LAST_DAY = forecastArray.length;

			      // special circumstances
			      if(data.time.startPeriodName[0]=="This Afternoon") {
				  helper(tempArray[j], precipArray[j], forecastArray[j], afternoon, text[j]);
				  j++;
				  afternoon = true;
			      }

			      if(data.time.startPeriodName[0]=="Today") {
				  today = true;
				  helper(tempArray[j], precipArray[j], forecastArray[j], today, text[j]);
				  j++;
			      }

			      // add the vertical legend
			      /*var text_vert = document.createElement('div');
				text_vert.className = 'text bar-text-vertical';
				for(var i = 100; i >= 10; i=i-10){
				var bar_text = document.createElement('div');
				bar_text.className = 'bar-text-vert';
				var strN = i.toString();
				for(var c = 0; c < strN.length; c++){
				var hour = document.createElement('img');
				hour.src="assets/weather/nums_cure/"+ strN[c]+".gif";
				bar_text.appendChild(hour);
				text_vert.appendChild(bar_text);
				}
				}
				var br = document.createElement('br');
				weatherBox.appendChild(br);
				weatherBox.appendChild(text_vert);
			      */
			      tmrw = true;
			      // special circumstances
			      if(data.time.startPeriodName[0]=="Tonight" ||
				 data.time.startPeriodName[1]=="Tonight") {
				  // add "Tonight" image
				  var toAdd = document.createElement("img");
				  toAdd.setAttribute('id', "tonight");
				  //toAdd.className = "img-with-text-weather";
				  toAdd.setAttribute('src', "assets/weather/day/tonight/face.gif");
				  weatherBox.appendChild(toAdd);
				  var br = document.createElement("br");
				  weatherBox.appendChild(br);
				  tonight = true;
				  helper(tempArray[j], precipArray[j], forecastArray[j], false, text[j]);
				  j++;
			      }

			      // reset the count and position if there is overnight information (so as to not double the current forecast w/ today's
			      if(data.time.startPeriodName[0]=="Overnight") {
				  var time = doc.getElementsByTagName("time-layout");
				  var startTimeT = time[0].childNodes[2].firstChild.nodeValue;
				  startTime = startTimeT.substring(startTimeT.indexOf('T')+1, startTimeT.indexOf(':'));
				  if(startTime != 23){
				      count = 2;
				      position = 0;
				      counter--;
				  } else {
				      //tmrw = false;
				  }
			      }

			      for(j; j < tempArray.length; j++) {
				  if(j==1 && tonight || (j==2 && tonight) && (afternoon || today)) {
				      var toAdd = document.createElement("hr");
				      weatherBox.appendChild(toAdd);

				      var toAdd = document.createElement("div");
				      toAdd.innerHTML = '(this space left blank)';
				      toAdd.setAttribute("style", 'visibility: hidden;');
				      weatherBox.appendChild(toAdd);
				      counter++;
				      if(counter==weekday.length) { counter =0;}
				      n = weekday[counter];
				  }
				  var br = document.createElement("br");
				  weatherBox.appendChild(br);
				  helper(tempArray[j], precipArray[j], forecastArray[j], showDate, text[j]);

				  if( (j == 0 && (!afternoon||!today)) ||
				      (j==1 && (afternoon||today))) {
				      var toAdd = document.createElement("hr");
				      weatherBox.appendChild(toAdd);

				      var toAdd = document.createElement("div");
				      toAdd.innerHTML = '(this space left blank)';
				      toAdd.setAttribute("style", 'visibility: hidden;');
				      weatherBox.appendChild(toAdd);
				  }

				  if(afternoon || today) {
				      if(j%2!=0) {
					  if(j >= 1) {
					      counter++;
					      if(counter==weekday.length) { counter =0;}
					      n = weekday[counter];
					      var toAdd = document.createElement("hr");
					      weatherBox.appendChild(toAdd);
					      var br = document.createElement("br");
					      weatherBox.appendChild(br);
					  }
					  showDate = true;
				      } else {
					  showDate = false;
				      }
				  }
				  else {
				      if(j%2==0) {
					  if(j >= 2) {
					      counter++;
					      if(counter==weekday.length) { counter =0;}
					      n = weekday[counter];
					      var toAdd = document.createElement("hr");
					      weatherBox.appendChild(toAdd);
					      var br = document.createElement("br");
					      weatherBox.appendChild(br);
					  }
					  showDate = true;
				      } else {
					  showDate = false;
				      }
				  }
			      }
			      var toAdd = document.createElement("hr");
			      weatherBox.appendChild(toAdd);
			      var lv = document.getElementById("lever");

			      function lvr() {
				  var getFavicon = function(){
				      var favicon = undefined;
				      var nodeList = document.getElementsByTagName("link");
				      for (var i = 0; i < nodeList.length; i++) {
					  if((nodeList[i].getAttribute("rel") == "icon")
					     ||(nodeList[i].getAttribute("rel") == "shortcut icon")){
					      favicon = nodeList[i];
					  }
				      }
				      return favicon;
				  }
				  var fav = getFavicon();

				  if(lv.src.indexOf("up") !== -1) {
				      fav.href = fav.getAttribute("href").substring(0, fav.getAttribute("href").lastIndexOf('.'))+"_bw.gif"
				      for(var i=0; i<piconArray.length;i++){
					  piconArray[i].src=piconArray[i].src.substring(0, piconArray[i].src.lastIndexOf('.'))+"_bw.gif";
				      }
				      for(var i=0; i<dayArray.length;i++){
					  dayArray[i].src=dayArray[i].src.substring(0, dayArray[i].src.lastIndexOf('.'))+"_bw.gif";
				      }
				      for(var i=0; i<thermArray.length;i++){
					  thermArray[i].src=thermArray[i].src.substring(0, thermArray[i].src.lastIndexOf('.'))+"_bw.gif";
				      }
				      for(var i=0; i<letterArray.length;i++){
					  letterArray[i].src=letterArray[i].src.substring(0, letterArray[i].src.lastIndexOf('.'))+"_bw.gif";
				      }
				      for(var i=0; i<windArray.length;i++){
					  windArray[i].src=windArray[i].src.substring(0, windArray[i].src.lastIndexOf('.'))+"_bw.gif";
				      }
				      for(var i=0; i<barPrecipArray.length;i++){
					  barPrecipArray[i].classList.add("bar-precip-bw");
				      }
				      for(var i=0; i<barTempArray.length;i++){
					  barTempArray[i].classList.add("bar-temp-bw");
				      }
				      for(var i=0; i<barHumidArray.length;i++){
					  barHumidArray[i].classList.add("bar-humid-bw");
				      }
				      for(var i=0; i<barDewArray.length;i++){
					  barDewArray[i].classList.add("bar-dewpoint-bw");
				      }
				      for(var i=0; i<barCloudArray.length;i++){
					  barCloudArray[i].classList.add("bar-cloud-bw");
				      }
				      for(var i=0; i<barWindGustArray.length;i++){
					  barWindGustArray[i].classList.add("bar-windgust-bw");
				      }
				  } else if (lv.src.indexOf("down") !== -1) {
				      fav.href = fav.getAttribute("href").substring(0, fav.getAttribute("href").lastIndexOf('_bw.gif'))+".gif";
				      for(var i=0; i<piconArray.length;i++){
					  piconArray[i].src=piconArray[i].src.substring(0, piconArray[i].src.lastIndexOf('_bw.gif'))+".gif";
				      }
				      for(var i=0; i<dayArray.length;i++){
					  dayArray[i].src=dayArray[i].src.substring(0, dayArray[i].src.lastIndexOf('_bw.gif'))+".gif";
				      }
				      for(var i=0; i<thermArray.length;i++){
					  thermArray[i].src=thermArray[i].src.substring(0, thermArray[i].src.lastIndexOf('_bw.gif'))+".gif";
				      }
				      for(var i=0; i<letterArray.length;i++){
					  letterArray[i].src=letterArray[i].src.substring(0, letterArray[i].src.lastIndexOf('_bw.gif'))+".gif";
				      }
				      for(var i=0; i<windArray.length;i++){
					  windArray[i].src=windArray[i].src.substring(0, windArray[i].src.lastIndexOf('_bw.gif'))+".gif";
				      }
				      for(var i=0; i<barPrecipArray.length;i++){
					  barPrecipArray[i].classList.remove("bar-precip-bw");
				      }
				      for(var i=0; i<barTempArray.length;i++){
					  barTempArray[i].classList.remove("bar-temp-bw");
				      }
				      for(var i=0; i<barHumidArray.length;i++){
					  barHumidArray[i].classList.remove("bar-humid-bw");
				      }
				      for(var i=0; i<barDewArray.length;i++){
					  barDewArray[i].classList.remove("bar-dewpoint-bw");
				      }
				      for(var i=0; i<barCloudArray.length;i++){
					  barCloudArray[i].classList.remove("bar-cloud-bw");
				      }
				      for(var i=0; i<barWindGustArray.length;i++){
					  barWindGustArray[i].classList.remove("bar-windgust-bw");
				      }
				  }
			      }
			      if(!lvrInit) {
				  lv.addEventListener('click', lvr, false);
				  lvrInit = true;
			      }
			  }
		      };
		      x.send(null);
		      var wbox = document.getElementById("weatherBox")
		      wbox.style.width=wbox.offsetWidth;
		      wbox.width=wbox.offsetWidth;
		  }
		 );
}
// standard function to add general information for the rest of the week (next six days)
function helper(curTemp, precip, forecast, showDate, text, winds, windd) {
    var weatherPath = 0;
    var tableBox = document.createElement("div");
    tableBox.className = "image-weather-table";

    var toAdd = document.createElement("img");
    var dayBox = document.createElement("div");
    dayBox.className =	"image-weather-table";
    toAdd.setAttribute('id', "day"+dCount);
    dCount++;
    dayArray.push(toAdd);
    toAdd.className = "image-weather-table";
    if(bw){
	toAdd.setAttribute('src', "assets/weather/day/"+n+"/face_bw.gif");
    } else {
	toAdd.setAttribute('src', "assets/weather/day/"+n+"/face.gif");
    }
    var d = new Date();
    // http://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
    var monthNames = ["January", "February", "March",
		      "April", "May", "June", "July",
		      "August", "September", "October",
		      "November", "December"];
    d.setDate(d.getDate() + odCount);
    d = weekd[d.getDay()] + " " + monthNames[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
    toAdd.setAttribute('title',d);

    if(!showDate) {
	//if(n==weekday[d.getDay()] && !hasShownMoon) {
	if(text.toLowerCase().includes("cloudy")) {
	    if(bw){
		toAdd.setAttribute('src', "assets/weather/sky/partlymoonny/face_bw.gif");
	    } else {
		toAdd.setAttribute('src', "assets/weather/sky/partlymoonny/face.gif");
	    }
	} else {
	    if(bw){
		toAdd.setAttribute('src', "assets/weather/sky/moonny/face_bw.gif");
	    } else {
		toAdd.setAttribute('src', "assets/weather/sky/moonny/face.gif");
	    }
	}
	/*hasShownMoon = true;
	  } else {
	  toAdd.style.visibility = 'hidden';
	  }*/
	odCount++;
    }
    dayBox.appendChild(toAdd);
    weatherBox.appendChild(dayBox);

    // test
    //var reg = "(south(?:west|east)?|north(?:west|east)?|east|west)*? wind(?:.* mph)*";
    var reg = "(?:calm wind becoming )*(south(?:west|east)?|north(?:west|east)?|east|west)+? (?:wind|around)(?:.* mph)*";
    matches = text.toLowerCase().match(reg);
    if(matches) {
	var toAdd = document.createElement("img");
	toAdd.setAttribute('id', "wind"+dCount);
	toAdd.className = "image-weather-block";
	toAdd.setAttribute('style', "margin: 0 auto;");
	toAdd.setAttribute('title', matches[0]);
	if(bw){
	    toAdd.setAttribute('src', "assets/weather/wind/"+matches[1]+"/face_bw.gif");
	} else {
	    toAdd.setAttribute('src', "assets/weather/wind/"+matches[1]+"/face.gif");
	}
	windArray.push(toAdd);
	dayBox.appendChild(toAdd);
    } else if (winds || windd) {
	var toAdd = document.createElement("img");
	toAdd.setAttribute('id', "wind"+dCount);
	toAdd.className = "image-weather-block";
	toAdd.setAttribute('style', "margin: 0 auto;");
	toAdd.setAttribute('title', winds + " mph " + windd + "°");
	if(bw) {
	    if(windd >= 337.5 || windd < 22.5) {
		toAdd.setAttribute('src', "assets/weather/wind/north/face_bw.gif");
	    } else if (windd >= 22.5 && windd < 67.5) {
		toAdd.setAttribute('src', "assets/weather/wind/northeast/face_bw.gif");
	    } else if (windd >= 67.5 && windd < 112.5) {
		toAdd.setAttribute('src', "assets/weather/wind/east/face_bw.gif");
	    } else if (windd >= 112.5 && windd < 157.5) {
		toAdd.setAttribute('src', "assets/weather/wind/southeast/face_bw.gif");
	    } else if (windd >= 157.5  && windd < 202.5) {
		toAdd.setAttribute('src', "assets/weather/wind/south/face_bw.gif");
	    } else if (windd >= 202.5 && windd < 247.5) {
		toAdd.setAttribute('src', "assets/weather/wind/southwest/face_bw.gif");
	    } else if (windd >= 247.5 && windd < 292.5) {
		toAdd.setAttribute('src', "assets/weather/wind/west/face_bw.gif");
	    } else if (windd >= 292.5 && windd < 337.5) {
		toAdd.setAttribute('src', "assets/weather/wind/northwest/face_bw.gif");
	    }
	} else {
	    if(windd >= 337.5 || windd < 22.5) {
		toAdd.setAttribute('src', "assets/weather/wind/north/face.gif");
	    } else if (windd >= 22.5 && windd < 67.5) {
		toAdd.setAttribute('src', "assets/weather/wind/northeast/face.gif");
	    } else if (windd >= 67.5 && windd < 112.5) {
		toAdd.setAttribute('src', "assets/weather/wind/east/face.gif");
	    } else if (windd >= 112.5 && windd < 157.5) {
		toAdd.setAttribute('src', "assets/weather/wind/southeast/face.gif");
	    } else if (windd >= 157.5  && windd < 202.5) {
		toAdd.setAttribute('src', "assets/weather/wind/south/face.gif");
	    } else if (windd >= 202.5 && windd < 247.5) {
		toAdd.setAttribute('src', "assets/weather/wind/southwest/face.gif");
	    } else if (windd >= 247.5 && windd < 292.5) {
		toAdd.setAttribute('src', "assets/weather/wind/west/face.gif");
	    } else if (windd >= 292.5 && windd < 337.5) {
		toAdd.setAttribute('src', "assets/weather/wind/northwest/face.gif");
	    }
	}
	windArray.push(toAdd);
	dayBox.appendChild(toAdd);
    }
    // test

    var tempBox = document.createElement("div");
    tempBox.className = "image-weather-table";
    tempBox.setAttribute('id', "tempBox");

    var eworldBox =  document.createElement("div");
    eworldBox.className = "image-weather-table";
    eworldBox.setAttribute('id', "eWorldBox");
    eworldBox.setAttribute('style',"display: inline-block;");

    for(var i = 0; i < curTemp.length; i++) {
	var toAdd = document.createElement("img");
	toAdd.setAttribute('id', "temp"+i);
	toAdd.className = "image-weather-letter";
	if(curTemp == "M" || curTemp =="" || curTemp ==null || curTemp == "NA") {
	    toAdd.setAttribute('src', "assets/weather/MISC/question/face.gif");
	} else {
	    toAdd.setAttribute('src', 'assets/weather/nums/'+curTemp.charAt(i)+'.gif');
	}
	eworldBox.appendChild(toAdd);
    }
    var toAdd = document.createElement("img");
    toAdd.setAttribute('id', "tempDegree");
    toAdd.className = "image-weather-letter";
    toAdd.setAttribute('src', 'assets/weather/nums/degree.gif');
    eworldBox.appendChild(toAdd);

    var toAdd = document.createElement("img");
    toAdd.setAttribute('id', "tempDegree");
    toAdd.className = "image-weather-letter";
    toAdd.setAttribute('src', 'assets/weather/nums/f.gif');
    eworldBox.appendChild(toAdd);
    tempBox.appendChild(eworldBox);

    /***** OLD PRECIP ******/

    if(curTemp != 'M' && curTemp != "" && curTemp != null && curTemp != "NA") {
	weatherPath = curTemp;
	while(weatherPath%5 != 0) { weatherPath--; } // decrement the value to a valid picon therm
	if(weatherPath<100 && weatherPath>=0) {
	    if(weatherPath < 10) {
		weatherPath = "p00" + weatherPath;
	    } else {
		weatherPath = "p0" + weatherPath;
	    }
	}
	if(weatherPath < 0) {
	    weatherPath = weatherPath * -1;
	    weatherPath = "m0" + weatherPath;
	}
	if(weatherPath >= 100){
	    if(weatherPath >= 110) {
		weatherPath = "p110";
	    } else {
		weatherPath = "p" + weatherPath;
	    }
	}
    }

    var thermBox = document.createElement("div");
    thermBox.className = "image-weather-block";
    thermBox.setAttribute('id', "thermBox");
    var toAdd = document.createElement("img");
    toAdd.setAttribute('id', "therm"+tCount);
    tCount++;
    thermArray.push(toAdd);
    toAdd.className = "image-weather-block";
    if(curTemp == "M" || curTemp =="" || curTemp ==null || curTemp == "NA") {
	if(bw){
	    toAdd.setAttribute('src', "assets/weather/MISC/question/face_bw.gif");
	} else {
	    toAdd.setAttribute('src', "assets/weather/MISC/question/face.gif");
	}

    } else {
	if(bw){
	    toAdd.setAttribute('src', "assets/weather/temp2/" + weatherPath + "/face_bw.gif");
	} else {
	    toAdd.setAttribute('src', "assets/weather/temp2/" + weatherPath + "/face.gif");
	}

    }
    if(firstRun) {
	var link = document.createElement('link');
	link.type = 'image/x-icon';
	link.rel = 'icon';
	if(bw) {
	    link.href = ('assets/weather/temp/' + weatherPath + '/face_bw.gif');
	} else {
	    link.href = ('assets/weather/temp/' + weatherPath + '/face.gif');
	}
	document.getElementsByTagName('head')[0].appendChild(link);
	firstRun = false;
	firstRunDay = n;
    }

    thermBox.appendChild(toAdd);
    tempBox.appendChild(thermBox);
    weatherBox.appendChild(tempBox);

    var tableBox = document.createElement("div");
    tableBox.className = "image-weather-table";

    if(forecast.includes("then")) {
	var firstForecast = forecast.substring(0, forecast.indexOf("then")-1);
	var secondForecast = forecast.substring(forecast.indexOf("then")+5, forecast.length);

	var toAdd = document.createElement("img");
	toAdd.setAttribute('id', "picon"+pCount);
	pCount++;
	piconArray.push(toAdd);
	toAdd.setAttribute('title', text);
	toAdd.onclick=function(){this.setAttribute('title', firstForecast);};
	//toAdd.setAttribute('title', firstForecast);
	toAdd.className = "image-weather-table";
	var pth = computeImage(firstForecast);
	if(pth == true) {
	    if(bw){
		toAdd.setAttribute('src', "assets/weather/MISC/question/face_bw.gif");
	    } else {
		toAdd.setAttribute('src', "assets/weather/MISC/question/face.gif");
	    }
	} else {
	    if(bw) {
		toAdd.setAttribute('src', "assets/weather/sky/"+pth+"/face_bw.gif");
	    } else {
		toAdd.setAttribute('src', "assets/weather/sky/"+pth+"/face.gif");
	    }
	}

	tableBox.appendChild(toAdd);
	weatherBox.appendChild(tableBox);

	/*NEW PRECIP*/
	if(precip != null) {
	    var br = document.createElement("br");
	    var precipBox =  document.createElement("div");
	    precipBox.className = "image-weather-table";
	    precipBox.setAttribute('id', "precipBox");
	    precipBox.setAttribute('style',"display: block; padding-top:5px;");

	    for(var i = 0; i < precip.length; i++) {
		var toAdd = document.createElement("img");
		toAdd.setAttribute('id', "precip"+i);
		toAdd.className = "image-weather-letter";
		if(curTemp == "M" || curTemp =="" || precip=="NA") {
		    toAdd.setAttribute('src', "assets/weather/MISC/question/face.gif");
		    precipBox.appendChild(toAdd);
		    break;
		} else {
		    toAdd.setAttribute('src', 'assets/weather/nums/'+precip.charAt(i)+'.gif');
		}
		precipBox.appendChild(toAdd);
	    }
	    if(curTemp != "M" && curTemp !="" && precip!="NA") {
		var toAdd = document.createElement("img");
		toAdd.setAttribute('id', "percent");
		toAdd.className = "image-weather-letter";
		toAdd.setAttribute('src', 'assets/weather/nums/percent.gif');
		precipBox.appendChild(toAdd);
	    }
	    tableBox.appendChild(precipBox);
	}

	var tableBox = document.createElement("div");
	tableBox.className = "image-weather-table";
	var toAdd = document.createElement("img");
	toAdd.setAttribute('id', "picon"+pCount);
	pCount++;
	piconArray.push(toAdd);
	toAdd.setAttribute('title', text);
	toAdd.onclick=function(){this.setAttribute('title', secondForecast);};
	toAdd.className = "image-weather-table";
	var pth = computeImage(secondForecast);
	if(pth == true) {
	    if(bw){
		toAdd.setAttribute('src', "assets/weather/MISC/question/face_bw.gif");
	    } else {
		toAdd.setAttribute('src', "assets/weather/MISC/question/face.gif");
	    }
	} else {
	    if(bw){
		toAdd.setAttribute('src', "assets/weather/sky/"+pth+"/face_bw.gif");
	    } else {
		toAdd.setAttribute('src', "assets/weather/sky/"+pth+"/face.gif");
	    }
	}
	tableBox.appendChild(toAdd);
	weatherBox.appendChild(tableBox);
    } else {
	var toAdd = document.createElement("img");
	toAdd.setAttribute('id', "picon"+pCount);
	pCount++;
	piconArray.push(toAdd);
	toAdd.setAttribute('title', text);
	toAdd.onclick=function(){this.setAttribute('title', forecast);};
	toAdd.className = "image-weather-table";
	var pth = computeImage(forecast);
	if(pth == true) {
	    if(bw){
		toAdd.setAttribute('src', "assets/weather/MISC/question/face_bw.gif");
	    } else {
		toAdd.setAttribute('src', "assets/weather/MISC/question/face.gif");
	    }
	} else {
	    if(bw){
		toAdd.setAttribute('src', "assets/weather/sky/"+pth+"/face_bw.gif");
	    } else {
		toAdd.setAttribute('src', "assets/weather/sky/"+pth+"/face.gif");
	    }
	}

	tableBox.appendChild(toAdd);
	weatherBox.appendChild(tableBox);

	/*NEWPRECIP*/
	if(precip != null) {
	    var br = document.createElement("br");
	    var precipBox =  document.createElement("div");
	    precipBox.className = "image-weather-table";
	    precipBox.setAttribute('id', "precipBox");
	    precipBox.setAttribute('style',"display: block; padding-top:5px;");

	    for(var i = 0; i < precip.length; i++) {
		var toAdd = document.createElement("img");
		toAdd.setAttribute('id', "precip"+i);
		toAdd.className = "image-weather-letter";
		if(curTemp == "M" || curTemp =="" || precip=="NA") {
		    toAdd.setAttribute('src', "assets/weather/MISC/question/face.gif");
		    precipBox.appendChild(toAdd);
		    break;
		} else {
		    toAdd.setAttribute('src', 'assets/weather/nums/'+precip.charAt(i)+'.gif');
		}

		precipBox.appendChild(toAdd);
	    }
	    if(curTemp != "M" && curTemp !="" && precip!="NA") {
		var addPercent = document.createElement("img");
		addPercent.setAttribute('id', "percent");
		addPercent.className = "image-weather-letter";
		addPercent.setAttribute('src', 'assets/weather/nums/percent.gif');
		precipBox.appendChild(addPercent);
	    }
	    tableBox.appendChild(precipBox);
	}
    }

    var br = document.createElement("br");
    weatherBox.appendChild(br);
    var d = new Date();
    //alert("Last day: " + LAST_DAY + " dCount: " + dCount);
    //if(tmrw && !showDate || ((dCount == LAST_DAY || dCount == LAST_DAY+1) && d.getHours() != 0)){
    if((!showDate && tmrw) || ((dCount == LAST_DAY || dCount == LAST_DAY+1) && d.getHours() != 0)){
	var precipProb = doc.getElementsByTagName("probability-of-precipitation");
	var time =  doc.getElementsByTagName("time-layout");
	var weatherProb =  doc.getElementsByTagName("weather");
	var tempProb = doc.querySelectorAll('[type=hourly]');
	var windChillProb = doc.querySelectorAll('[type*=chill]');
	var dewPointProb = doc.querySelectorAll('[type*=dew]');
	var windGustProb = doc.querySelectorAll('[type*=gust]');
	var humidityProb =  doc.getElementsByTagName("humidity");
	var cloudProb =	 doc.getElementsByTagName("cloud-amount");

	var graph = document.createElement('div');
	graph.id = 'graph'+gCount;
	gCount++;
	graph.className = 'graph';

	var baseline = document.createElement('div');
	baseline.id = 'baseline'+gCount;
	baseline.className = 'baseline';

	/*var bar = document.createElement('div');
	  bar.className = 'bar bar-precip bar-hidden';
	  bar.setAttribute("style","height:"+"50px;")
	  graph.appendChild(bar);*/

	var graph2 = document.createElement('div');
	graph2.id = 'graph'+gCount;
	gCount++;
	graph2.className = 'graph';

	var baseline2 = document.createElement('div');
	baseline2.id = 'baseline'+gCount;
	baseline2.className = 'baseline';

	/*var bar = document.createElement('div');
	  bar.className = 'bar bar-precip bar-hidden';
	  bar.setAttribute("style","height:"+"50px;")
	  graph2.appendChild(bar);*/

	var time =  doc.getElementsByTagName("time-layout");
	var tCount = 0;
	for (var i = position; i < weatherProb[0].childNodes.length; i++) {
	    var cur =  weatherProb[0].childNodes[i].childNodes[0];
	    if(i==0){
		var startTimeT = time[0].childNodes[count].firstChild.nodeValue;
		startTime = startTimeT.substring(startTimeT.indexOf('T')+1, startTimeT.indexOf(':'));
	    }
	    var curTime = time[0].childNodes[count].firstChild.nodeValue;
	    var simpTime = curTime.substring(curTime.indexOf('T')+1, curTime.indexOf(':'));

	    var bar = document.createElement('div');

	    bar.className = 'bar bar-precip';
	    if(bw) {
		bar.classList.add("bar-precip-bw");
	    }

	    bar.id = 'bar'+bCount;
	    bCount++;
	    barPrecipArray.push(bar);
	    bar.setAttribute("style","height:"+(precipProb[0].childNodes[i].textContent/2)+"px;")
	    if(!precipProb[0].childNodes[i].textContent){
		bar.setAttribute("style","visibility: hidden");
	    }
	    baseline.appendChild(bar);
	    var fCast = '';
	    if(cur != undefined){
		fCast = cur.getAttribute("coverage") + " " + cur.getAttribute("weather-type");
	    }
	    bar.setAttribute('title', precipProb[0].childNodes[i].textContent+"% " + fCast);
	    if(fCast.indexOf("snow") !== -1){
		bar.classList.add("bar-precip-snow");
	    } else if (fCast.indexOf("freezing rain") !== -1) {
		bar.classList.add("bar-precip-freezing");
	    }

	    var bar = document.createElement('div');
	    bar.className = 'bar bar-temp';
	    if(bw) {
		bar.classList.add("bar-temp-bw");
	    }
	    bar.id = 'bar'+bCount;
	    bCount++;
	    barTempArray.push(bar);
	    bar.setAttribute("style","height:"+(tempProb[0].childNodes[i].textContent/2)+"px;");
	    if(!tempProb[0].childNodes[i].textContent){
		bar.setAttribute("style","visibility: hidden");
	    }
	    baseline.appendChild(bar);
	    bar.setAttribute('title', tempProb[0].childNodes[i].textContent+"F");

	    if(windChillProb[0]) { // for obvious reasons, this is only enabled during the fall and winter seasons
		//alert("wind chill!");
		var subBar = document.createElement('div');
		subBar.className = 'bar bar-windchill';
		if(bw) {
		    subBar.classList.add("bar-windchill-bw");
		}
		subBar.id = 'bar'+bCount;
		bCount++;
		barTempArray.push(subBar);
		subBar.setAttribute("style","height:"+(windChillProb[0].childNodes[i].textContent/2)+"px;");
		if(!windChillProb[0].childNodes[i].textContent) {
		    subBar.setAttribute("style","visibility: hidden");
		}
		bar.appendChild(subBar);
		subBar.setAttribute('title', "Wind Chill: " + windChillProb[0].childNodes[i].textContent+"F");
	    }

	    var bar = document.createElement('div');
	    bar.className = 'bar bar-humidity';
	    if(bw) {
		bar.classList.add("bar-humid-bw");
	    }
	    bar.id = 'bar'+bCount;
	    bCount++;
	    barHumidArray.push(bar);
	    bar.setAttribute("style","height:"+(humidityProb[0].childNodes[i].textContent/2)+"px;");
	    if(!humidityProb[0].childNodes[i].textContent){
		bar.setAttribute("style","visibility: hidden");
	    }
	    baseline2.appendChild(bar);
	    bar.setAttribute('title', "Humidity: " + humidityProb[0].childNodes[i].textContent+"%");

	    var subBar = document.createElement('div');
	    subBar.className = 'bar bar-dewpoint';
	    if(bw) {
		subBar.classList.add("bar-dewpoint-bw");
	    }
	    subBar.id = 'bar'+bCount;
	    bCount++;
	    barDewArray.push(subBar);
	    subBar.setAttribute("style","height:"+(dewPointProb[0].childNodes[i].textContent/2)+"px;");
	    if(!dewPointProb[0].childNodes[i].textContent) {
		subBar.setAttribute("style","visibility: hidden");
	    }
	    bar.appendChild(subBar);
	    subBar.setAttribute('title', "Dew Point: " + dewPointProb[0].childNodes[i].textContent+"F");

	    var bar = document.createElement('div');
	    bar.className = 'bar bar-cloud';
	    if(bw) {
		bar.classList.add("bar-cloud-bw");
	    }
	    bar.id = 'bar'+bCount;
	    bCount++;
	    barCloudArray.push(bar);
	    bar.setAttribute("style","height:"+(cloudProb[0].childNodes[i].textContent/2)+"px;");
	    if(!cloudProb[0].childNodes[i].textContent){
		bar.setAttribute("style","visibility: hidden");
	    }
	    baseline2.appendChild(bar);
	    bar.setAttribute('title', "Cloud Cover: " + cloudProb[0].childNodes[i].textContent+"%");

	    var subBar = document.createElement('div');
	    subBar.className = 'bar bar-windgust';
	    if(bw) {
		subBar.classList.add("bar-windgust-bw");
	    }
	    subBar.id = 'bar'+bCount;
	    bCount++;
	    barWindGustArray.push(subBar);
	    subBar.setAttribute("style","height:"+(windGustProb[0].childNodes[i].textContent/2)+"px;");
	    if(!windGustProb[0].childNodes[i].textContent) {
		subBar.setAttribute("style","visibility: hidden");
	    }
	    bar.appendChild(subBar);
	    subBar.setAttribute('title', "Wind Gust: " + windGustProb[0].childNodes[i].textContent+"MPH");

	    count += 4;
	    tCount++;
	    if(simpTime == 23) { position = i+1; break;}
	}
	graph.appendChild(baseline);
	graph2.appendChild(baseline2);
	weatherBox.appendChild(graph);
	weatherBox.appendChild(graph2);

	var textt = document.createElement('div');
	textt.className = 'text';

	for(var i = startTime; i < (Number(startTime) + tCount); i++){
	    var bar_text = document.createElement('div');
	    bar_text.className = 'bar-text';
	    if(i > 12) {
		bar_text.setAttribute('title', i-12 + " pm");
	    }
	    var strN = i.toString();
	    for(var j = 0; j < strN.length; j++){
		var hour = document.createElement('img');
		hour.src="assets/weather/nums_cure/"+ strN[j]+".gif";
		bar_text.appendChild(hour);
		textt.appendChild(bar_text);
	    }
	}
	if(dCount == LAST_DAY+1){
	    //graph.className += ' graphLeft';
	    //graph2.className += ' graphLeft';
	    baseline.className += ' baselineLeft';
	    baseline2.className += ' baselineLeft';
	    textt.className += ' textLeft';
	}
	weatherBox.appendChild(textt);
	startTime = 0;
    }
}

if((tLat != null) &&
   (tLong != null)) {
    LATITUDE = tLat;
    LONGITUDE = tLong;
    weather();
    setInterval(weather, 1800000);
} else {
    // first, we try to get the location by HTML5 geolocation
    if ("geolocation" in navigator) {
	navigator.geolocation.getCurrentPosition(
	    function(position) {
		LATITUDE = position.coords.latitude;
		LONGITUDE = position.coords.longitude;
		window.localStorage.setItem("latitude", LATITUDE);
		window.localStorage.setItem("longitude", LONGITUDE);
		weather();
		setInterval(weather, 3600000);
	    }/*,
	    function (error) { // if not, just load the weather w/ default lat & long
		if (error.code == error.PERMISSION_DENIED) {
		    geocoder.geocode( { 'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
			    LATITUDE = results[0].geometry.location.lat();
			    LONGITUDE = results[0].geometry.location.lng();
			    weather();
			    setInterval(weather, 1800000);
			}
		    });
		}
	    }*/);
    } else {
	/*geocoder.geocode( { 'address': address}, function(results, status) {
	    if (status == google.maps.GeocoderStatus.OK) {
		LATITUDE = results[0].geometry.location.lat();
		LONGITUDE = results[0].geometry.location.lng();
		weather(); // if no geolocation, just load the weather stuff on pageload
		setInterval(weather, 1800000);
	    }
	});*/
    }
    /*
      forecast.weather.gov/zipcity.php?inputstring=Gettysburg,+PA
      http://forecast.weather.gov/MapClick.php?CityName=Gettysburg&state=PA
     */
}

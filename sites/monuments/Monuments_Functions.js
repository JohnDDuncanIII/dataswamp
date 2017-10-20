/**  
  * File Name: Monuments_Onload.js
  * Author:    Charles Kann and John Duncan
  * Date:      May 28, 2015
  * Purpose:   To define all of the functions that are used in the web-page
  *            
  *
  * Change Log: May 28. 2015 - Initial release
  *             July 24th - Many changes, including new map styles, 
  *             a new selected icon layer, hidden elements on select, and a few other bugfixes
  * Index: Define elements that make up pop-up
  *        Create the overlay for the pop-up
  *        Define function to handle closer onclick

*/
/**
 * Change the icon style to the selected style. 
 * First style is simple circles, while the second is more detailed for 
 *      each individual type of monument.
 */
function changeIconStyle() {
    if (document.mapForm.iconStyle[0].checked) {
        //change all the icons to the default style
        saveVector.getSource().forEachFeature( function(feature) {
        feature.setStyle(defaultStyle);
        return false;
    });
    
    if (copyVector != saveVector) {
        copyVector.forEachFeature( function(feature) {
        feature.setStyle(defaultStyle);
        return false;
      });
    }
  }

  else {
     if (defaultStyle == null) {
        saveVector.getSource().forEachFeature(function(feature) {
            defaultStyel = feature.getStyle();
            return true;
        });
    }
    
    //change all the icons to the selected style
    saveVector.getSource().forEachFeature( function(feature) {
        if (feature.get("icon") != -1 && feature.get("icon") != "NA") {
            feature.setStyle(style_1[eval(feature.get("icon"))]);
            return false;
        }
    });
    
    if (copyVector != saveVector) {
        copyVector.getSource().forEachFeature( function(feature) {
            if (feature.get("icon") != -1) {
                feature.setStyle(style_1[eval(feature.get("icon"))]);
                return false;
            }
        });
    }
  } 
}
/**
 * Change the map style to the selected style.
 * First style is a google-like street map, 
 *      while the second is bing's sattelite maps.
 */
function changeMap() {
	map.removeLayer(pictureLayer);
    map.removeLayer(raster);
    map.removeLayer(satellite);
    map.removeLayer(copyVector);
    map.removeLayer(selectedVector);
    
    if (document.mapForm.switchMap[0].checked) {
        pictureLayer.setOpacity(.55);
        map.addLayer(raster)
        map.addLayer(pictureLayer);
 
    }
    
    else if (document.mapForm.switchMap[1].checked) {
        pictureLayer.setOpacity(.40);
    	map.addLayer(satellite)
        map.addLayer(pictureLayer);
    }

    else if(document.mapForm.switchMap[2].checked) {
        pictureLayer.setOpacity(1.0)
        map.addLayer(pictureLayer);
    }
    
    else if(document.mapForm.switchMap[3].checked) {  // (document.mapForm.switchMap[3].checked) 
        map.addLayer(raster);
    }
    else if(document.mapForm.switchMap[4].checked) {  // (document.mapForm.switchMap[3].checked) 
    	map.addLayer(offlineLayer);
    }
    else {
    	map.addLayer(offlineLayer);
    	pictureLayer.setOpacity(.30);
    	map.addLayer(pictureLayer);
    }
    
     
    map.addLayer(copyVector);
    map.addLayer(selectedVector);
}

function selectMonuments() {
    // set the unique id for each feature.  For some reason I have to do this in a call
    // back.  I figure this is the only place I use the feature id, so I would do it here
    // once.  This really needs to be looked at.
    if (firstTime)
    {
        firstTime = false;
        var uniqueId=100;
        copyVector.getSource().forEachFeature( 
            function(feature){
                feature.setId(uniqueId);
                uniqueId = uniqueId + 1;
                return false;
            });
    }
    
    // clean out the shownMonuments select box.
    var showSelect = document.getElementById("shownMonuments");
    var size = showSelect.length;
    for (i = 0; i < size; i++) {
        showSelect.remove(0);
    }
    
    // clear out any left over overlay
    overlay.setPosition(undefined); // remove old overlay
    
    // Clean out any left over selected features.
    if (saveFeature != null) {
       saveFeature = null;
       selectedVector.getSource().clear();
    }
      
    // take the current vector off the map,
    // and make a new one to put in its place.  
    map.removeLayer(copyVector);
    map.removeLayer(selectedVector);
    

    copyVector = new ol.layer.Vector({
        source: new ol.source.Vector({
        })
    });
      
    // saveVector always has all features.  
    // Pull the features off the save vector,
    // and put them on the new vector and on
    // the shown vector list.
    var features = saveVector.getSource().getFeatures();
    
    // 7/20/15 fix ALL selection of states/monument types on the map ;)
    
    // handle showing ALL monuments of all types
	if (document.mapForm.selState.value == "NA" &&  document.mapForm.selType.value == "AL") {
		for (i = 0; i < features.length; i++) {
			copyVector.getSource().addFeature(features[i]);
            var option = document.createElement("option");
            option.text = features[i].get("name");
            option.value=features[i].getId();
            showSelect.add(option);
		}
	}

	// handle showing the selected monuments of ALL states
    if (document.mapForm.selState.value == "NA" ) {
		for (i = 0; i < features.length; i++) {
    	if (features[i].get("mon_type") == document.mapForm.selType.value) {
        		copyVector.getSource().addFeature(features[i]);
                var option = document.createElement("option");
                option.text = features[i].get("name");
                option.value=features[i].getId();
                showSelect.add(option);
            }
        }
    } 

    // handle showing the ALL monuments of the selected state
    if(document.mapForm.selType.value == "AL") {
    	for (i = 0; i < features.length; i++) {
    	if (features[i].get("state") == document.mapForm.selState.value) {
                copyVector.getSource().addFeature(features[i]);
                var option = document.createElement("option");
                option.text = features[i].get("name");
                option.value=features[i].getId();
                showSelect.add(option);
            }
        }
    }
    // handle a specific states for a specific type of monument
    else {
        for (i = 0; i < features.length; i++) {
            if (features[i].get("state") == document.mapForm.selState.value 
            	&& features[i].get("mon_type") == document.mapForm.selType.value) {
                copyVector.getSource().addFeature(features[i]);
                var option = document.createElement("option");
                option.text = features[i].get("name");
                option.value=features[i].getId();
                showSelect.add(option);
            }
        }   
    }
  
    map.addLayer(copyVector);

    //SELECTED ON TOP
    map.addLayer(selectedVector);
}

function showMonument() {
    // if there was a previous saveFeature, restore it
    // then set it so that there is no saveFeature.
    if (saveFeature != null) {
       saveFeature = null;
       selectedVector.getSource().clear();
    }
    
    overlay.setPosition(undefined); // remove old overlay
 	var divsToHide = document.getElementsByClassName("optionPane");
    
    for (var i = 0; i < divsToHide.length; i++) {
    	divsToHide[i].style.display="none";
    }

    var shOp = document.getElementsByClassName("showOptions");
    shOp[0].style.display="block";
    
    var e = document.getElementById("shownMonuments");
    saveFeature = copyVector.getSource().getFeatureById(e.options[e.selectedIndex].value);
    thisCoordinate = saveFeature.getGeometry().getCoordinates();
    map.getView().setCenter(thisCoordinate);


    var insertFeature = new ol.Feature({
        geometry: saveFeature.getGeometry(),
        labelPoint: new ol.geom.Point(saveFeature.getGeometry().getCoordinates()),
        id: 0,
        name: saveFeature.get("name"),
        picture: saveFeature.get("picture")
    });
    insertFeature.setStyle(style_1[0]);
    selectedVector.getSource().addFeature(insertFeature);    
}

function showOptions() {
    var divsToShow = document.getElementsByClassName("optionPane");
    for (var i = 0; i < divsToShow.length; i++) {
    	divsToShow[i].style.display="block";
    }
    var shOp = document.getElementsByClassName("showOptions");
    shOp[0].style.display="none";
}
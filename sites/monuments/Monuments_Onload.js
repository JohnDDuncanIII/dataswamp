/**  
  * File Name: Monuments_Onload.js
  * Author:    Charles Kann and John Duncan
  * Date:      May 28, 2015
  * Purpose:   To define all of the variables which need to 
  *            to be instantiated for the application to work.
  *
  * Change Log: May 28. 2015 - Initial release
  *             July 24. 2015 - Resize icons for different zoom levels
  *                             Add selected layer for monument selection
  *                             Add more maps and icon types
  *
  * Index: Define elements that make up pop-up
  *        Create the overlay for the pop-up
  *        Define function to handle closer onclick

*/
/**
 * Elements that make up the popup.
 */
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');


/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function() {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};


/**
 * Create an overlay to anchor the popup to the map.
 */
var overlay = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250
  }
}));

/**
  * Initial raster and/or satellite - tiles which make up map picture
*/
/*
raster = new ol.layer.Tile({
	source: new ol.source.OSM({
		url: 'http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png' // (remove the spaces in http)
	}) 
});
*/

raster = new ol.layer.Tile({
	  source: new ol.source.OSM()
	});

satellite = new ol.layer.Tile({
    source: new ol.source.MapQuest({layer: 'sat'}),
});

var projection = new ol.proj.Projection({
  code: 'xkcd-image',
  units: 'pixels',
  extent: ol.proj.transformExtent([-77.27378, 39.770, -77.2539, 39.8578],  'EPSG:4326', 'EPSG:3857')
});

// added old map 7/20/15
pictureLayer = new ol.layer.Image({
      source: new ol.source.ImageStatic({
        url: 'GNMP_map_1921.jpg',
        projection: projection,
        imageExtent: ol.proj.transformExtent([-77.27378, 39.770, -77.2539, 39.85787],  'EPSG:4326', 'EPSG:3857'),
      }),
      opacity: 0.55
    })
console.error(document.location.pathname);

offlineLayer = new ol.layer.Image({
    source: new ol.source.ImageStatic({
      url: 'Gettysburg_Map.png',
      projection: projection,
      imageExtent: ol.proj.transformExtent([-77.26907, 39.770, -77.2539, 39.85787],  'EPSG:4326', 'EPSG:3857'),
    }),
    
  })

//var path = document.location.pathname;
//alert(path);
/**
  * Load the inital points into the source vector,
  * and put it in a layer.  Note that this does
  * not actually load the points, that is done
  * after the map is defined.
  *
  * A second vector, copyVector is also created.  This vector
  * is used to actually display points.  The  saveVector 
  * contains all the original points. The copyVector
  * represents the points to actually be displayed after
  * filtering.  For example, after filtering by state = "DE"
  * the copyVector would only contain monuments for the state
  * of Delaware.  
  *
  * The filter process always starts with the saveVector, so the
  * saveVector itself should never be modified. 
*/
saveVector = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: 'data/Gettysburg_Monuments.geojson',
    format: new ol.format.GeoJSON(),
  })
});
copyVector = saveVector;

// SELECTED ON TOP
var selectedVector = new ol.layer.Vector({
  source: new ol.source.Vector({
  })
});


/**
  * Define the map and controls
*/
map = new ol.Map({
  layers: [raster, pictureLayer, copyVector, selectedVector], // added pictureLayer 7/20/15
  overlays: [overlay],
  target: 'map',
  view: new ol.View({
        center: ol.proj.transform([-77.23, 39.83], 'EPSG:4326', 'EPSG:3857'),
        zoom: 13,
        extent:  ol.proj.transformExtent([-77.14, 39.75, -77.26, 39.90],  'EPSG:4326', 'EPSG:3857'),
        maxZoom: 18.0,
        minZoom: 13.0
    }),
});
map.addControl(new ol.control.ScaleLine({
    units: 'us'
  })
);



/*
 * Add geolocation controls
 */

var geoVector = new ol.layer.Vector({
	  source: new ol.source.Vector({
	  })
});

var geolocation = new ol.Geolocation({
	// take the projection to use from the map's view
	projection: map.getView().getProjection()
});

var geoFeature = new ol.Feature({
	geometry: new ol.geom.Polygon(geolocation.getPosition),
	//geometry: geolocation.getAccuracyGeometry(),
    //labelPoint: new ol.geom.Point(geolocation.getAccuracyGeometry().getCoordinates()),
	labelPoint: new ol.geom.Point(geolocation.getPosition),
    id: 0
});
geoFeature.setStyle(style_1[19]);
geoVector.getSource().addFeature(geoFeature);   


	// listen to changes in position
geolocation.on('change', function(evt) {
	map.removeLayer(geovector);
	map.addLayer(geovector);
	window.console.log(geolocation.getPosition());
});

/**
  * Set up the behavior for clicking on the map.
*/

map.on('click', function(evt) {
    overlay.setPosition(undefined); // remove old overlay
    coordinate = evt.coordinate;    // get coordinate for new overlay
    
    // if there was a previous saveFeature, restore the
    // original icon.  The saveFeature is no longer active, so
    // remove it.
    if (saveFeature != null) {
      saveFeature = null;
      selectedVector.getSource().clear();
    }
    
    // Get one feature at this pixel.  If more than
    // one feature extent contains this pixel, only
    // take the first.
    map.forEachFeatureAtPixel(evt.pixel,
        /**
         * @param {ol.Feature} feature Feature.
         * @param {ol.layer.Layer} layer Layer.
         */
        function(feature, copyVector) {
            saveFeature = feature;
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

            // show popup
            content.innerHTML = ('<code>' + feature.get('name') + 
              '</code><br><img src="thumbs/'+ feature.get('picture') + '"/>');
            overlay.setPosition(coordinate);
            return true;
        });
});

// start from 1 so the normal-sized `selected' icon does not get resized
// manually code in values, since we're only dealing with a 
//      trivial amount of zoom levels... (no need to do anything fancy)
var tempView = map.getView();
tempView.on("change:resolution", function() {
        if(tempView.getZoom() == 13) {
            for (var w = 1; w < style_1.length; w++) {
              //scale
              style_1[w].getImage().setScale(0.17);
            };
        }
        if(tempView.getZoom() == 14) {
            for (var i = 1; i < style_1.length; i++) {
              //scale
              style_1[i].getImage().setScale(0.19);
            };
        }
        else if(tempView.getZoom() == 15) {
            for (var j = 1; j < style_1.length; j++) {
              //scale
              style_1[j].getImage().setScale(0.21);
            };
        }
        else if(tempView.getZoom() == 16) {
            for (var p = 1; p < style_1.length; p++) {
              //scale
              style_1[p].getImage().setScale(0.23);
            };
        }
        else if(tempView.getZoom() == 17) {
            for (var s = 1; s < style_1.length; s++) {
              //scale
              style_1[s].getImage().setScale(0.25);
            };
        }
        else if(tempView.getZoom() == 18){
            for (var z = 1; z < style_1.length; z++) {
              //scale
              style_1[z].getImage().setScale(0.27);
            };
        }
    });


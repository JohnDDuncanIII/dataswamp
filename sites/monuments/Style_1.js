//    Filename: style-1.js
//    Author:  Charles Kann
//    Date:    May 28, 2015 
//    Purpose: This file defines the the style-1 icon set.
// How to draw the monuments is contained in a styles JavaScript
// file.  New styles can be added by creating an array of styles,
// which is then used to populate the features in the Vectors
// that are displayed.  The array members are as follows:
//
// [0] - Icon to show that the monument is selected.
// [1] - Confederate Infantry
// [2] - Confederate Artillery
// [3] - Confederate Cavalry
// [4] - Union Infantry
// [5] - Union Artillery
// [6] - Union Cavalry 
//
style_1= [
    new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            opacity: 0.9,
            scale: 1.0,
            src: "icons/Selected.png"
        })
    }),
    new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            opacity: 0.9,
            scale: 0.17,
            src: "icons/Confederate_Soldier.png"
        })
    }),
    new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            opacity: 0.9,
            scale: 0.17,
            src: "icons/Confederate_Artillery.png"
        })
    }),
    new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            opacity: 0.9,
            scale: 0.17,
            src: "icons/Confederate_Cavalry.png"
        })
    }),
    new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            opacity: 0.9,
            scale: 0.17,
            src: "icons/Union_Soldier.png"
        })
    }),
    new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            opacity: 0.9,
            scale: 0.17,
            src: "icons/Union_Artillery.png"
        })
    }),
    new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            opacity: 0.9,
            scale: 0.17,
            src: "icons/Union_Cavalry.png"
        })
    }),
    new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            opacity: 0.9,
            scale: 0.17,
            src: "icons/Confederate_DivisionMarker.png"
        })
    }),
    new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            opacity: 0.9,
            scale: 0.17,
            src: "icons/BrigadeMarker-C.png"
        })
    }),
    new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            opacity: 0.9,
            scale: 0.17,
            src: "icons/Confederate_HeadQuarter.png"
        })
    }),
    new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            opacity: 0.9,
            scale: 0.17,
            src: "icons/Union_DivisionMarker.png"
        })
    }),
    new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            opacity: 0.9,
            scale: 0.17,
            src: "icons/BrigadeMarker-U.png"
        })
    }),
    new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            opacity: 0.9,
            scale: 0.17,
            src: "icons/Union_HeadQuarter.png"
        })
    }),
    new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            opacity: 0.9,
            scale: 0.17,
            src: "icons/BronzeMarker-C.png"
        })
    }),
    new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            opacity: 0.9,
            scale: 0.17,
            src: "icons/BronzeMarker-U.png"
        })
    }),
    new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            opacity: 0.9,
            scale: 0.17,
            src: "icons/Hospital.png"
        })
    }),
    new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            opacity: 0.9,
            scale: 0.17,
            src: "icons/House.png"
        })
    }),
    new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            opacity: 0.9,
            scale: 0.17,
            src: "icons/Itinery_Tablet.png"
        })
    }),
    new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            opacity: 0.9,
            scale: 0.17,
            src: "icons/State_Monument.png"
        })
    }),
    new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            opacity: 0.9,
            scale: 0.17,
            src: "icons/Other.png"
        })
    }),
    new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            opacity: 0.9,
            scale: 0.17,
            src: "icons/my_location.png"
        })
    })
    ];

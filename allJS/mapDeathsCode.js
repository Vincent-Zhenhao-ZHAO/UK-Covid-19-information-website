/**
 * @file - code source from: https://leafletjs.com/examples/geojson/, data source from: https://coronavirus.data.gov.uk/.
 */
/**
 * mapboxAccessToken
 * @description key from mapbox to draw map in leaflet.
 */
var mapboxAccess = 'pk.eyJ1IjoiY3ZobTM0IiwiYSI6ImNrazVyZDZrcDBkeHYybmxrdDg1ZHBxNjIifQ.SIhx11FKp7V2CCAxdthGrw';
/**
 * map
 * @description get the UK's coordinates and zoom on the map.
 */
var map = L.map('map').setView([53.000153,-1.1262362], 7);

// this is to get tile from mapbox website and set the style. source from: https://leafletjs.com/examples/geojson/ 
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccess, {
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);
/**
 * info
 * @description control that shows state info on hover. source from: https://leafletjs.com/examples/geojson/
 */
var info = L.control();
/**
 * @param map - map 
 * @description this is to creat DOM on html. source from: https://leafletjs.com/examples/geojson/
 */
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};
/**
 * @param props - jsonFile.properties
 * @description this is to update the content in the html. source from: https://leafletjs.com/examples/geojson/
 */
info.update = function (props) {
    this._div.innerHTML = '<h4>UK total deaths </h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.deaths + ' cases'
        : 'Hover over a rigion');
};
info.addTo(map);

// put colors for each numeber of cases
/**
 * @method getColorByCases
 * @param n - the number of cases
 * @description give areas different colors depends on the number of cases.source from: https://leafletjs.com/examples/geojson/,https://coronavirus.data.gov.uk/
 * 
 */
function getColorByCases(n){
    return n > 10000 ? '#800025' :
            n > 8000  ? '#BD0025' :
            n > 6000  ? '#E31A0C' :
            n > 4000  ? '#FC4E1A' :
            n > 2000   ? '#FD8D4C' :
                        '#FFEDA1';
}
/**
 * @method ColorByCases
 * @param features features
 * @description set the color property. source from: https://leafletjs.com/examples/geojson/
 */
// set different styles
function ColorByCases(features) {
    return {
        fillColor: getColorByCases(features.properties.deaths),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
/**
 * @method highlightFeature
 * @param item
 * @description  this is to make area highlight when we move mouse on it. source from: https://leafletjs.com/examples/choropleth/
 */
function giveColorToAreaFeature(item) {
    var layer = item.target;
    layer.setStyle({
        weight: 6,
        color: '#777',
        dashArray: '',
        fillOpacity: 0.8
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
}
/**
 * geojson
 * @description this is to help to control the json file. source from: https://leafletjs.com/examples/choropleth/
 */
var geojson;
/**
 * @method resetFeature
 * @param item 
 * @description this is to reset layer style. source from: https://leafletjs.com/examples/choropleth/
 */
function resetFeature(item) {
    geojson.resetStyle(item.target);
    info.update();
}
/**
 * @method onEachFeature
 * @param feature 
 * @param layer 
 * @description apply function before, when mouse on the area, give the color and move out reset it.source from: https://leafletjs.com/examples/choropleth/
 */
function everyFeature(feature, layer) {
    layer.on({
        mouseover: giveColorToAreaFeature,
        mouseout: resetFeature,
    });
}
/**
 * geojson
 * @description add json map into map, and add features. source from: https://leafletjs.com/examples/choropleth/
 */
geojson = L.geoJson(geomap, {
    style: ColorByCases,
    onEachFeature: everyFeature
}).addTo(map);
/**
 * region_cases
 * @description this is to add illustrations on the map. source from: https://leafletjs.com/examples/choropleth/
 */
var region_cases = L.control({position: 'bottomright'});
/**
 * 
 * @param map 
 * @description this is to help to add legends on map on left side
 */
region_cases.onAdd = function (map) {
    /**
     * @global
     * @description this is to creat contents in html.
     */
    var div = L.DomUtil.create('div', 'info legend'),
        /**
         * @global
         * @type {Array}
         * @description this is to give different of cases.
         */
        levels = [0,2000, 4000, 6000, 8000, 10000],
        /**
         * @global
         * @type {Array}
         * @description this is to add colors in array.
         */
        labels = [],
        /**
         * @global
         * @description this is to show where to start.
         */
        begin, 
        /** 
         * @global
         * @description this is to show where to finish.
         */ 
        finish;
    // add contents and make legends.
    for (var i = 0; i < levels.length; i++) {
        begin = levels[i];
        finish = levels[i + 1];
        labels.push(
            '<i style="background: ' + getColorByCases(begin + 1) + '"></i> ' +
            begin + (finish ? '&ndash;' + finish : '+'));
    }
    div.innerHTML = labels.join('<br>');
    return div;
};
//put legends in map.
region_cases.addTo(map);
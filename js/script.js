var basemapUrl = 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png';
var attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';


///////////////////////////////////////////////////////////////////////
// Map 1                                                             //
///////////////////////////////////////////////////////////////////////

// - deleted - 

///////////////////////////////////////////////////////////////////////
// Map 2                                                             //
///////////////////////////////////////////////////////////////////////

var map2 = L.map('map2', {
  scrollWheelZoom: true
}).setView( [55.924586,9.228516], 3);

//clean background
var tile2 = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery &copy; <a href="http://mapbox.com">Mapbox</a>',
      id: 'mapbox.light'
    });

tile2.addTo(map2);

function brewer2(d) {
    return d > 100000 ? '#0000cc' :
           d > 75000  ? '#BD0026' :
           d > 50000  ? '#E31A1C' :
           d > 30000  ? '#FC4E2A' :
           d > 10000  ? '#FD8D3C' :
           d > 5000   ? '#FEB24C' :
           d > 1000   ? '#FED976' :
                        '#FFEDA0';
}

//this function returns a style object, but dynamically sets fillColor based on the data
function style2(feature) {
  return {
      fillColor: brewer2(feature.properties.Field3),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

//control that shows state info on hover
var info2 = L.control();

info2.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};

info2.update = function (properties) {
  this._div.innerHTML = '<h4>Immigration in 2014</h4>' +  (properties ?
    '<b>' + properties.SOVEREIGNT + '</b><br />' + properties.Field3
    : 'Hover over a state');
};

info2.addTo(map2);

var geo2;

//this function is set to run when a user mouses over any polygon
function mouseover2(e) {
  var layer = e.target;
  layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera) {
      layer.bringToFront();
  }

  //update the text in the infowindow with whatever was in the data
  info2.update(layer.feature.properties);
}

//this runs on mouseout
function reset2(e) {
  geo2.resetStyle(e.target);
}

//this is executed once for each feature in the data, and adds listeners
function done2(feature, layer) {
  layer.on({
      mouseover: mouseover2,
      mouseout: reset2
      //click: zoomToFeature
  });
}


//helper functions are defined -> get data and render map!
//need to specify style and onEachFeature options when calling L.geoJson().
var geo2;
$.getJSON('data/world2.geojson', function(world2) {
  geo2 = L.geoJson(world2,{
    style: style2,
    onEachFeature: done2
  }).addTo(map2);
});

var legend2 = L.control({position: 'bottomright'});

legend2.onAdd = function(map) {

  var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 1000, 5000, 10000, 30000, 50000, 75000, 100000],
    labels = [],
    from, to;

  for (var i = 0; i < grades.length; i++) {
    from = grades[i];
    to = grades[i + 1];

    labels.push(
      '<i style="background:' + brewer2(from + 1) + '"></i> ' +
      from + (to ? ' &ndash; ' + to : '+'));
  }

  div.innerHTML = labels.join('<br>');
  return div;
};

legend2.addTo(map2);

///////////////////////////////////////////////////////////////////////
// Map 3                                                             //
///////////////////////////////////////////////////////////////////////

var map3 = L.map('map3', {
  scrollWheelZoom: true
}).setView( [55.924586,9.228516], 3);

// clean background already loaded
tile2.addTo(map3);

function brewer3(d) {
    return d > .005  ? '#0000cc' :
           d > .004  ? '#BD0026' :
           d > .003  ? '#E31A1C' :
           d > .002  ? '#FC4E2A' :
           d > .001  ? '#FD8D3C' :
           d > .0005 ? '#FEB24C' :
           d > .0001 ? '#FED976' :
                       '#FFEDA0';
}

//this function returns a style object, but dynamically sets fillColor based on the data
function style3(feature) {
  return {
      fillColor: brewer3(feature.properties.Field2),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

//control that shows state info on hover
var info3 = L.control();

info3.onAdd = function(map) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};

info3.update = function (properties) {
  this._div.innerHTML = '<h4>Relation of Immigration <br /> to Population Size (2014)</h4>' +  (properties ?
    '<b>' + properties.SOVEREIGNT + '</b><br />' + (properties.Field2*100).toFixed(2) + '%'
    : 'Hover over a state');
};

info3.addTo(map3);

var geo3;

//this function is set to run when a user mouses over any polygon
function mouseover3(e) {
  var layer = e.target;
  layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera) {
      layer.bringToFront();
  }

  //update the text in the infowindow with whatever was in the data
  info3.update(layer.feature.properties);
}

//this runs on mouseout
function reset3(e) {
  geo3.resetStyle(e.target);
}

//this is executed once for each feature in the data, and adds listeners
function done3(feature, layer) {
  layer.on({
      mouseover: mouseover3,
      mouseout: reset3
      //click: zoomToFeature
  });
}


//all of the helper functions are defined -> get data and render it!
//need to specify style and onEachFeature options when calling L.geoJson().
var geo3;
$.getJSON('data/world2.geojson', function(world2) {
  geo3 = L.geoJson(world2,{
    style: style3,
    onEachFeature: done3
  }).addTo(map3);
});

var legend3 = L.control({position: 'bottomright'});

legend3.onAdd = function(map) {

  var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, .0001, .0005, .001, .002, .003, .004, .005],
    labels = [],
    from, to;

  for (var i = 0; i < grades.length; i++) {
    from = grades[i];
    to = grades[i + 1];

    labels.push(
      '<i style="background:' + brewer3(from + 10e-5) + '"></i> ' +
      (from*100).toFixed(2) + '%' + (to ? ' &ndash; ' + (to*100).toFixed(2) + '%' : '+'));
  }

  div.innerHTML = labels.join('<br>');
  return div;
};

legend3.addTo(map3);




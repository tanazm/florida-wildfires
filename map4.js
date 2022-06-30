mapboxgl.accessToken = 'pk.eyJ1IjoidGFuYXptIiwiYSI6ImNsMWprZGNubjFscGozbHFrcG41dDh5bmkifQ.oq4bHdIFMK-OUA4k1Ux3bQ';
var map4 = new mapboxgl.Map({
    container: 'map4',
    style: 'mapbox://styles/tanazm/cl50cmnn1001n14mvkchyo3l7',
    minZoom: 5.1,
    center: [-84, 28],
    maxBounds: [
      [-180, 15],
      [-30, 72],
    ],
    projection: 'albers',
  });

var popup = new mapboxgl.Popup({
    closeButton: false
});

map4.on("load", function () {
        map4.addLayer(
            {
              id: "county_outline",
              type: "line",
              source: {
                type: "geojson",
                data: "data/fl2.geojson",
              },
              paint: {
                "line-color": "#ffffff",
                "line-width": .1,
              },
            },
            "waterway-label" // Here's where we tell Mapbox where to slot this new layer
          );
  map4.addLayer(
    {
      id: "counties_fill",
      type: "fill",
      source: {
        type: "geojson",
        data: "data/fl2.geojson",
      },
        paint: {
          "fill-color": [
            "match",
            ["get", "naturalBreaksHU"],
            "29.6443 - 29309.4853",
            "#fef0d9",
            "29309.4853 - 86515.6933",
            "#fdcc8a",
            "86515.6933 - 189739.1375",
            "#fc8d59",
            "189739.1375 - 444344.6759",
            "#e34a33",
            "444344.6759 - 930094.928",
            "#b30000",
            "#ffffff",
          ],
        },
    },
    "county_outline" // Here's where we tell Mapbox where to slot this new layer
  );
});

map4.on('mousemove', 'counties_fill', function (e) {
  map4.getCanvas().style.cursor = 'pointer';

  var countyName = e.features[0].properties.NAMELSAD;
  var HU = e.features[0].properties.Total_number_of_exposed_HUs;
  HU = HU.toFixed(0);
  popup.setLngLat(e.lngLat)
      .setHTML(
        '<h3>An estimated '
        + '<b>' 
        + HU 
        + '</b>'
        + ' number of housing units in ' 
        + '<b>' 
        + countyName 
        + '</b>'
        + ' are at risk of direct or indirect exposure to wildfire.</h3>'
          )
      .addTo(map4);
});

// Change it back to a pointer when it leaves.
map4.on('mouseout', 'counties_fill', function () {
  map4.getCanvas().style.cursor = '';
  popup.remove();
});

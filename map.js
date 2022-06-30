mapboxgl.accessToken = 'pk.eyJ1IjoidGFuYXptIiwiYSI6ImNsMWprZGNubjFscGozbHFrcG41dDh5bmkifQ.oq4bHdIFMK-OUA4k1Ux3bQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/tanazm/cl472gan5004z14qtaf6czvgd',
    minZoom: 3.9,
    center: [-96, 38.7],
    maxBounds: [
      [-180, 15],
      [-30, 72],
    ],
    projection: 'albers',
  });

var popup = new mapboxgl.Popup({
    closeButton: false
});


map.on("load", function () {
    map.addLayer(
        {
          id: "state_outline",
          type: "line",
          source: {
            type: "geojson",
            data: "data/statesData_final.geojson",
          },
          paint: {
            "line-color": "#ffffff",
            "line-width": 1,
          },
        },
        "waterway-label" // Here's where we tell Mapbox where to slot this new layer
      );
  map.addLayer(
    {
      id: "states_fill",
      type: "fill",
      source: {
        type: "geojson",
        data: "data/statesData_final.geojson",
      },
        paint: {
          "fill-color": [
            "match",
            ["get", "naturalBreaksHU_state"],
            "170924.0 - 1020489.0",
            "#fef0d9",
            "1020489.0 - 2272131.0",
            "#fdcc8a",
            "2272131.0 - 3836297.0",
            "#fc8d59",
            "3836297.0 - 5075675.0",
            "#e34a33",
            "5075675.0 - 7056011.0",
            "#b30000",
            "#ffffff",
          ],
        },
    },
    "state_outline" // Here's where we tell Mapbox where to slot this new layer
  );
});

map.on('mousemove', 'states_fill', function (e) {
  map.getCanvas().style.cursor = 'pointer';

  var stateName = e.features[0].properties.STATE;
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
        + stateName 
        + '</b>'
        + ' are at risk of direct or indirect exposure to wildfire.</h3>'
          )
      .addTo(map);
});

// Change it back to a pointer when it leaves.
map.on('mouseout', 'states_fill', function () {
  map.getCanvas().style.cursor = '';
  popup.remove();
});

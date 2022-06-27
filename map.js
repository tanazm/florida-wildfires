mapboxgl.accessToken = 'pk.eyJ1IjoidGFuYXptIiwiYSI6ImNsMWprZGNubjFscGozbHFrcG41dDh5bmkifQ.oq4bHdIFMK-OUA4k1Ux3bQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/tanazm/cl472gan5004z14qtaf6czvgd',
    minZoom: 5.5,
    center: [-84, 28],
    maxBounds: [
      [-180, 15],
      [-30, 72],
    ],
    projection: 'albers',
  });

map.on("load", function () {
    map.addLayer(
        {
          id: "state_outline",
          type: "line",
          source: {
            type: "geojson",
            data: "data/statefinal.geojson",
          },
          paint: {
            "line-color": "#ffffff",
            "line-width": 1.5,
          },
        },
        "waterway-label" // Here's where we tell Mapbox where to slot this new layer
      );
        map.addLayer(
            {
              id: "county_outline",
              type: "line",
              source: {
                type: "geojson",
                data: "data/fl.geojson",
              },
              paint: {
                "line-color": "#ffffff",
                "line-width": .1,
              },
            },
            "state_outline" // Here's where we tell Mapbox where to slot this new layer
          );
  map.addLayer(
    {
      id: "counties_fill",
      type: "fill",
      source: {
        type: "geojson",
        data: "data/fl.geojson",
      },
        paint: {
          "fill-color": [
            "match",
            ["get", "naturalBreaksFLEP8"],
            "0.0 - 0.0888",
            // original color F7B267
            "#fef0d9",
            "0.0888 - 0.1706",
            "#fdcc8a",
            "0.1706 - 0.2666",
            "#fc8d59",
            "0.2666 - 0.3924",
            "#e34a33",
            "0.3924 - 0.7365",
            // original F25C54
            "#b30000",
            "#ffffff",
          ],
        },
    },
    "county_outline" // Here's where we tell Mapbox where to slot this new layer
  );
});

map.on('click', 'counties_fill', function (e) {
  var countyName = e.features[0].properties.NAME_x;
  var stateName = e.features[0].properties.STATE;
  var FLEP8 = e.features[0].properties.Mean_FLEP8;
  FLEP8 = (FLEP8 * 100).toFixed(1);
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        '<h3>The probability of having flame lengths greater than 8 feet if a fire occurs in ' +
        '<b>' + countyName + ', ' + stateName + '</b>' + ' is ' +
        + FLEP8 + '%.' + '</h3>'
          )
      .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the states_fill layer.
map.on('mouseenter', 'counties_fill', function () {
  map.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'counties_fill', function () {
  map.getCanvas().style.cursor = '';
});

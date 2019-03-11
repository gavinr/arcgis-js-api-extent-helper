require([
  "esri/Map",
  "esri/views/SceneView",
  "esri/views/MapView",
  "esri/geometry/Extent",
  "dojo/domReady!"
],
function(Map, SceneView, MapView, Extent) {
  var map = new Map({
    basemap: "hybrid"
  });
  
  var viewOptions = {
    container: "viewDiv",
    map: map,
    extent: new Extent(EXTENTHERE)
  };

  // 2D:
  var view = new MapView(viewOptions);

  // 3D:
  // var view = new SceneView(viewOptions);
});

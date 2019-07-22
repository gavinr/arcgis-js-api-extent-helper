require([
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/Search",
  "esri/geometry/support/webMercatorUtils",
  "axios",
  "beautify",
  "dojo/domReady!"
],
function(Map, MapView, Search, webMercatorUtils, axios, beautify) {
  var map = new Map({
    basemap: "hybrid"
  });
  
  var viewOptions = {
    container: "viewDiv",
    map: map,
    zoom: 3,
    constraints: {
      rotationEnabled: false
    }
  };

  // 3D:
  var view = new MapView(viewOptions);
  
  var searchWidget = new Search({
    view: view
  });
  view.ui.add(searchWidget, {
    position: "top-right"
  });
  
  view.ui.add(document.getElementById("extentDetailsWidget"), {
    position: "bottom-right"
  });
  
  view.when(function() {
    view.watch('extent', updateExtent.bind(this));
    updateExtent();
  }.bind(this));

  document.getElementById("copyExtentJson").addEventListener("click", function() {
    var copyTextarea = document.querySelector('#extentDetails');
    copyTextarea.focus();
    copyTextarea.select();
    document.execCommand('copy');
  });

  var css = '';
  axios.get('templates/style.css').then(function(fileContents) {
    css = fileContents.data;
  });

  var html = '';
  axios.get('templates/html.html').then(function(fileContents) {
    html = fileContents.data;
  });

  var head = '';
  axios.get('templates/head.html').then(function(fileContents) {
    head = fileContents.data;
  });

  var javaScriptTemplate = '';
  axios.get('templates/js.js').then(function(fileContents) {
    javaScriptTemplate = fileContents.data;
  });

  var updateExtent = function() {
    var code = JSON.stringify(webMercatorUtils.webMercatorToGeographic(view.extent).toJSON(), null, 2);
    document.getElementById("extentDetails").value = code;
    createCodepen(code);
  }

  var createCodepen = function(extentJsCode) {
    var jt = beautify.js_beautify(javaScriptTemplate.replace('EXTENTHERE', extentJsCode), { indent_size: 2, space_in_empty_paren: true });

    var data = {
      editors: "001",
      html: html,
      css: css,
      js: jt,
      head: head,
      js_external: 'https://js.arcgis.com/4.12/dojo/dojo.js',
      css_external: 'https://js.arcgis.com/4.12/esri/css/main.css;https://s3-us-west-1.amazonaws.com/patterns.esri.com/files/calcite-web/1.2.5/css/calcite-web.min.css',
    };

    var JSONstring = 
      JSON.stringify(data);
        // Quotes will screw up the JSON
        // .replace(/"/g, "&​quot;") // careful copy and pasting, I had to use a zero-width space here to get markdown to post this.
        // .replace(/'/g, "&apos;");

    document.getElementById('formDataCodepen').value = JSONstring;
  }
  
});

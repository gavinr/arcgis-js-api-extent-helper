import React, { useState, useEffect } from "react";
// import { Map } from "@esri/react-arcgis";
import { 
  useMap
} from 'esri-loader-hooks';
import { loadModules } from "esri-loader";
import ExtentDetails from "./components/ExtentDetails";
// import MapView from "esri/views/MapView";

const App: React.FC = () => {
  const [extent, setExtent] = useState({});

  const map = {
    basemap: "topo-vector"
  };
  const options = {
    view: {
      center: [0, 0],
      zoom: 3
    }
  };
  const [ref, view] = useMap(map, options);

  useEffect(() => {
    if (!view) {
      // view hasn't been created yet
      return;
    }

    loadModules([
      "esri/widgets/Search",
      "esri/geometry/support/webMercatorUtils"
    ]).then(([Search, webMercatorUtils]) => {
      view.watch("extent", (evt: any) => {
        setExtent(
          webMercatorUtils.webMercatorToGeographic(evt.extent).toJSON()
        );
      });
      setExtent(webMercatorUtils.webMercatorToGeographic(view.extent).toJSON());

      var searchWidget = new Search({
        view: view
      });
      view.ui.add(searchWidget, {
        index: 0,
        position: "top-right"
      });
    });
    
  }, [view]);

  return (
    <div className="App">
      {/* <Map
        mapProperties={{ basemap: "topo-vector" }}
        viewProperties={{ center: [0, 0], zoom: 3 }}
        loaderOptions={{ css: true }}
        onLoad={(map, view) => {
          handleMapLoad(view as MapView);
        }}
      /> */}
      <div ref={ref} />

      <ExtentDetails extent={extent} />
    </div>
  );
};

export default App;

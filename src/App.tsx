import React, { useState } from "react";
import { Map, loadModules } from "@esri/react-arcgis";
import ExtentDetails from "./components/ExtentDetails";
import MapView from "esri/views/MapView";

const App: React.FC = () => {
  const [extent, setExtent] = useState({});

  function handleMapLoad(view: MapView) {
    loadModules([
      "esri/widgets/Search",
      "esri/geometry/support/webMercatorUtils"
    ]).then(([Search, webMercatorUtils]) => {
      view.watch("extent", (evt: any) => {
        setExtent(
          webMercatorUtils.webMercatorToGeographic(evt.extent).toJSON()
        );
      });
      setExtent(view.extent);

      var searchWidget = new Search({
        view: view
      });
      view.ui.add(searchWidget, {
        index: 0,
        position: "top-right"
      });
    });
  }

  return (
    <div className="App">
      <Map
        mapProperties={{ basemap: "topo-vector" }}
        loaderOptions={{ version: "4.12", css: true }}
        onLoad={(map, view) => {
          handleMapLoad(view as MapView);
        }}
      />
      <ExtentDetails extent={extent} />
    </div>
  );
};

export default App;

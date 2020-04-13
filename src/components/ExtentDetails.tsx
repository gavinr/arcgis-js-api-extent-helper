import React, { useState, useEffect, useRef } from "react";
import raw from "raw.macro";
import beautify from "js-beautify";
import Button from "calcite-react/Button";
import Instructions from "./Instructions";

interface ExtentDetailsProps {
  extent: object;
}

export default function ExtentDetails({ extent }: ExtentDetailsProps) {
  const copyTextArea = useRef<HTMLTextAreaElement>(null);
  const [calculatedFullRequest, setCalculatedFullRequest] = useState("");

  useEffect(() => {
    // we should probably change this to, instead of running every time, to only run when "new app" button is clicked.
    function createCodepen(cameraJsCode: object) {
      const styleTemplate = raw("../templates/style.css");
      const htmlHeadTemplate = raw("../templates/head.html");
      const htmlTemplate = raw("../templates/html.html");
      const jsTemplate = raw("../templates/js.txt");
      var jt = beautify.js_beautify(
        jsTemplate.replace("[EXTENTHERE]", JSON.stringify(cameraJsCode)),
        { indent_size: 2, space_in_empty_paren: true }
      );

      var data = {
        editors: "001",
        html: htmlTemplate,
        css: styleTemplate,
        js: jt,
        head: htmlHeadTemplate,
        js_external: "https://js.arcgis.com/4.15/dojo/dojo.js",
        css_external:
          "https://js.arcgis.com/4.15/esri/css/main.css;https://s3-us-west-1.amazonaws.com/patterns.esri.com/files/calcite-web/1.2.5/css/calcite-web.min.css"
      };

      var JSONstring = JSON.stringify(data);
      // Quotes will screw up the JSON
      // .replace(/"/g, "&​quot;") // careful copy and pasting, I had to use a zero-width space here to get markdown to post this.
      // .replace(/'/g, "&apos;");

      return JSONstring;
    }
    setCalculatedFullRequest(createCodepen(extent));
  }, [extent]);

  function copyJsonButtonClickHandler() {
    if (copyTextArea && copyTextArea.current) {
      copyTextArea.current.focus();
      copyTextArea.current.select();
      document.execCommand("copy");
    }
  }
  return (
    <div className="ExtentDetails">
      <Instructions />
      <textarea
        rows={15}
        cols={50}
        readOnly={true}
        value={JSON.stringify(extent, null, 2)}
        ref={copyTextArea}
      />
      <br />
      <Button
        className="btn btn-clear"
        onClick={() => {
          copyJsonButtonClickHandler();
        }}
      >
        Copy JSON
      </Button>

      <form
        action="https://codepen.io/pen/define"
        method="POST"
        target="_blank"
        className="right"
      >
        <input
          type="hidden"
          id="formDataCodepen"
          name="data"
          value={calculatedFullRequest}
        />
        <Button type="submit" className="right">
          New app at this location
        </Button>
      </form>
    </div>
  );
}

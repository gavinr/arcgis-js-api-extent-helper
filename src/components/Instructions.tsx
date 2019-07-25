import React, { useState } from "react";
// import Modal from "calcite-react/Modal";
import Button from "calcite-react/Button";
import { CalciteH1, CalciteP } from "calcite-react/Elements";
import Modal, { ModalActions } from "calcite-react/Modal";
import QuestionIcon from "calcite-ui-icons-react/QuestionIcon";

export default function Instructions() {
  const [open, setOpen] = useState(false);

  function openModal() {
    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
  }

  return (
    <div>
      <Button
        transparent
        className="right"
        onClick={() => {
          openModal();
        }}
        alt="More Information"
        title="More Information"
      >
        <QuestionIcon />
      </Button>
      <Modal
        open={open}
        onRequestClose={() => {
          closeModal();
        }}
        appElement={document.body}
      >
        <CalciteH1>ArcGIS JS API Extent Helper</CalciteH1>
        <CalciteP>
          First zoom to the exact extent you'd like to start with, then
          copy/paste the extent into your{" "}
          <a
            href="https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#extent"
            target="_blank"
            rel="noopener noreferrer"
          >
            MapView constructor - extent property
          </a>
          .
        </CalciteP>
        <CalciteP>
          Discover more information or log an issue by going to{" "}
          <a
            href="https://github.com/gavinr/arcgis-js-api-extent-helper"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/gavinr/arcgis-js-api-extent-helper
          </a>
          .
        </CalciteP>
        <ModalActions>
          <Button
            onClick={() => {
              closeModal();
            }}
          >
            Okay
          </Button>
        </ModalActions>
      </Modal>
    </div>
  );
}

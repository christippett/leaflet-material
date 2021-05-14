"use strict";

import "./leaflet-material.scss";
import "./_leaflet-material-mdl.scss";

var materialControl = require("material-control"), // extends L.Control
  materialFullscreenControl = require("./fullscreen_control/fullscreen_control"),
  materialLayersControl = require("./layers_control/layers_control"),
  materialZoomControl = require("./zoom_control/zoom_control"),
  materialGeocoderControl = require("./geocoder_control/geocoder_control");

module.exports = window.L.materialControl = {
  VERSION: "__VERSION__",
  Control: materialControl,
  fullscreen: materialFullscreenControl.materialFullscreenControl,
  Fullscreen: materialFullscreenControl.MaterialFullscreenControl,
  layers: materialLayersControl.MaterialLayersControl,
  Layers: materialLayersControl.materialLayersControl,
  zoom: materialZoomControl.materialZoomControl,
  Zoom: materialZoomControl.MaterialZoomControl,
  geocoder: materialGeocoderControl.materialGeocoderControl,
  Geocoder: materialGeocoderControl.MaterialGeocoderControl,
};

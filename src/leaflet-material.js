"use strict";

import {
  materialFullscreenControl,
  MaterialFullscreenControl,
} from "./fullscreen_control/fullscreen_control.js";
import {
  materialGeocoderControl,
  MaterialGeocoderControl,
} from "./geocoder_control/geocoder_control.js";
import { materialLayersControl, MaterialLayersControl } from "./layers_control/layers_control.js";
import "./leaflet-material.scss";
import materialControl from "./material_control/material_control.js";
import { materialZoomControl, MaterialZoomControl } from "./zoom_control/zoom_control.js";
import "./_leaflet-material-mdl.scss";

module.exports = window.L.materialControl = {
  VERSION: "__VERSION__",
  Control: materialControl,
  fullscreen: materialFullscreenControl,
  Fullscreen: MaterialFullscreenControl,
  layers: MaterialLayersControl,
  Layers: materialLayersControl,
  zoom: materialZoomControl,
  Zoom: MaterialZoomControl,
  geocoder: materialGeocoderControl,
  Geocoder: MaterialGeocoderControl,
};

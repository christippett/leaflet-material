"use strict";

import materialControl from "../material_control/material_control.js";

var L = window.L;
L.Control = materialControl;

export var MaterialFullscreenControl = L.Control.Fullscreen.extend({
  onAdd: function (map) {
    var container = L.DomUtil.create("div", "leaflet-control-fullscreen-mdl leaflet-bar-mdl"),
      options = this.options,
      button = this._createMaterialButton(
        "leaflet-fullscreen-mdl",
        "fullscreen",
        options.title["false"],
        container
      );

    this._map = map;
    this._map.on("fullscreenchange", this._toggleTitle, this);
    this._toggleTitle();

    L.DomEvent.on(button, "click", this._click, this);

    return container;
  },

  _toggleTitle: function () {
    var fullScreenIcon = {
      false: "fullscreen",
      true: "fullscreen_exit",
    };

    this._materialButton.title = this.options.title[this._map.isFullscreen()];
    this._materialIcon.innerHTML = fullScreenIcon[this._map.isFullscreen()];

    if (this._materialToolTip) {
      this._materialToolTip.innerHTML = this.options.title[this._map.isFullscreen()];
      this._materialButton.removeAttribute("title");
    }
  },
});

export function materialFullscreenControl(options) {
  return new MaterialFullscreenControl(options);
}

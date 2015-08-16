'use strict';

var L = require('leaflet');
L.Control = require('material-control');

var MaterialZoomControl = L.Control.Zoom.extend({
  onAdd: function (map) {
    var container = L.DomUtil.create('div','leaflet-control-zoom-mdl leaflet-bar-mdl'),
        options = this.options;

    options.zoomInText = options.zoomInText === "+" ? 'add' : options.zoomInText;
    options.zoomOutText = options.zoomOutText === "-" ?'remove' : options.zoomInText;

    this._zoomInButton = this._createMaterialButton('leaflet-zoom-in-mdl', options.zoomInText, options.zoomInTitle, container);
    this._zoomOutButton = this._createMaterialButton('leaflet-zoom-out-mdl', options.zoomOutText, options.zoomOutTitle, container);
    this._addZoomFunction(this._zoomInButton, this._zoomIn);
    this._addZoomFunction(this._zoomOutButton, this._zoomOut);

    this._updateDisabled();
    map.on('zoomend zoomlevelschange', this._updateDisabled, this);

    return container;
  },

  _addZoomFunction: function (button, fn) {
    L.DomEvent
        .on(button, 'mousedown dblclick', L.DomEvent.stopPropagation)
        .on(button, 'click', L.DomEvent.stop)
        .on(button, 'click', fn, this)
        .on(button, 'click', this._refocusOnMap, this);
    return button;
  },

  _updateDisabled: function () {
      var map = this._map;

      this._zoomInButton.removeAttribute('disabled');
      this._zoomOutButton.removeAttribute('disabled');

      if (this._disabled || map._zoom === map.getMinZoom()) {
        this._zoomOutButton.setAttribute('disabled', true);
      }
      if (this._disabled || map._zoom === map.getMaxZoom()) {
          this._zoomInButton.setAttribute('disabled', true);
      }
  }
});

module.exports.MaterialZoomControl = MaterialZoomControl;

module.exports.materialZoomControl = function(options) {
  return new MaterialZoomControl(options);
};
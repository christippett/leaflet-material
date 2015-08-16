'use strict';

var L = require('leaflet');

var MaterialGeocoderControl = L.mapbox.GeocoderControl.extend({
  onAdd: function(map) {
    var container = L.DomUtil.create('div', 'leaflet-control-geocoder-mdl leaflet-bar-mdl leaflet-control'),
        form = L.DomUtil.create('form', 'geocoder-form', container),
        textField = L.DomUtil.create('div', 'mdl-textfield mdl-js-textfield mdl-shadow--2dp', form),
        input = L.DomUtil.create('input', 'mdl-textfield__input', textField),
        label = L.DomUtil.create('label', 'mdl-textfield__label', textField),
        icon = L.DomUtil.create('i', 'material-icons', label),
        clearSearchButton = L.DomUtil.create('button', 'mdl-button mdl-js-button mdl-button--icon clear-search', textField),
        clearSearchIcon = L.DomUtil.create('i', 'material-icons', clearSearchButton),
        progressBar = L.DomUtil.create('div', 'mdl-progress mdl-js-progress mdl-progress__indeterminate', textField),
        results = L.DomUtil.create('div', 'leaflet-control-geocoder-results-mdl mdl-shadow--2dp', container);


    icon.innerHTML = 'search';
    clearSearchIcon.innerHTML = 'close';
    label.setAttribute('for', 'mapbox-geocoder-mdl')
    input.setAttribute('id', 'mapbox-geocoder-mdl')
    input.type = 'text';
    input.setAttribute('placeholder', 'Search...');

    // L.DomUtil.addClass(results, 'show-results');
    // this._map.on('click', this._closeResults, this);

    clearSearchButton.type = "button";
    L.DomEvent.addListener(clearSearchButton, 'click', this._clearSearch, this);

    L.DomEvent.addListener(form, 'submit', this._geocode, this);
    L.DomEvent.addListener(input, 'keyup', this._autocomplete, this);
    L.DomEvent.disableClickPropagation(container);

    this._textField = textField;
    this._map = map;
    this._results = results;
    this._input = input;
    this._form = form;

    return container;
  },
  _clearSearch: function() {
    this._input.value = null;
    L.DomUtil.removeClass(this._textField, 'is-dirty');
    this._closeResults();
  },
  _closeResults: function() {
    L.DomUtil.removeClass(this._results, 'show-results');
    // have results fade out before removing result elements
    if (this._results.childNodes.length > 0) {
      setTimeout(function(results) {
        while (results.firstChild) {
            results.removeChild(results.firstChild);
        };
      }, 500, this._results);
    }
  },
  _displayResults: function(features) {
    L.DomUtil.addClass(this._results, 'show-results');
    if (features.length === 0) {
      var message = L.DomUtil.create('span', 'no-results-message', this._results);
      message.innerHTML = 'No results found.';
    } else {
      L.mapbox.GeocoderControl.prototype._displayResults.apply(this, [features]);
    }
  },
});

module.exports.MaterialGeocoderControl = MaterialGeocoderControl;

module.exports.materialGeocoderControl = function(_, options) {
  return new MaterialGeocoderControl(_, options);
};
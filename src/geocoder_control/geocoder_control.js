"use strict";

var L = window.L;

if (!L.mapbox) {
  throw "geocoder control requires mapbox.js";
}

export var MaterialGeocoderControl = L.mapbox.GeocoderControl.extend({
  onAdd: function (map) {
    var container = L.DomUtil.create(
        "div",
        "leaflet-control-geocoder-mdl leaflet-bar-mdl leaflet-control"
      ),
      form = L.DomUtil.create("form", "geocoder-form", container),
      textField = L.DomUtil.create(
        "div",
        "mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-shadow--8dp",
        form
      ),
      textFieldHolder = L.DomUtil.create("div", "mdl-textfield__expandable-holder", textField),
      input = L.DomUtil.create("input", "mdl-textfield__input", textFieldHolder),
      label = L.DomUtil.create("label", "mdl-textfield__label", textFieldHolder),
      buttonLabel = L.DomUtil.create(
        "label",
        "mdl-button mdl-js-button mdl-button--icon",
        textFieldHolder
      ),
      icon = L.DomUtil.create("i", "material-icons", buttonLabel),
      progressBar = L.DomUtil.create(
        "div",
        "mdl-progress mdl-js-progress mdl-progress__indeterminate",
        textField
      ),
      results = L.DomUtil.create(
        "div",
        "leaflet-control-geocoder-results-mdl mdl-shadow--8dp",
        container
      );

    icon.innerHTML = "search";
    label.setAttribute("for", "mapbox-geocoder-mdl");
    buttonLabel.setAttribute("for", "mapbox-geocoder-mdl");
    input.setAttribute("id", "mapbox-geocoder-mdl");
    input.type = "text";
    input.setAttribute("placeholder", "Search...");

    // L.DomUtil.addClass(results, 'show-results');
    // this._map.on('click', this._closeResults, this);

    L.DomEvent.addListener(form, "submit", this._geocode, this);
    L.DomEvent.addListener(input, "keyup", this._autocomplete, this);
    L.DomEvent.disableClickPropagation(container);

    this._textField = textField;
    this._map = map;
    this._results = results;
    this._input = input;
    this._form = form;

    return container;
  },
  _clearSearch: function () {
    this._input.value = null;
    L.DomUtil.removeClass(this._textField, "is-dirty");
    this._closeResults();
  },
  _closeResults: function () {
    L.DomUtil.removeClass(this._results, "show-results");
    // have results fade out before removing result elements
    if (this._results.childNodes.length > 0) {
      setTimeout(
        function (results) {
          while (results.firstChild) {
            results.removeChild(results.firstChild);
          }
        },
        500,
        this._results
      );
    }
  },
  _displayResults: function (features) {
    L.DomUtil.addClass(this._results, "show-results");
    if (features.length === 0) {
      var message = L.DomUtil.create("span", "no-results-message", this._results);
      message.innerHTML = "No results found.";
    } else {
      L.mapbox.GeocoderControl.prototype._displayResults.apply(this, [features]);
    }
  },
});

export function materialGeocoderControl(_, options) {
  return new MaterialGeocoderControl(_, options);
}

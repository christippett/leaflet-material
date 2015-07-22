'use strict';

L.Control.include({
  defaultMaterialOptions: {
    fab: true,
    miniFab: true,
    rippleEffect: true,
    toolTips: false,
    color: 'lime-A200'  
  },
  _setDefaultOptions: function () {
    var materialOptions = {};
    for (var attrname in this.defaultMaterialOptions) {
      materialOptions[attrname] = this.defaultMaterialOptions[attrname];
    };

    if (typeof this.options.materialOptions !== 'undefined') {
      for (var attrname in this.options.materialOptions) {
        materialOptions[attrname] = this.options.materialOptions[attrname];
      }
    };
    return materialOptions;
  },
  _addToolTip: function (el, idTag, toolTipText) {
    var parentNode = el.parentNode,
        toolTipNode = L.DomUtil.create('div', 'mdl-tooltip', parentNode);
    toolTipNode.setAttribute('for', idTag);
    toolTipNode.innerHTML = toolTipText;

    return toolTipNode;
  },
  _createMaterialButton: function (idTag, iconText, title, container, optionalClass) {
    var materialClass = 'mdl-button mdl-js-button mdl-button--icon',
        materialOptions = this._setDefaultOptions(),
        button = L.DomUtil.create('button', materialClass, container);
    
    this._materialIcon = L.DomUtil.create('i', 'material-icons', button);
    this._materialIcon.innerHTML = iconText;
    button.title = title;
    button.id = idTag;

    if (materialOptions.fab) {
      L.DomUtil.removeClass(button, 'mdl-button--icon');
      L.DomUtil.addClass(button, 'mdl-button--fab');
      if (materialOptions.miniFab) {
        L.DomUtil.addClass(button, 'mdl-button--mini-fab'); 
      }
    }
    if (materialOptions.rippleEffect) {
      L.DomUtil.addClass(button, 'mdl-js-ripple-effect');
    }
    if (materialOptions.color) {
      var colorClass;
      if (typeof materialOptions.color === "boolean") {
        colorClass = 'mdl-button--colored';
      } else {
        switch (materialOptions.color) {
          case "colored":
            colorClass = 'mdl-button--colored';
            break;
          case "primary":
            colorClass = 'mdl-button--primary';
            break;
          case "accent":
            colorClass = "mdl-button--accent";
            break;
          default:
            colorClass = 'mdl-color--' + materialOptions.color;
        }
      }

      L.DomUtil.addClass(button, colorClass);
    }
    if (optionalClass) {
      L.DomUtil.addClass(button, optionalClass);
    }
    if (materialOptions.toolTips) {
      this._materialToolTip = this._addToolTip(button, idTag, title);
      button.removeAttribute('title');
    }

    this._materialButton = button;
    return this._materialButton;
  }
});

L.Control.MaterialFullscreen = L.Control.Fullscreen.extend({
  onAdd: function (map) {
    var container = L.DomUtil.create('div', 'leaflet-control-fullscreen-mdl leaflet-bar-mdl'),
        options = this.options,
        button = this._createMaterialButton('leaflet-fullscreen-mdl', 'fullscreen', options.title['false'], container);

    this._map = map;
    this._map.on('fullscreenchange', this._toggleTitle, this);
    this._toggleTitle();

    L.DomEvent.on(button, 'click', this._click, this);

    return container;
  },

  _toggleTitle: function () {
    var fullScreenIcon = {
      'false': 'fullscreen',
      'true': 'fullscreen_exit'
    };

    this._materialButton.title = this.options.title[this._map.isFullscreen()];
    this._materialIcon.innerHTML = fullScreenIcon[this._map.isFullscreen()];

    if (this._materialToolTip) {
      this._materialToolTip.innerHTML = this.options.title[this._map.isFullscreen()];
      this._materialButton.removeAttribute('title');
    }
  }
});

L.Control.MaterialZoom = L.Control.Zoom.extend({
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

L.Control.MaterialLayers = L.Control.Layers.extend({
  options: {
      collapsed: true,
      position: 'topright',
      autoZIndex: true,
      hideSingleBase: false
  },

  _initLayout: function () {
    var className = 'leaflet-control-layers-mdl',
        container = this._container = L.DomUtil.create('div', className + ' leaflet-bar-mdl'),
        buttonId = 'leaflet-control-layers-toggle-mdl';

    // adjust timeout time for material menu
    MaterialMenu.prototype.Constant_ = {
      // Total duration of the menu animation.
      TRANSITION_DURATION_SECONDS: 0.3,
      // The fraction of the total duration we want to use for menu item animations.
      TRANSITION_DURATION_FRACTION: 0.8,
      // How long the menu stays open after choosing an option (so the user can see
      // the ripple).
      CLOSE_TIMEOUT: 400
    };

    // makes this work on IE touch devices by stopping it from firing a mouseout event when the touch is released
    container.setAttribute('aria-haspopup', true);

    if (!L.Browser.touch) {
      L.DomEvent
        .disableClickPropagation(container)
        .disableScrollPropagation(container);
    } else {
      L.DomEvent.on(container, 'click', L.DomEvent.stopPropagation);
    }

    // create material menu
    var menuClass = 'mdl-menu mdl-js-menu mdl-js-menu';
    var form = this._form = L.DomUtil.create('ul', menuClass);
    form.setAttribute('for', buttonId)
    if (this.options.materialOptions.rippleEffect) {
      L.DomUtil.addClass(form, 'mdl-js-ripple-effect');
    }
    switch (this.options.position) {
      case 'topleft': 
        L.DomUtil.addClass(form, 'mdl-menu--bottom-left');
        break;
      case 'topright': 
        L.DomUtil.addClass(form, 'mdl-menu--bottom-right');
        break;
      case 'bottomright':
        L.DomUtil.addClass(form, 'mdl-menu--top-right');
        break;
      case 'bottomleft':
        L.DomUtil.addClass(form, 'mdl-menu--top-left');
        break;
    }

    var link = this._layersLink = this._createMaterialButton(buttonId, 'layers', 'Layers', container);

    this._baseLayersList = L.DomUtil.create('div', className + '-base', form);
    this._separator = L.DomUtil.create('div', className + '-separator', form);
    this._overlaysList = L.DomUtil.create('div', className + '-overlays', form);

    var separatorItem = L.DomUtil.create('li', 'mdl-menu__divider', this._separator);
    separatorItem.innerHTML = '<hr />';

    container.appendChild(form);

  },

  _addItem: function (obj) {
    var listClass = 'mdl-menu__item', 
        listItem = L.DomUtil.create('li', listClass),
        label = document.createElement('label'),
        checked = this._map.hasLayer(obj.layer),
        spanLabelClass,
        inputId,
        input;
  
    if (this.options.materialOptions.rippleEffect) {
      L.DomUtil.addClass(label, 'mdl-js-ripple-effect');
    }

    if (obj.overlay) {
      L.DomUtil.addClass(label, 'mdl-checkbox mdl-js-checkbox');
      inputId = 'mdl-layer-checkbox-' + L.stamp(obj.layer);
      label.setAttribute('for', inputId);
      input = L.DomUtil.create('input', 'mdl-checkbox__input');
      input.type = 'checkbox';
      input.defaultChecked = checked;
      input.id = inputId;
      spanLabelClass = 'mdl-checkbox__label';
    } else {
      L.DomUtil.addClass(label, 'mdl-radio mdl-js-radio');
      inputId = 'mdl-layer-option-' + L.stamp(obj.layer);;
      label.setAttribute('for', inputId);
      listItem.innerHTML = this._createRadioElement('leaflet-base-layers', checked);
      input = listItem.firstChild;
      input.id = inputId;
      spanLabelClass = 'mdl-radio__label';
    }

    input.layerId = L.stamp(obj.layer);

    L.DomEvent.on(input, 'click', this._onInputClick, this);

    var name = L.DomUtil.create('span', spanLabelClass);
    name.innerHTML = obj.name;

    label.appendChild(input);
    label.appendChild(name);
    listItem.appendChild(label);
    
    var container = obj.overlay ? this._overlaysList : this._baseLayersList;
    container.appendChild(listItem);

    return listItem;
  },

  // IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see http://bit.ly/PqYLBe)
  _createRadioElement: function (name, checked) {
    var radioHtml = '<input type="radio" class="mdl-radio__button" name="' +
            name + '"' + (checked ? ' checked="checked"' : '') + '/>';

    return radioHtml;
  },
});

L.Control.MaterialGeocoderControl = L.mapbox.GeocoderControl.extend({
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
    setTimeout(function() {
      while (this._results.firstChild) {
          this._results.removeChild(this._results.firstChild);
      }
    }, 200);
  },
  _displayResults: function(features) {
    L.DomUtil.addClass(this._results, 'show-results');
    for (var i = 0, l = Math.min(features.length, 5); i < l; i++) {
      var feature = features[i];
      var name = feature.place_name;
      if (!name.length) continue;

      var r = L.DomUtil.create('a', '', this._results);
      var text = ('innerText' in r) ? 'innerText' : 'textContent';
      r[text] = name;
      r.href = '#';

      (L.bind(function(feature) {
        L.DomEvent.addListener(r, 'click', function(e) {
          this._chooseResult(feature);
          L.DomEvent.stop(e);
          this.fire('select', { feature: feature });
        }, this);
      }, this))(feature);
    }
    if (features.length > 5) {
      var outof = L.DomUtil.create('span', '', this._results);
      outof.innerHTML = 'Top 5 of ' + features.length + '  results';
    }
  },
});
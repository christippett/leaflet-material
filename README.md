# Leaflet Material Controls

Leaflet controls implemented using Google's [Material Design Lite](http://www.getmdl.io/) framework.

Includes the following custom controls:

- Zoom
- Layers
- Fullscreen (requires [Leaflet-Fullscreen](https://github.com/Leaflet/Leaflet.fullscreen))
- Geocoder (requires [Mapbox](https://github.com/mapbox/mapbox.js))

🌍 [View demo](http://christippett.github.io/leaflet-material/).

# Installation

Download and use the `leaflet-material.css` and `leaflet-material.js` files located in the `dist/` folder.

```html
<script src="leaflet-material.js"></script>
<link href="leaflet-material.css" rel="stylesheet" />
```

## 3rd-Party Dependencies

Requires JS/CSS files from Leaflet/Mapbox and Material Design Lite.

[Material Design Lite](http://www.getmdl.io/started/index.html#download)

```html
<link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css" />
<script src="https://code.getmdl.io/1.3.0/material.min.js"></script>
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

[Mapbox](https://www.mapbox.com/mapbox.js/api/v2.2.1/)

```html
<script src="https://api.mapbox.com/mapbox.js/v3.3.1/mapbox.js"></script>
<link href="https://api.mapbox.com/mapbox.js/v3.3.1/mapbox.css" rel="stylesheet" />
```

[Leaflet](http://leafletjs.com/download.html)

```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
```

[Leaflet-Fullscreen](https://github.com/Leaflet/Leaflet.fullscreen)

```html
<link
  href="https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/leaflet.fullscreen.css"
  rel="stylesheet"
/>
```

# Usage

The material-flavoured controls are implemented as `L.materialControl.<Control>`, e.g. the default `L.Control.Zoom` is 'materialised' as `L.materialControl.Zoom`.

You can swap the default controls for the material ones as followed:

- `L.Control.Zoom` -> `L.materialControl.Zoom`
- `L.Control.Fullscreen` -> `L.materialControl.Fullscreen`
- `L.Control.Layers` -> `L.materialControl.Layers`
- `L.mapbox.GeocoderControl` -> `L.materialControl.Geocoder`

Example:

```
// Material zoom control:
var materialZoomControl = new L.materialControl.Zoom({position: 'topright', materialOptions: materialOptions}).addTo(map);
```

Lowercase shortcuts are also included that allow you to create controls without the new keyword.

```
L.materialControl.zoom({position: 'topright', materialOptions: materialOptions}).addTo(map);
```

## Configuration Options

`L.Control` has been extended to include additional options specific to leaflet-material. These options allow you to specify the type of material button to be used, whether tooltips should be included or if the ripple effect should be applied.

```
var materialOptions = {
  fab: true,
  miniFab: true,
  rippleEffect: true,
  toolTips: false,
  color: 'primary'
}
```

The options correspond with the parameters stated in the [Material Design Lite](http://www.getmdl.io/components/index.html#buttons-section) framework. The `color` option can be one of either `primary`, `accent` or any of the colour palletes included in the framework (`red-400`, `purple-50`, `indigo-200`, etc).

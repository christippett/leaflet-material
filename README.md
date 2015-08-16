# leaflet-material
Leaflet controls implemented using Google's [Material Design Lite](http://www.getmdl.io/) framework.

The controls currently included in this project are:
* Zoom
* Fullscreen (from [Leaflet-Fullscreen](https://github.com/Leaflet/Leaflet.fullscreen))
* Layers
* Geocoder (requires [Mapbox](https://github.com/mapbox/mapbox.js))

A demo including all of the included controls is [available here](http://christippett.github.io/leaflet-material/). 

# Installation
## Ready-to-go files
Use the `leaflet-material.min.css` and `leaflet-material.min.js` files located in the `dist/` folder.

```
<script src="leaflet-material.min.js"></script>
<link href='leaflet-material.min.css' rel='stylesheet' />
```

Requires css and javascript files from Leaflet/Mapbox and Material Design Lite. Note: [Leaflet-Fullscreen](https://github.com/Leaflet/Leaflet.fullscreen) is already included in the distribution and isn't required to be referenced externally.

[Material Design Lite](http://www.getmdl.io/started/index.html#download)
```
<link rel="stylesheet" href="https://storage.googleapis.com/code.getmdl.io/1.0.2/material.indigo-pink.min.css" />
<script src="https://storage.googleapis.com/code.getmdl.io/1.0.2/material.min.js"></script>
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

[Mapbox](https://www.mapbox.com/mapbox.js/api/v2.2.1/)
```
<script src='https://api.mapbox.com/mapbox.js/v2.2.1/mapbox.js'></script>
<link href='https://api.mapbox.com/mapbox.js/v2.2.1/mapbox.css' rel='stylesheet' />
```

[Leaflet](http://leafletjs.com/download.html)
```
<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" />
<script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
```

## Browserify
Install module using npm
`npm install --save leaflet-material-controls`


# Implementation
## Usage
The material-flavoured controls are implemented as `L.materialControl.<Control>`, e.g. the default `L.Control.Zoom` is 'materialised' as `L.materialControl.Zoom`.

You can swap the default controls for the material ones as followed:
* `L.Control.Zoom` -> `L.materialControl.Zoom`
* `L.Control.Fullscreen` -> `L.materialControl.Fullscreen`
* `L.Control.Layers` -> `L.materialControl.Layers`
* `L.mapbox.GeocoderControl` -> `L.materialControl.Geocoder`

Example:
```
// Material zoom control:
var materialZoomControl = new L.materialControl.Zoom({position: 'topright', materialOptions: materialOptions}).addTo(map);
```

Lowercase shortcuts are also included that allow you to create controls without the new keyword.
```
L.materialControl.zoom({position: 'topright', materialOptions: materialOptions}).addTo(map);
```

## Options
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


# Mapbox GL JS Layer Switcher

Adds a Layer switcher to `mapbox-gl`

## Installation:

```bash
npm i mapbox-layer-switcher --save
```

## Usage:

```ts
import { MapboxLayerSwitcherControl } from "mapbox-layer-switcher";
import { Map as MapboxMap } from "mapbox-gl";

import "mapbox-layer-switcher/styles.css";

const map = new MapboxMap();
map.addControl(new MapboxLayerSwitcherControl());
```

## Options:
If you want to supply your own list of layers, pass them in the constructor.

```ts
import { MapboxLayerDefinition, MapboxLayerSwitcherControl } from "mapbox-layer-switcher";

const layers: MapboxLayerDefinition[] = [
    {
        id: "here-map",
        title: "Here",
        visibility: 'visible',
        type: 'base'
    },
    {
        id: "google-map",
        title: "Google",
        visibility: 'none',
        type: 'base'
    },
    {
        id: "composite",
        title: "MapBox",
        visibility: 'none',
        type: 'base'
    }
];

map.addControl(new MapboxLayerSwitcherControl(layers));
```

## Screenshots

![Closed](assets/closed.png)

![Open](assets/open.png)
import { IControl, Map as MapboxMap } from "mapbox-gl";

export type MapboxLayerDefinition =
{
    title: string;
    id: string;
    type: string;
    visibility: string;
}

export class MapboxLayerSwitcherControl implements IControl
{
    private static readonly DEFAULT_LAYER = "";
    private static readonly DEFAULT_LAYERS = [];

    private controlContainer: HTMLElement | undefined;
    private layers: MapboxLayerDefinition[];

    constructor(layers?: MapboxLayerDefinition[])
    {
        this.layers = layers || MapboxLayerSwitcherControl.DEFAULT_LAYERS;
    }

    public getDefaultPosition(): string
    {
        const defaultPosition = "top-right";
        return defaultPosition;
    }

    public onAdd(map: MapboxMap): HTMLElement
    {
        this.controlContainer = document.createElement("div");
        this.controlContainer.classList.add("mapboxgl-ctrl");
        this.controlContainer.classList.add("mapboxgl-ctrl-group");
        const mapLayerContainer = document.createElement("div");
        const layerButton = document.createElement("button");
        mapLayerContainer.classList.add("mapboxgl-layer-list");
        for (const layer of this.layers)
        {
            const layerElement = document.createElement("button");
            layerElement.innerText = layer.title;
            layerElement.classList.add(layer.title.replace(/[^a-z0-9-]/gi, '_'));
            layerElement.dataset.id = layer.id // JSON.stringify(layer.id);
            layerElement.dataset.type = layer.type;
            layerElement.addEventListener("click", event =>
            {
                const srcElement = event.srcElement as HTMLButtonElement;
                // map.setStyle(JSON.parse(srcElement.dataset.id!));
                if(layerElement.dataset.type === 'base') {
                    this.layers.forEach(item => {
                        map.setLayoutProperty(item.id, 'visibility', 'none');        
                    });
                }
                map.setLayoutProperty(srcElement.dataset.id!, 'visibility', 'visible');
                mapLayerContainer.style.display = "none";
                layerButton.style.display = "block";
                const elms = mapLayerContainer.getElementsByClassName("active");
                while (elms[0])
                {
                    elms[0].classList.remove("active");
                }
                srcElement.classList.add("active");
            });
            if (layer.visibility === 'visible')
            {
                layerElement.classList.add("active");
            }
            mapLayerContainer.appendChild(layerElement);
        }
        layerButton.classList.add("mapboxgl-ctrl-icon");
        layerButton.classList.add("mapboxgl-layer-switcher");
        layerButton.addEventListener("click", () =>
        { 
            layerButton.style.display = "none";
            mapLayerContainer.style.display = "block";
        });

        document.addEventListener("click", event =>
        {
            if (!this.controlContainer!.contains(event.target as Element))
            {
                mapLayerContainer.style.display = "none";
                layerButton.style.display = "block";
            }
        });

        this.controlContainer.appendChild(layerButton);
        this.controlContainer.appendChild(mapLayerContainer);
        return this.controlContainer;
    }

    public onRemove(): void
    {
        return;
    }
}
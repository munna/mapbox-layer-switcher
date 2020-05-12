import { IControl, Map as MapboxMap } from "mapbox-gl";
export declare type MapboxLayerDefinition = {
    title: string;
    id: string;
    type: string;
};
export declare class MapboxLayerSwitcherControl implements IControl {
    private static readonly DEFAULT_LAYER;
    private static readonly DEFAULT_LAYERS;
    private controlContainer;
    private layers;
    constructor(layers?: MapboxLayerDefinition[]);
    getDefaultPosition(): string;
    onAdd(map: MapboxMap): HTMLElement;
    onRemove(): void;
}

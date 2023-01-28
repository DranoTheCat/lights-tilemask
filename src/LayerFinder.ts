import { Texture } from '@pixi/core';
import { Group, Layer } from '@pixi/layers';

/**
 * @memberof PIXI.lights
 * @static
 * @type {PIXI.layers.Group}
 */
export const diffuseGroup = new Group(0, false);

/**
 * @memberof PIXI.lights
 * @static
 * @type {PIXI.layers.Group}
 */
export const normalGroup = new Group(0, false);
export const skyGroup = new Group(-1, false);
export const fowGroup = new Group(-2, false);

/**
 * @memberof PIXI.lights
 * @static
 * @type {PIXI.layers.Group}
 */
export const lightGroup = new Group(0, false);

diffuseGroup.useRenderTexture = true;
normalGroup.useRenderTexture = true;
skyGroup.useRenderTexture = true;
fowGroup.useRenderTexture = true;

/**
 * @memberof PIXI.lights
 */
export class LayerFinder
{
    /**
     * Last layer
     * @type {PIXI.layers.Layer}
     */
    lastLayer: Layer | null = null;
    /**
     * Diffuse texture
     * @type {PIXI.Texture}
     */
    diffuseTexture: Texture | null = null;
    /**
     * Normal texture
     * @type {PIXI.Texture}
     */
    normalTexture: Texture | null = null;
    skyTexture: Texture | null = null;
    fowTexture: Texture | null = null;

    /**
     * Check
     * @param {PIXI.layers.Layer} layer -
     */
    check(layer: Layer): void
    {
        if (this.lastLayer === layer)
        {
            return;
        }
        this.lastLayer = layer;

        const stage = layer._activeStageParent;
        const layerAny = layer as any;

        this.diffuseTexture = Texture.WHITE;
        this.normalTexture = Texture.WHITE;
        this.skyTexture = Texture.WHITE;
        this.fowTexture = Texture.WHITE;

        if (layerAny.diffuseTexture && layerAny.normalTexture && layerAny.skyTexture && layerAny.fowTexture)
        {
            this.diffuseTexture = layerAny.diffuseTexture;
            this.normalTexture = layerAny.normalTexture;
            this.skyTexture = layerAny.skyTexture;
            this.fowTexture = layerAny.fowTexture;
        }
        else
        {
            for (let j = 0; j < stage._activeLayers.length; j++)
            {
                const texLayer = stage._activeLayers[j];

                if (texLayer.group === normalGroup)
                {
                    this.normalTexture = texLayer.getRenderTexture();
                }
                if (texLayer.group === diffuseGroup)
                {
                    this.diffuseTexture = texLayer.getRenderTexture();
                }
                if (texLayer.group === skyGroup)
                {
                    this.skyTexture = texLayer.getRenderTexture();
                }
                if (texLayer.group === fowGroup)
                {
                    this.fowTexture = texLayer.getRenderTexture();
                }
            }
        }
    }

    static _instance = new LayerFinder();
}

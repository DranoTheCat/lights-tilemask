import { Light } from '../light/Light';
import { AmbientLightShader, SkyLightShader } from './AmbientLightShader';
import { BLEND_MODES } from '@pixi/core';

/**
 * Ambient light is drawn using a full-screen quad.
 * @memberof PIXI.lights
 */
export class AmbientLight extends Light
{
    /**
     * @param {number} [color=0xFFFFFF] - The color of the light.
     * @param {number} [brightness=0.5] - The brightness of the light.
     */
    constructor(color = 0xFFFFFF, brightness = 0.5)
    {
        super(color, brightness, new AmbientLightShader());
    }
}

/**
 * Ambient light is drawn using a full-screen quad.
 * @memberof PIXI.lights
 */
export class SkyLight extends Light
{
    /**
     * @param {number} [color=0xFFFFFF] - The color of the light.
     * @param {number} [brightness=1.0] - The brightness of the light.
     */
    constructor(color = 0xFFFFFF, brightness = 1.0)
    {
        super(color, brightness, new SkyLightShader());
        //this.blendMode = BLEND_MODES.NORMAL;
    }
}

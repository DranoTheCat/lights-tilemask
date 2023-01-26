import { Program } from '@pixi/core';
import { LightShader } from '../light/LightShader';
import { ambientFrag } from './ambient.frag';
import { skyFrag } from './sky.frag';

/**
 * @memberof PIXI.lights
 */
export class AmbientLightShader extends LightShader
{
    constructor()
    {
        super({
            program: AmbientLightShader._program
        });
    }

    static _program = new Program(LightShader.defaultVertexSrc, ambientFrag);
}

/**
 * @memberof PIXI.lights
 */
export class SkyLightShader extends LightShader
{
    constructor()
    {
        super({
            program: SkyLightShader._program
        });
    }

    static _program = new Program(LightShader.defaultVertexSrc, skyFrag);
}

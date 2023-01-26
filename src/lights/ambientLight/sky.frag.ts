import { commonUniforms, computeVertexPosition } from '../shared';

export const skyFrag = `precision highp float;

${commonUniforms}

void main(void)
{
${computeVertexPosition}

//vec4 normalColor = texture2D(uNormalSampler, texCoord);
vec4 diffuseColor = texture2D(uSampler, texCoord);
if (diffuseColor.a == 0.0) {
    vec4 skyColor = texture2D(uSkySampler, texCoord);
    gl_FragColor = vec4(skyColor.r * uBrightness, skyColor.g * uBrightness, skyColor.b * uBrightness, 1.0);
} else {
    discard;
}


}
`;


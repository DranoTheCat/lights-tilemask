import { commonUniforms, computeVertexPosition, loadNormals } from '../shared';

export const skyFrag = `precision highp float;

${commonUniforms}

void main(void)
{
${computeVertexPosition}
${loadNormals}

vec4 diffuseColor = texture2D(uSampler, texCoord);
vec4 skyColor = texture2D(uSkySampler, texCoord);
gl_FragColor = skyColor;

}
`;

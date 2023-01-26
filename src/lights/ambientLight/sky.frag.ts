import { commonUniforms, computeVertexPosition } from '../shared';

export const skyFrag = `precision highp float;

${commonUniforms}

void main(void)
{
${computeVertexPosition}

vec4 normalColor = texture2D(uNormalSampler, texCoord);

if (normalColor.a == 0.0) {
    vec4 skyColor = texture2D(uSkySampler, texCoord);
    gl_FragColor = skyColor;
} else {
    discard;
}

}
`;

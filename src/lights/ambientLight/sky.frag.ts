import { commonUniforms, computeVertexPosition } from '../shared';

export const skyFrag = `precision highp float;

${commonUniforms}

void main(void)
{
${computeVertexPosition}

vec4 normalColor = texture2D(uNormalSampler, texCoord);

// dfeault normal is 7f7fff == vec3(0.498,0.498,1.0)
if (normalColor.a == 0.0 || (normalColor.r == 0.498 && normalColor.g == 0.498 && normalColor.b == 1.0)) {
    vec4 skyColor = texture2D(uSkySampler, texCoord);
    gl_FragColor = skyColor;
} else {
    discard;
}

}
`;

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
    //gl_FragColor = skyColor;
    gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
} else {
    discard;
}

}
`;

import { commonUniforms, computeVertexPosition } from '../shared';

export const skyFrag = `precision highp float;

${commonUniforms}

void main(void)
{
${computeVertexPosition}

vec4 diffuseColor = texture2D(uSampler, texCoord);
if (diffuseColor.a == 0.0) {
    vec4 skyColor = texture2D(uSkySampler, texCoord);
    gl_FragColor = skyColor;
} else {
    // simplified lambert shading that makes assumptions for ambient color
    vec3 diffuse = uColor.rgb * uBrightness;
    vec3 finalColor = diffuseColor.rgb * diffuse;
    gl_FragColor = vec4(finalColor, diffuseColor.a);
}

}
`;

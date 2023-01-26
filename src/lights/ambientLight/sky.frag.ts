import { commonUniforms, computeVertexPosition, loadNormals } from '../shared';

export const skyFrag = `precision highp float;

${commonUniforms}

void main(void)
{
${computeVertexPosition}
${loadNormals}

vec4 diffuseColor = texture2D(uSampler, texCoord);
vec4 skyColor = texture2D(uSkySampler, texCoord);
if (skyColor.r == diffuseColor.r && skyColor.g == diffuseColor.g && skyColor.b == diffuseColor.b) {
    if (skyColor.a == diffuseColor.a) {
        vec3 diffuse = uColor.rgb * uBrightness;
        vec4 diffuseColor = texture2D(uSampler, texCoord);
        vec3 finalColor = diffuseColor.rgb * diffuse;
        gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
        //gl_FragColor = vec4(finalColor, diffuseColor.a);
    }
}

}
`;

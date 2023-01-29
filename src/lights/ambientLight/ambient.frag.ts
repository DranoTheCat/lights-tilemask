import { commonUniforms, computeVertexPosition, loadNormals } from '../shared';

export const ambientFrag = `precision highp float;

${commonUniforms}

void main(void)
{
${computeVertexPosition}
${loadNormals}
    // simplified lambert shading that makes assumptions for ambient color
    vec4 fowColor = texture2D(uFowSampler, texCoord);

    vec3 diffuse = uColor.rgb * uBrightness;
    vec4 diffuseColor = texture2D(uSampler, texCoord);
    vec3 finalColor = diffuseColor.rgb * diffuse;

    vec4 finalFinalColor = vec4(finalColor, diffuseColor.a) * fowColor;

    //gl_FragColor = finalFinalColor;
    gl_FragColor = fowColor;
}
`;

/* eslint-disable @typescript-eslint/no-inferrable-types */
export const combine: string = `vec3 intensity = diffuse * attenuation;
vec4 diffuseColor = texture2D(uSampler, texCoord);
if (testColor.r == normalColor.r && testColor.g == normalColor.g && testColor.b == normalColor.b) {
    gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
    //gl_FragColor = skyColor;
    //gl_FragColor = vec4(diffuseColor.rgb, diffuseColor.a);
    //gl_FragColor = diffuseColor;
    //gl_FragColor = vec4(diffuseColor.r, diffuseColor.g, diffuseColor.b, diffuseColor.a);
} else {
    vec3 finalColor = diffuseColor.rgb * intensity;
    //gl_FragColor = vec4(normalColor.rgb, 1.0);
    //gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    gl_FragColor = vec4(finalColor.rgb, diffuseColor.a);
}
`;

export const commonUniforms: string = `uniform sampler2D uSampler;
uniform sampler2D uNormalSampler;
uniform sampler2D uSkySampler;

uniform mat3 translationMatrix;

uniform vec2 uViewPixels;   // size of the viewport, in pixels
uniform vec2 uViewSize;     // size of the viewport, in CSS

uniform vec4 uColor;   // light color, alpha channel used for intensity.
uniform float uBrightness;
uniform vec3 uLightFalloff; // light attenuation coefficients (constant, linear, quadratic)
uniform float uLightHeight; // light height above the viewport
uniform float uFlipY;             // whether we use renderTexture, FBO is flipped
`;

export const computeDiffuse: string = `// normalize vectors
vec3 N = normalize(normalColor.xyz * 2.0 - 1.0);
vec3 L = normalize(lightVector);

// pre-multiply light color with intensity
// then perform "N dot L" to determine our diffuse
// if the normal color is 0x000000 skip.  Weird hack, sorry, whatever.
vec3 diffuse;
vec3 testColor = vec3(0.0,1.0,0.0);
if (testColor.r == normalColor.r && testColor.g == normalColor.g && testColor.b == normalColor.b) {
    diffuse = vec3(1.0, 1.0, 1.0);
} else {
    diffuse = uColor.rgb * uBrightness * max(dot(N, L), 0.0);
}
`;

export const computeVertexPosition: string = `vec2 texCoord = gl_FragCoord.xy / uViewPixels;
texCoord.y = (1.0 - texCoord.y) * uFlipY + texCoord.y * (1.0 - uFlipY); // FBOs positions are flipped.
`;

export const loadNormals: string = `vec4 normalColor = texture2D(uNormalSampler, texCoord);
vec4 skyColor = texture2D(uSkySampler, texCoord);
normalColor.g = 1.0 - normalColor.g; // Green layer is flipped Y coords.

// bail out early when normal has no data
if (normalColor.a == 0.0) discard;
`;

export const vert: string = `attribute vec2 aVertexPosition;

uniform bool uUseViewportQuad;
uniform mat3 translationMatrix;
uniform mat3 projectionMatrix;

void main(void) {
    if (uUseViewportQuad) {
        gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    }
    else
    {
        gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    }
}
`;

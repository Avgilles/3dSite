import * as THREE from "./lib/three.module.js";
import Global from "./global.js";


export default class Light extends THREE.Light {

    constructor() {
        super();
        this.update = this.update.bind(this);
        /** Create a directionnal light */
        this.dlightL = new THREE.DirectionalLight(0xffffff);
        this.dlightL.position.set(-5, 6, 6);
        this.dlightL.intensity = 1;
        this.dlightL.castShadow = true;
        this.dlightL.shadow.mapSize.set(2048, 2048);
        this.dlightL.shadow.radius = 3;
        this.dlightL.shadow.bias = -0.00001;
        this.dlightL.color;

        this.dlightR = new THREE.DirectionalLight();
        this.dlightR.position.set(5, 6, 6);
        this.dlightR.intensity = 1;
        this.dlightR.castShadow = true;
        this.dlightR.shadow.mapSize.set(2048, 2048);
        this.dlightR.shadow.radius = 3;
        this.dlightR.shadow.bias = -0.00001;



        /** Create an ambiant light: 2 param , the color and the intensity */
        this.alight = new THREE.AmbientLight();
        this.alight.intensity = .1;
        this.helper = new THREE.DirectionalLightHelper(this.dlightL, 1);
        this.clonedhelper = new THREE.DirectionalLightHelper(this.dlightR, 1);


        /** Rectlight */
        // this.rectlight = new THREE.RectAreaLight( 0xffffff, 10, 10 , 10);

        // this.rectlight.intensity = 10;
        // this.rectlight.width = 10;
        // this.rectlight.height = 10;
        // this.rectlight.position.set(-5, -5, -5);
        // this.rectlight.lookAt(0, 0, 0);
        // this.rectlight.visible = false;


        // this.add(this.clonedlight, this.alight);


        this.add( this.dlightL, this.helper, this.dlightR, this.clonedhelper);

    }
    godray(){
        /*!
     * THREE.Extras.Shaders contains extra Fx shaders like godrays
     *
     * @author Thibaut 'BKcore' Despoulain <http://bkcore.com>
     *
     */

        THREE = THREE || {};
        THREE.Extras = THREE.Extras || {};

        THREE.Extras.Shaders = {
            // Volumetric Light Approximation (Godrays)
            Godrays: {
                uniforms: {
                    tDiffuse: {type: "t", value:0, texture:null},
                    fX: {type: "f", value: 0.5},
                    fY: {type: "f", value: 0.5},
                    fExposure: {type: "f", value: 0.6},
                    fDecay: {type: "f", value: 0.93},
                    fDensity: {type: "f", value: 0.96},
                    fWeight: {type: "f", value: 0.4},
                    fClamp: {type: "f", value: 1.0}
                },

                vertexShader: [
                    "varying vec2 vUv;",

                    "void main() {",

                    "vUv = uv;",
                    "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

                    "}"
                ].join("\n"),

                fragmentShader: [
                    "varying vec2 vUv;",
                    "uniform sampler2D tDiffuse;",

                    "uniform float fX;",
                    "uniform float fY;",
                    "uniform float fExposure;",
                    "uniform float fDecay;",
                    "uniform float fDensity;",
                    "uniform float fWeight;",
                    "uniform float fClamp;",

                    "const int iSamples = 20;",

                    "void main()",
                    "{",
                    "vec2 deltaTextCoord = vec2(vUv - vec2(fX,fY));",
                    "deltaTextCoord *= 1.0 /  float(iSamples) * fDensity;",
                    "vec2 coord = vUv;",
                    "float illuminationDecay = 1.0;",
                    "vec4 FragColor = vec4(0.0);",

                    "for(int i=0; i < iSamples ; i++)",
                    "{",
                    "coord -= deltaTextCoord;",
                    "vec4 texel = texture2D(tDiffuse, coord);",
                    "texel *= illuminationDecay * fWeight;",

                    "FragColor += texel;",

                    "illuminationDecay *= fDecay;",
                    "}",
                    "FragColor *= fExposure;",
                    "FragColor = clamp(FragColor, 0.0, fClamp);",
                    "gl_FragColor = FragColor;",
                    "}"
                ].join("\n")
            },

            // Coeff'd additive buffer blending
            Additive: {
                uniforms: {
                    tDiffuse: { type: "t", value: 0, texture: null },
                    tAdd: { type: "t", value: 1, texture: null },
                    fCoeff: { type: "f", value: 1.0 }
                },

                vertexShader: [
                    "varying vec2 vUv;",

                    "void main() {",

                    "vUv = uv;",
                    "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

                    "}"
                ].join("\n"),

                fragmentShader: [
                    "uniform sampler2D tDiffuse;",
                    "uniform sampler2D tAdd;",
                    "uniform float fCoeff;",

                    "varying vec2 vUv;",

                    "void main() {",

                    "vec4 texel = texture2D( tDiffuse, vUv );",
                    "vec4 add = texture2D( tAdd, vUv );",
                    "gl_FragColor = texel + add * fCoeff;",

                    "}"
                ].join("\n")
            }
        };

    }

    update() {

    }
}

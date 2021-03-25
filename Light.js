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
        this.dlightL.color

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
        this.rectlight = new THREE.RectAreaLight( 0xffffff, 10, 10 , 10);

        // this.rectlight.intensity = 10;
        // this.rectlight.width = 10;
        // this.rectlight.height = 10;
        this.rectlight.position.set(-5, -5, -5);
        this.rectlight.lookAt(0, 0, 0);
        this.rectlight.visible = false;


        // this.add(this.clonedlight, this.alight);


        this.add( this.dlightL, this.helper, this.dlightR, this.clonedhelper);

    }

    update() {

    }
}


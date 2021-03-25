import * as THREE from "./lib/three.module.js";
import {OrbitControls} from "./lib/OrbitControls.js";
import Stats from "./lib/stats.module.js";
import {Objects, Pilar} from "./Objects.js";
import Tree from "./tree.js";
import Global from './global.js';
import Light from "./Light.js";

export default class Main {

    constructor(){

        this.update = this.update.bind(this);
        this.onResize = this.update.bind(this);

        this.scene;
        this.camera;
        this.renderer;

        this.init();
    }

    init(){

        this.scene =  new THREE.Scene();
        // 4 param -> lenght of the focale, ratio of the scene (here the size of the window), the clayping (what will be calculated in the scene)
        this.camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, .1, 500);
        this.renderer = new THREE.WebGLRenderer({antialias:true} /*{alpha:true}*/);

        // render the shadow 👇
        this.renderer.shadowMap.enabled = true;
        console.log(this.renderer.getMaxAnisotropy);

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        // si le canvas n'est pas spécifié il sera crée automatiquement


        this.camera.position.z = 5;
        this.camera.position.y = 1.5;
        this.camera.lookAt(0,2,0)



        window.addEventListener('resize', this.onResize, false);
        document.body.appendChild(this.renderer.domElement);

        this.Stats= new Stats();
        document.body.appendChild(this.Stats.dom);

        this.OrbitControls= new OrbitControls(this.camera, this.renderer.domElement);

        this.scene.fog = new THREE.FogExp2(0x000000, 0.1);
        this.scene.background = new THREE.Color(0x00000f);

        this.skyTexture =  new THREE.TextureLoader().load("./assets/textures/skydome.jpg", ()=>{

            this.skyEquiMap = new THREE.WebGLCubeRenderTarget(1024).fromEquirectangularTexture(this.renderer, this.skyTexture);
            Global.instance.envMap = this.skyEquiMap;
            this.scene.background = this.skyEquiMap;

            this.initObject();

        });


        this.update();

    }

    initObject(){

        this.objects = new Objects();
        this.light = new Light();
        this.scene.add(this.objects, this.light);
        // this.tree = new Tree();
        // this.scene.add(this.tree);
        this.pilar = new Pilar();
        this.scene.add(this.pilar)
    }

    onResize(){

        const width = window.innerWidth;
        const height = window.innerHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);

    }


    update(){
        // console.log("update");

        requestAnimationFrame(this.update);

        // this.dlight && (this.dlight.position.x += .01);
        // this.helper && this.helper.update();

        this.objects && this.objects.update();
        this.tree && this.tree.update();

        this.renderer.render(this.scene, this.camera);

        this.Stats.update();

    }


}
 new Main();


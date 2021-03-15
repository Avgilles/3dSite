import * as THREE from "./lib/three.module.js";
import {OrbitControls} from "./lib/OrbitControls.js";
import Stats from "./lib/stats.module.js";
import Objects from "./Objects.js";
import Tree from "./tree.js";

export default class Main {

    constructor(){

        this.update = this.update.bind(this);
        this.onResize = this.update.bind(this);
        // cette methode permet d'utiliser les fonctions des scopes ici.

        this.scene;
        this.camera;
        this.renderer;

        this.init();

    }

    init(){

        this.scene =  new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
        // 4 param -> lenght of the focale, ratio of the scene (here the size of the window), the clayping (what will be calculated in the scene)

        this.renderer = new THREE.WebGLRenderer({antialias:true} /*{alpha:true}*/);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        // si le canvas n'est pas spécifié il sera crée automatiquement


        this.camera.position.z = 2;



        window.addEventListener('resize', this.onResize, false);
        document.body.appendChild(this.renderer.domElement);

        this.Stats= new Stats();
        document.body.appendChild(this.Stats.dom);

        this.OrbitControls= new OrbitControls(this.camera, this.renderer.domElement);


        this.update();

        this.initObject();
    }

    initObject(){
        this.dlight = new THREE.DirectionalLight();
        this.dlight.position.z = 5;
        this.dlight.position.y = 5;
        this.dlight.position.y = 5
        this.scene.add(this.dlight);

        this.helper = new THREE.DirectionalLightHelper(this.dlight, 1);
        this.scene.add(this.helper);


        this.objects = new Objects();
        this.scene.add(this.objects);
        this.tree = new Tree();
        this.scene.add(this.tree);
    }

    onResize(){

        const width = window.innerWidth;
        const height = window.innerHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);

    }


    update(){
        console.log("update");

        requestAnimationFrame(this.update);

        this.dlight && (this.dlight.position.x += .01);
        this.helper && this.helper.update();



        this.renderer.render(this.scene, this.camera);

        this.Stats.update();

    }


}
 new Main();


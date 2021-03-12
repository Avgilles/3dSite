import * as THREE from "./lib/three.module.js";

export default class Objects extends THREE.Object3D {

    constructor(){
        // when we extends an object, if we want to use the proprety of the parent we use the fonction super()
        super();

        //material 🌈
        const materialColor = new THREE.MeshBasicMaterial({color: 0xff00aa});
        const materialColorGreen = new THREE.MeshBasicMaterial({color: 0x00ff00});

        // box 🟥
        this.boxGeometry = new THREE.BoxGeometry(1,1,1);
        // sphere 🟢
        this.sphereGeometry = new THREE.SphereGeometry(1,12,12);
        // plane 🔳
        this.planeGeometry = new THREE.PlaneGeometry(20, 20);

        // creation of the mesh
        this.boxMesh = new THREE.Mesh(this.boxGeometry, materialColor);
        this.planeMesh = new THREE.Mesh(this.planeGeometry, materialColorGreen);

        // modify mesh
        this.planeMesh.rotation.x = THREE.Math.degToRad(-90);
        this.planeMesh.position.y = -1;

        this.boxMesh.position.x =  -1;

        // adding to objects class, later in init object we will add this to the scene.
        this.add(this.boxMesh);
        this.add(this.planeMesh);

    }

}

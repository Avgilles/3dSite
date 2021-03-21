import * as THREE from "./lib/three.module.js";
import tree from "./tree.js";

export default class Objects extends THREE.Object3D {

    constructor(){
        // when we extends an object, if we want to use the proprety of the parent we use the fonction super()
        super();
        this.update = this.update.bind(this);

        //material 🌈
        const materialColor = new THREE.MeshStandardMaterial({color: 0xff00aa});
        const materialColorGreen = new THREE.MeshStandardMaterial({color: 0x00ff00, side:THREE.DoubleSide});
        const materialWhite = new THREE.MeshStandardMaterial({color: 0xffffff});

        // box 🟥
        this.boxGeometry = new THREE.BoxGeometry(1,1,1);
        // sphere 🟢
        this.sphereGeometry = new THREE.SphereGeometry(1,12,12);
        // plane 🔳
        this.planeGeometry = new THREE.PlaneGeometry(20, 20);

        // this.logoGeometry = new THREE.BoxGeometry(1,1,1);

        // creation of the mesh
        this.boxMesh = new THREE.Mesh(this.boxGeometry, materialColor);
        this.planeMesh = new THREE.Mesh(this.planeGeometry, materialWhite);

        // modify mesh
        this.planeMesh.rotation.x = THREE.Math.degToRad(-90);
        this.planeMesh.position.y = -1;
        this.planeMesh.receiveShadow = true;

        this.boxMesh.position.set(0,0,3);
        this.boxMesh.receiveShadow = true;
        this.boxMesh.castShadow = true;

        // adding to objects class, later in init object we will add this to the scene.
        this.add(this.boxMesh);
        this.add(this.planeMesh);

    }

    update(){
        this.boxMesh.rotation.x += THREE.Math.degToRad(1);
        this.boxMesh.rotation.y += THREE.Math.degToRad(0.1);
    }
}

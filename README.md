# 3dSite #
**A short website with tree.js Frameworks**  
This is the basic setup. 
  
This is reedmee contain somes informations to remember.
***


## import THREE.JS ##
To use three.js we must import the framework. We can use a cdn but it can be painlesss if you don't understand the framework and less performing. 
I advise you to download it [here](https://github.com/mrdoob/three.js/archive/master.zip).

To begin use 3 files :

1. **three.module.js** in *"/three.js-master/build"* (all three.js fonctions)
2. **OrbitControls.js** in  *"/three.js-master/examples/jsm/controls"* (to moove around in the renderer)
3. **stats.module.js** in *"/three.js-master/examples/jsm/libs"* (To know all the stat you need to create a perform website);

then place these in a folder call **"lib"**, the name doesn't matter.
create a main.js file at root and import you're lib folder
```js
import * as THREE from "./lib/three.module.js";
import {OrbitControls} from "./lib/OrbitControls.js";
import Stats from "./lib/stats.module.js";
```

then create a HTML FILE named index.html and import main.js
```HTML
<script type="module" src="main.js"></script>
```
### Create the scene ### 

The best usage is to create a fonction init to place it in a class.
    
1. Create a camera with 4 params
2. Create the renderer 
 ```js
export default class Main {

    constructor(){
        this.init();
    }
    init(){

        this.scene =  new THREE.Scene();
        // 4 param -> lenght of the focale, ratio of the scene (here the size of the window), the clayping (what will be calculated in the scene)
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);

        this.renderer = new THREE.WebGLRenderer({antialias:true} /*{alpha:true}*/);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        //we placed the camera 
        this.camera.position.z = 2;
    }
}
 new Main();

  ```

All the scene will render in a canvas tag, if it's not create three.js will automaticaly create one for you.


### Create a object ###
 ```js
// for sphere
this.yourSphereGeometry = new THREE.SphereGeometry(1,12,12);
// for box
this.yourBoxGeometry = new THREE.BoxGeometry(1,12,12);
```
###Assign material ####
You can use MeshBasicMaterial to assign a color
 ```js
const yourMaterialColor = new THREE.MeshBasicMaterial({color: 0xff00aa});
```
### create the object and place it in to the scene
```js
                                 // 👇 the mesh      👇 the material
this.boxMesh = new THREE.Mesh(this.yourBoxGeometry ,yourMaterialColor );

// add to the scene
this.scene.add(this.boxMesh);

```

There are 3 differents parameters for all object :

* Position
```js
//All 3 axes
this.yourMesh.scale.set(1,1,1);
//Only x axes
this.yourMesh.position.x = -3;
```
* Rotation
```js
// rotation is in radian
//All 3 axes
this.yourMesh.rotation.set(-25,80,260);
//Only Y axes
this.yourMesh.rotation.y = 25 ;
```
* Scale
```js
//All 3 axes
this.yourMesh.scale.set(.1,1,.1);
//Only Z axes
this.yourMesh.scale.z = Math.PI / 4 ;
// use degres rotation
this.yourMesh.scale.z = Math.Math.degToRad(45);
```

### clone an object

```js
this.yourParentMesh = new THREE.Mesh(this.yourParentMesh);
```

### Visible

```js
//to turn off the visibility of youre object
this.yourMesh.visible = false;
```
### Create a group of object
Thanks to the group object we can organize more easely the scene, for example we can create level.
Like the mesh, the Object3D have a lot of param we can use.

```js
this.groupe = new THREE.Object3D();

this.groupe.add(this.yourMesh1, this.yourMesh2);

this.scene.add(this.groupe);

```
### import Object 

There is many format in 3d, the most commun are fbx or obj.
But there is an extension for the web named "gltf" created for the web.
On blender we can export directly in the soft. 
If you don't use blender you can export you 3d model in fbx and converted with online tools :
[https://blackthread.io/gltf-converter/](https://blackthread.io/gltf-converter/)

We use this extension because is less heavy.

In three.js a mesh in gltf is a group of object :
![Console.log GLTF object](assets/doc/objectMeshgltf.PNG "basic setup")
There are many option in this object, but now for importing the mesh we use scene/children and we map the all array. 

Note :
Your 3d model can't have to mush voxel,
simulation in VDB are not supported


***

Now the visual of this commit : 

![Basic setUp](assets/doc/basicSetup3.png "basic setup")

Right now it is not very impressive, but it is a good start.

***

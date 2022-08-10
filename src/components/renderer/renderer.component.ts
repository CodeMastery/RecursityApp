import { Component, ViewChild, ElementRef } from '@angular/core';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { Mesh } from 'three';

declare const THREE: any;

@Component({
  selector: 'renderer',
  templateUrl: `./renderer.component.html`,
  styles: [],
})
export class RendererComponent {
  @ViewChild('rendererContainer') rendererContainer: ElementRef;

  renderer = new THREE.WebGLRenderer({ alpha: true });
  scene = null;
  camera = null;
  mesh = null;
  orbitControls = null;
  dragControls = null;
  plane = null;

  registeredNodes : Array<Mesh>;

  constructor() {
    this.registeredNodes = new Array<Mesh>();
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      50,
      (window.innerWidth / window.innerHeight) * 3,
      1,
      1000
    );
    this.orbitControls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );
    this.dragControls = new DragControls(
      new Array(),
      this.camera,
      this.renderer.domElement
    );
    this.plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  }

  ngAfterViewInit() {
    this.configCamera();
    this.configRenderer();
    this.configControls();

    this.animate();
  }

  configCamera() {
    this.camera.position.set(0, 0, 300);
  }

  configRenderer() {
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(new THREE.Color('hsl(0, 0%, 30%)'));
    this.renderer.setSize(window.innerWidth, window.innerHeight / 3);
    this.renderer.domElement.style.display = 'block';
    this.renderer.domElement.style.margin = 'auto';
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
  }

  configControls() {
    //orbit controls
    this.orbitControls.autoRotate = false;
    this.orbitControls.enableZoom = true;
    this.orbitControls.enablePan = true;
    this.orbitControls.enableRotate = false;
    this.orbitControls.target.set(0, 0, 0);
    this.orbitControls.update();
    this.orbitControls.mouseButtons = {
      Right: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      LEFT: THREE.MOUSE.PAN,
    };
  }

  configDragControls() {
    this.scene.traverse(function (object) {
      if (object.isMesh) console.log(object);
    });
  }
  animate() {
    window.requestAnimationFrame(() => this.animate());
    this.orbitControls.update();
    this.renderer.render(this.scene, this.camera);
  }

  register(mesh: Mesh) {
 
    this.registeredNodes.push(mesh);
  }
  deregister(mesh: Mesh) {
 
    let temp = new Array<Mesh>();
    for (let i = 0; i < this.registeredNodes.length; i++) {
      if (this.registeredNodes[i] == null) 
      {
        temp.push(this.registeredNodes[i]);
      }
    }
    this.registeredNodes = temp;
    
  }
}

import { Component, ViewChild, ElementRef } from '@angular/core';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
declare const THREE: any;

@Component({
  selector: 'renderer',
  templateUrl: `./renderer.component.html`,
  styles: []
})
export class RendererComponent {
  @ViewChild('rendererContainer') rendererContainer: ElementRef;
  
  renderer = new THREE.WebGLRenderer({ alpha: true });
  scene = null;
  camera = null;
  mesh = null;
  controls = null;
  plane = null;

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight * 3, 1, 1000);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.plane = new THREE.Plane( new THREE.Vector3( 0, 0, 1 ), 0 );
  }

  ngAfterViewInit() {
    this.configCamera();
    this.configRenderer();
    this.configControls();
    
    
    this.animate()
  }

  configCamera() {
    this.camera.position.set(0, 0, 300);
  }

  configRenderer() {
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(new THREE.Color("hsl(0, 0%, 30%)"));
    this.renderer.setSize(window.innerWidth, window.innerHeight / 3);
    this.renderer.domElement.style.display = "block";
    this.renderer.domElement.style.margin = "auto";
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
  }

  configControls() {
    this.controls.autoRotate = true;
    this.controls.enableZoom = true;
    this.controls.enablePan  = true;
    this.controls.update();
  }

  animate()
  {
    window.requestAnimationFrame(() => this.animate());
    this.controls.update()
    this.renderer.render(this.scene, this.camera);
  }
}

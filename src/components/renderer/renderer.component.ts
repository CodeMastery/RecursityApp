import { Component, ViewChild, ElementRef } from '@angular/core';

declare const THREE: any;

@Component({
  selector: 'mesh',
  template: `<div #rendererContainer></div>`,
  styles: []
})
export class MeshComponent {
  @ViewChild('rendererContainer') rendererContainer: ElementRef;
  
  renderer = new THREE.WebGLRenderer({ alpha: true });
  scene = null;
  camera = null;
  mesh = null;
  controls = null;

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight * 3, 1, 1000);
    this.controls = new THREE.OrbitControls(this.camera);    
  }

  ngAfterViewInit() {
    this.configCamera();
    this.configRenderer();
    this.configControls();
    
    this.createMesh();

    this.animate();
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
    this.controls.autoRotate = false;
    this.controls.enableZoom = true;
    this.controls.enablePan  = true;
    this.controls.update();
  }

  createMesh() {
    const material = new THREE.MeshBasicMaterial({ color: 'orange' });
    const geometry = new THREE.BoxGeometry(100, 100, 100);
    const cube = new THREE.Mesh(geometry, material);
    const edges = new THREE.BoxHelper(cube, 'darkorchid');
    
    const group = new THREE.Group();
    group.add(cube);
    group.add(edges);
    
    this.scene.add(group);
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

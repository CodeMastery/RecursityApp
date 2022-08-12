import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RendererService } from '../../services/renderer.service';
import { ConnectorComponent } from '../connector/connector.component';
import {Vector2} from 'three'
import {Mesh} from 'three'

declare const THREE: any;
@Component({
  selector: 'nodemesh',
  templateUrl: './nodemesh.component.html',
  styleUrls: ['./nodemesh.component.css'],
})
export class NodemeshComponent implements OnInit {
  @Input() position = null;
  @Output() registerNode = new EventEmitter(THREE.Object3D);
  @Output() deregisterNodes = new EventEmitter();
  @Output() refreshDrag = new EventEmitter();

  connector : Array<any> = new Array<any>();

  mesh : Mesh = null;
  constructor(private rend: RendererService) {}

  createMesh() {
    const material = new THREE.MeshBasicMaterial({ color: 'orange' });
    const geometry = new THREE.CircleGeometry(100, 100);
    const circle = new THREE.Mesh(geometry, material);
    this.mesh = circle;
    const group = new THREE.Group();
    this.mesh.translateX(this.position[0]);
    this.mesh.translateY(this.position[1]);

    this.rend.renderer.scene.add(this.mesh);
    this.rend.renderer.registeredNodes.push(this)
    this.registerNode.emit(circle);
    this.refreshDrag.emit();

  
    this.connectWithNode(this.rend.renderer.registeredNodes[0]);
  }

  connectWithNode(node : NodemeshComponent) {
    this.connector.push(new ConnectorComponent(this.rend,this, node));
  }
  setMeshPositionToMouse() {}
  ngOnInit() {
    this.createMesh();
  }
  deleteNode() {
    this.deregisterNodes.emit();
  }
}

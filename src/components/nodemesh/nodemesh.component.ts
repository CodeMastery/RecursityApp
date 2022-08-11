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
    group.add(circle);
    group.translateX(this.position[0]);
    group.translateY(this.position[1]);

    this.rend.renderer.scene.add(group);
    this.registerNode.emit(circle);
    this.refreshDrag.emit();

    this.connectWithNode(this.rend.renderer.getMeshObjects()[0]);
  }

  //this.mesh is not the correct mesh, not passing right
  connectWithNode(node: Mesh) {
    console.log(this.mesh.isMesh)
    let pos1 : Vector2 = new Vector2();
    let pos2 : Vector2 = new Vector2();
    var position = new THREE.Vector3();
    position.setFromMatrixPosition(this.mesh.matrixWorld);
    pos1.x = position.x; pos1.y = position.y
    position.setFromMatrixPosition(node.matrixWorld);
    pos2.x = position.x; pos2.y = position.y;
    this.connector.push(new ConnectorComponent(this.rend,pos1, pos2,this, node));

  }
  setMeshPositionToMouse() {}
  ngOnInit() {
    this.createMesh();
  }
  deleteNode() {
    this.deregisterNodes.emit();
  }
}

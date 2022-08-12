import { Component, OnInit } from '@angular/core';
import { RendererService } from '../../services/renderer.service';
import { NodemeshComponent } from '../nodemesh/nodemesh.component';
import { Inject } from '@angular/core';
import { Vector2, Vector3, Mesh, CubicBezierCurve3 } from 'three';
import { ToolsService } from '../../services/tools.service';
declare const THREE: any;

@Component({
  selector: 'app-connector',
  templateUrl: './connector.component.html',
  styleUrls: ['./connector.component.css'],
})
export class ConnectorComponent implements OnInit {
  node1: NodemeshComponent;
  node2: NodemeshComponent;
  curve: CubicBezierCurve3;
  constructor(
    private rend: RendererService,
    n1: NodemeshComponent,
    n2: NodemeshComponent
  ) {
    this.node1 = n1;
    this.node2 = n2;
    this.Draw();

    //temp way to check curve move with mouse
    /*window.requestAnimationFrame(
      function (event) {
        this.curve.v0 = new Vector2(n1.mesh.position.x, n1.mesh.position.y);
        let tools: ToolsService = new ToolsService(this.rend);
        this.curve.v1 = tools.mousePosition;
        this.curve.updateMatrix;
        console.log(this.curve.v1);
      }.bind(this)
    );*/
  }

  ngOnInit() {}

  Draw() {
    console.log(this.node2.mesh.position.x);
    this.curve = new CubicBezierCurve3(
      new THREE.Vector3(
        this.node1.mesh.position.x,
        this.node1.mesh.position.y,
        0
      ),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(
        this.node2.mesh.position.x,
        this.node2.mesh.position.y,
        0
      )
    );

    const points = this.curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
    //final curve object
    const curveObject = new THREE.Line(geometry, material);
    //add to renderer
    this.rend.renderer.scene.add(curveObject);
    this.SetCurveToMouseFree(this.node1);
  }
  SetCurve(n1: NodemeshComponent, n2: NodemeshComponent) {
    this.curve.v0 = new Vector2(n1.mesh.position.x, n1.mesh.position.y);
    this.curve.v3 = new Vector2(n2.mesh.position.x, n2.mesh.position.y);
  }
  SetCurveToMouseFree(n1: NodemeshComponent) {
   
    this.curve.v0 = new Vector2(n1.mesh.position.x, n1.mesh.position.y);
    let tools: ToolsService = new ToolsService(this.rend);
    this.curve.v1 = tools.mousePosition;
    this.curve.updateMatrix;
    console.log(tools.mousePosition);
  }
}

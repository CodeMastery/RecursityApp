import { Component, OnInit, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { NodeComponent } from '../node/node.component.js';
declare const THREE : any

@Component({
  selector: 'app-nodemap',
  templateUrl: `<div #rendererContainer></div>`,
  styleUrls: ['./nodemap.component.css'],
})
export class NodemapComponent implements OnInit {

  @ViewChild('rendererContainer') rendererContainer: ElementRef;

  renderer = new THREE.WebGLRenderer({ alpha: true });
  scene = null;
  camera = null;
  mesh = null;
  controls = null;

  constructor(nodes: Array<NodeComponent>) {
    
  }

  ngOnInit() {}
}

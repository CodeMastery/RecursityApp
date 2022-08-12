import { Component, OnInit, OnChanges, ViewChild, ElementRef } from '@angular/core';
import {NodemeshComponent} from '../nodemesh/nodemesh.component'
declare const THREE : any

@Component({
  selector: 'app-nodemap',
  template: `<div #rendererContainer></div>`,
  styleUrls: ['./nodemap.component.css'],
})
export class NodemapComponent implements OnInit {

  @ViewChild('rendererContainer') rendererContainer: ElementRef;

  renderer = new THREE.WebGLRenderer({ alpha: true });
  scene = null;
  camera = null;
  mesh = null;
  controls = null;

  constructor() {
    
  }

  ngOnInit() {}
}

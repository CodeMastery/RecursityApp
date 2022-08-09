import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {NodemapComponent} from '../components/nodemap/nodemap.component'
import {RendererComponent} from '../components/renderer/renderer.component'
import {NodemeshComponent} from '../components/nodemesh/nodemesh.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, NodemeshComponent, RendererComponent, NodemapComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

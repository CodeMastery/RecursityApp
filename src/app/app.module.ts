import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {NodemapComponent} from './Mind-Map/components/nodemap/nodemap.component'
import {RendererComponent} from './Mind-Map/components/renderer/renderer.component'
import {NodemeshComponent} from './Mind-Map/components/nodemesh/nodemesh.component';
import { ToolsService } from './Mind-Map/services/tools.service';
import { appRoutingModule } from './app.routing';


@NgModule({
  imports:      [ BrowserModule, FormsModule, appRoutingModule ],
  declarations: [ AppComponent, NodemeshComponent, RendererComponent, NodemapComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ToolsService]
})
export class AppModule { }

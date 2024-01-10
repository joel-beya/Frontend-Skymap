import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StarMapComponent } from './star-map/star-map.component';
import { StarService } from './services/star.service';

@NgModule({
  declarations: [AppComponent, StarMapComponent],
  imports: [BrowserModule,AppRoutingModule,HttpClientModule],
  providers: [StarService],
  bootstrap: [AppComponent]
})
export class AppModule { }

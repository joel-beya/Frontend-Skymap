import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StarMapComponent } from './star-map/star-map.component';
import { StarService } from './services/star.service';
import { TokenInterceptor } from './services/token-interceptor.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [AppComponent, StarMapComponent],
  imports: [BrowserModule,AppRoutingModule,HttpClientModule],
  providers: [StarService,AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

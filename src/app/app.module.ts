import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MapRouterModule } from './components/map-component/map-router.module';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { MapProviderService } from './providers/maps/map-provider.service';
import { GoogleMapsJSProvider } from './providers/maps/google-maps-js.provider';
import { GeolocationProviderService } from './providers/geolocation/geolocation-provider.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, MapRouterModule],
  providers: [
    MapProviderService,
    GoogleMapsJSProvider,
    Geolocation,
    GeolocationProviderService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

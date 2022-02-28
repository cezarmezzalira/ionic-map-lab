import { ElementRef, Injectable } from '@angular/core';
import { isPlatform } from '@ionic/angular';
import { GoogleMapsJSProvider } from './google-maps-js.provider';
import { GoogleMapsNativeProvider } from './google-maps-native.provider';

export interface Location {
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root'
})
export class MapProviderService {
  public map: any;

  constructor() {
    if (isPlatform('ios') || isPlatform('android')) {
      this.map = new GoogleMapsNativeProvider();
    } else {
      console.log('Using Google Maps JS');
      this.map = new GoogleMapsJSProvider();

    }
  }

  init(location: Location, element: ElementRef) {
    this.map.init(location, element);
  }
}

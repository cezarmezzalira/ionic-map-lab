import { ElementRef, Injectable } from '@angular/core';
import { GoogleMapsJSProvider } from './google-maps-js.provider';
import { OpenStreetMapsProvider } from './open-street-maps.provider';

export interface Location {
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root'
})
export class MapProviderService {
  public map: any;

  constructor(defaultMap = 'GOOGLE') {
    if (defaultMap === 'OPENSTREET') {
      this.map = new OpenStreetMapsProvider();
    } else {
      this.map = new GoogleMapsJSProvider();
    }

  }

  init(location: Location, element: ElementRef) {
    this.map.init(location, element);
  }
}

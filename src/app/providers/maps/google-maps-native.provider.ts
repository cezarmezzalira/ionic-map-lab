import { ElementRef, Injectable } from '@angular/core';
import { Location } from './map-provider.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsNativeProvider {
  public map: any;

  constructor() { }

  public async init(location: Location, mapElement: ElementRef) {
    // TODO
  }
}

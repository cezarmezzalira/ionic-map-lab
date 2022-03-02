import {ElementRef, Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Location} from './map-provider.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsJSProvider {
  public map: any;
  private googleMaps;
  constructor() {}

  public async init(location: Location, mapElement: ElementRef) {
    this.googleMaps = await this.getGoogleMaps(environment.googleMapsAPIKEY);
    const mapElem = mapElement.nativeElement;

    this.map = new this.googleMaps.Map(mapElem, {
      center: {lat: location.latitude, lng: location.longitude},
      zoom: 15
    });
    this.addMarker(location.latitude, location.longitude, 'You', 'You are here!');
    this.googleMaps.event.addListenerOnce(this.map, 'idle', () => {
      mapElem.classList.add('show-map');
    });
  }

  public addMarker(lat: number, lng: number, title = '', contentInfo = '', zoom = 15): void {
    const latLng = new this.googleMaps
      .LatLng(lat, lng);
    const infoWindow = new this.googleMaps.InfoWindow({
      content: contentInfo
    });
    const marker = new this.googleMaps.Marker({
      position: latLng,
      zoom,
      map: this.map,
      title
    });
    if (contentInfo) {
      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });
    }
  }

  private async getGoogleMaps(apiKey: string): Promise<any> {
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=quarterly`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const googleModule2 = win.google;
        if (googleModule2 && googleModule2.maps) {
          resolve(googleModule2.maps);
        } else {
          reject('Google Maps is not available.');
        }
      };
    });
  }
}

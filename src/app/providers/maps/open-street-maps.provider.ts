import { ElementRef, Injectable } from '@angular/core';
import { Location } from './map-provider.service';
import * as L from 'leaflet';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;


@Injectable({
  providedIn: 'root'
})
export class OpenStreetMapsProvider {
  public map: any;


  constructor() { }

  public async init(location: Location, mapElement: ElementRef) {
    this.map = L.map(mapElement.nativeElement, {
      center: [location.latitude, location.longitude],
      zoom: 15
    });
    console.log(this.map);
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
    this.addMarker(location.latitude, location.longitude, 'Current Location', `<div>You are here<\div>`);
  }


  public addMarker(lat: number, lng: number, title = '', contentInfo = '', zoom = 15): void {
    const marker = L.marker([lat, lng], {
      title,
    });
    marker.bindPopup(contentInfo);
    marker.addTo(this.map);
  }
}

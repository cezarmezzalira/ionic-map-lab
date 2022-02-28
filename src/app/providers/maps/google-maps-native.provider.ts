import { ElementRef, Injectable } from '@angular/core';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import { environment } from 'src/environments/environment';
import { Location } from './map-provider.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsNativeProvider {
  public map: any;
  private mapId: string;

  constructor() { }

  public async init(location: Location, mapElement: ElementRef) {
    console.log('Using Native Maps');
    const boundingRect = mapElement.nativeElement.getBoundingClientRect() as DOMRect;


    try {
      const result = await CapacitorGoogleMaps.createMap({
        boundingRect: {
          width: Math.round(boundingRect.width),
          height: Math.round(boundingRect.height),
          x: Math.round(boundingRect.x),
          y: Math.round(boundingRect.y),
        },
        cameraPosition: {
          target: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
          tilt: 0,
          zoom: 15,
          bearing: 0
        }
      });
      this.mapId = result.googleMap.mapId;
      console.log(this.mapId);
    } catch (error) {
      console.log(error);
    }
    // CapacitorGoogleMaps.addListener('onMapReady', async () => {
    //   CapacitorGoogleMaps.setMapType({
    //     type: 'normal'
    //   });
    //   this.addMarker(location.latitude, location.longitude, 'You', 'You are here');
    // });
  }

  public addMarker(lat: number, lng: number, title = '', contentInfo = '', zoom = 15) {
    CapacitorGoogleMaps.addMarker({
      position: {
        latitude: lat,
        longitude: lng,
      },
      preferences: {
        opacity: 1,
        title,
        snippet: contentInfo
      },
      mapId: this.mapId
    });
    // CapacitorGoogleMaps.moveCamera({
    //   duration: 1000,
    //   mapId: this.mapId,

    //   cameraPosition: {
    //     target: {
    //       latitude: lat,
    //       longitude: lng,
    //     },
    //     tilt: 1,
    //     bearing: 0,
    //     zoom: 15
    //   }
    // });
  }
}

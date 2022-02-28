import { Injectable } from '@angular/core';
import { isPlatform } from '@ionic/angular';

import { Geolocation as GeolocationCordova } from '@awesome-cordova-plugins/geolocation/ngx';
import { Geolocation as GeolocationCapacitor } from '@capacitor/geolocation';
import { Location } from '../maps/map-provider.service';

@Injectable({
  providedIn: 'root'
})
export class GeolocationProviderService {

  constructor(private geolocation: GeolocationCordova) { }

  public async getCurrentPosition(): Promise<Location> {
    const coordinates = {
      latitude: 0,
      longitude: 0
    };
    if (isPlatform('ios') || isPlatform('android')) {
      await GeolocationCapacitor.getCurrentPosition().then((resp) => {
        coordinates.latitude = resp.coords.latitude;
        coordinates.longitude = resp.coords.longitude;
        console.log('using capacitor Geolocation');
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    } else {
      await this.geolocation.getCurrentPosition().then((resp) => {
        coordinates.latitude = resp.coords.latitude;
        coordinates.longitude = resp.coords.longitude;
        console.log('using cordova Geolocation');

      }).catch((error) => {
        console.log('Error getting location', error);
      });
    }
    return { latitude: coordinates.latitude, longitude: coordinates.longitude } as Location;
  }

}

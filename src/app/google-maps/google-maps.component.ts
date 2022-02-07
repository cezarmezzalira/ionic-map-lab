import { AfterViewInit, Component, ElementRef, Input, ViewChild, } from '@angular/core';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';


@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent implements AfterViewInit {
  @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;
  public map: any;
  private googleMaps;
  private currentLat = 0;
  private currentLng = 0;
  private currentPosition: any;

  constructor(
    public platform: Platform,
    private geolocation: Geolocation
  ) { }


  async ngAfterViewInit() {
    this.googleMaps = await this.getGoogleMaps(environment.googleMapsAPIKEY);
    const mapElem = this.mapElement.nativeElement;
    this.setCurrentPosition(-26.228067, -52.671327);
    this.map = new this.googleMaps.Map(mapElem, {
      center: this.currentPosition,
      zoom: 15
    });
    this.addMarker(this.currentLat, this.currentLng, 'You', 'Current Place');
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
      map: this.map,
      title
    });
    if (contentInfo) {
      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });
    }
  }

  public async getCurrentPosition(): Promise<void> {
    await this.geolocation.getCurrentPosition().then((resp) => {
      this.setCurrentPosition(resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  public setCurrentPosition(lat: number, lng: number): void {
    this.currentLat = lat;
    this.currentLng = lng;
    this.currentPosition = new this.googleMaps.LatLng(lat, lng);
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

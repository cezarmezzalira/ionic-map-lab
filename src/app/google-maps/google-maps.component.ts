import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, } from '@angular/core';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent implements AfterViewInit {
  @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;
  public map: any;
  private googleMaps;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    public platform: Platform
  ) { }


  async ngAfterViewInit() {
    // const appElement = this.doc.querySelector('ion-app');
    // // let isDark = false;
    // const style = [];
    // if (appElement.classList.contains('dark-theme')) {
    //   style = darkStyle;
    // }
    this.googleMaps = await this.getGoogleMaps(environment.googleMapsAPIKEY);
    const mapElem = this.mapElement.nativeElement;

    this.addMarker(-26.230569, -52.677994, 'Casa', 'Casa do Cezar');
    this.googleMaps.event.addListenerOnce(this.map, 'idle', () => {
      mapElem.classList.add('show-map');
    });
  }

  public addMarker(lat: number, lng: number, title = '', contentInfo = '', zoom = 15): void {
    const mapElem = this.mapElement.nativeElement;
    const latLng = new this.googleMaps
      .LatLng(lat, lng);
    this.map = new this.googleMaps.Map(mapElem, {
      center: latLng,
      zoom
    });

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

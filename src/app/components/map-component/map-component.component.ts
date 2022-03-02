import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location, MapProviderService } from 'src/app/providers/maps/map-provider.service';
import { GeolocationProviderService } from 'src/app/providers/geolocation/geolocation-provider.service';

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.scss'],
})
export class MapComponent implements AfterViewInit {
  @ViewChild('map') mapElement: ElementRef;

  location: Location;
  private mapsProvider: MapProviderService;

  constructor(private geolocation: GeolocationProviderService,) {
    this.mapsProvider = new MapProviderService('OPENSTREET');
    this.location = { latitude: 0, longitude: 0 };
  }

  async ngAfterViewInit() {
    this.location = await this.geolocation.getCurrentPosition();
    await this.mapsProvider.init(this.location, this.mapElement);
  }

  async ionViewDidEnter() {
  }
}

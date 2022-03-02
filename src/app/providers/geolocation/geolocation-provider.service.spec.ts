import { TestBed } from '@angular/core/testing';

import { GeolocationProviderService } from './geolocation-provider.service';

describe('GeolocationProviderService', () => {
  let service: GeolocationProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeolocationProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

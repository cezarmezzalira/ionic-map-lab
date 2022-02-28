import { TestBed } from '@angular/core/testing';

import { GoogleMapsNativeProvider } from './google-maps-native.provider';

describe('GoogleMapsNativeProvider', () => {
  let service: GoogleMapsNativeProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleMapsNativeProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

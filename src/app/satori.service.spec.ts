import { TestBed, inject } from '@angular/core/testing';

import { SatoriService } from './satori.service';

describe('SatoriService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SatoriService]
    });
  });

  it('should be created', inject([SatoriService], (service: SatoriService) => {
    expect(service).toBeTruthy();
  }));
});

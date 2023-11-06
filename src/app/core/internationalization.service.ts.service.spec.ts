import { TestBed } from '@angular/core/testing';

import { InternationalizationServiceTsService } from './internationalization.service.ts.service';

describe('InternationalizationServiceTsService', () => {
  let service: InternationalizationServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternationalizationServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

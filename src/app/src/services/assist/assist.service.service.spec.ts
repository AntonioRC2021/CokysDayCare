import { TestBed, inject } from '@angular/core/testing';

import { Assist.ServiceService } from './assist.service.service';

describe('Assist.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Assist.ServiceService]
    });
  });

  it('should be created', inject([Assist.ServiceService], (service: Assist.ServiceService) => {
    expect(service).toBeTruthy();
  }));
});

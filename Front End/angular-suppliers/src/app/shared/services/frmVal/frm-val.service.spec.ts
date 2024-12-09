import { TestBed } from '@angular/core/testing';

import { FrmValService } from './frm-val.service';

describe('FrmValService', () => {
  let service: FrmValService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrmValService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

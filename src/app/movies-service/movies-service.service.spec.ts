import { TestBed } from '@angular/core/testing';

import { MoviesServiceService } from './movies-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MoviesServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: MoviesServiceService = TestBed.get(MoviesServiceService);
    expect(service).toBeTruthy();
  });
});

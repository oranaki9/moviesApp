import { TestBed } from "@angular/core/testing";

import { MoviesServiceService } from "./movies-service.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { tmdbSearchInjectables } from "./tmdb-search-Injectables";
import { Router } from "@angular/router";
import { NgReduxModule } from '@angular-redux/store';
class MockRouter {
  navigate() {}
}
xdescribe("MoviesServiceService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,NgReduxModule],
      providers: [
        tmdbSearchInjectables,
        { provide: Router, useClass: MockRouter }
      ]
    })
  );

  it("should be created", () => {
    const service: MoviesServiceService = TestBed.get(MoviesServiceService);
    expect(service).toBeTruthy();
  });
});

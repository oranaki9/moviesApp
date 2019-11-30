import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HomeComponent } from "./home.component";
import { AngularMaterialModule } from "src/app/angular-material/angular-material.module";
import { SharedModule } from "src/app/shared.module";
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { tmdbSearchInjectables } from "src/app/movies-service/tmdb-search-Injectables";
import { NgReduxModule, NgRedux } from "@angular-redux/store";
import { MoviesServiceService } from "src/app/movies-service/movies-service.service";
import { of } from "rxjs";
class NgReduxMock {
  public state = {
    homeMovies: []
  };
  getState() {
    return {
      homeMovies: {
        randomMovies: []
      },
      auth: {
        isAuth: false
      }
    };
  }

  dispatch(action, payload) {
    this.state.homeMovies = payload;
  }
}
describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: MoviesServiceService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        AngularMaterialModule,
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        tmdbSearchInjectables,
        { provide: NgRedux, useClass: NgReduxMock },
        MoviesServiceService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit("should create", () => {
    const newMovies = [{ Title: "batman" }, { Title: "batman return" }];
    const se = TestBed.get(MoviesServiceService);
    spyOn(se, "getNewMovies").and.returnValue(of(newMovies));

    //expect(NgReduxMock.prototype.state.homeMovies).toEqual(newMovies);
  });
});

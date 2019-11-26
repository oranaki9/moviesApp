import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MoviesCrouselComponent } from "./movies-crousel.component";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

describe("MoviesCrouselComponent", () => {
  let component: MoviesCrouselComponent;
  let fixture: ComponentFixture<MoviesCrouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MoviesCrouselComponent],
      imports: [MDBBootstrapModule.forRoot(), HttpClientTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesCrouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

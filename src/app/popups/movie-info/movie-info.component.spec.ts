import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MovieInfoComponent } from "./movie-info.component";
import { MDBBootstrapModule } from "angular-bootstrap-md";

describe("MovieInfoComponent", () => {
  let component: MovieInfoComponent;
  let fixture: ComponentFixture<MovieInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovieInfoComponent],
      imports: [MDBBootstrapModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

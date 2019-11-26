import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LogInComponent } from "./log-in.component";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { SharedModule } from 'src/app/shared.module';
import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
describe("LogInComponent", () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogInComponent],
      imports: [MDBBootstrapModule.forRoot(),SharedModule,HttpClientTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SignInComponent } from "./sign-in.component";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { SharedModule } from 'src/app/shared.module';
import { HttpClientModule } from '@angular/common/http';

describe("SignInComponent", () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignInComponent],
      imports: [MDBBootstrapModule.forRoot(),SharedModule,HttpClientModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

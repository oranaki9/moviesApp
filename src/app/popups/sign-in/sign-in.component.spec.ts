import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SignInComponent } from "./sign-in.component";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { SharedModule } from "src/app/shared.module";
import { HttpClientModule } from "@angular/common/http";
import { Router } from "@angular/router";
import { NgRedux, NgReduxModule } from "@angular-redux/store";
class MockRouter {
  navigate() {}
}
describe("SignInComponent", () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignInComponent],
      imports: [
        MDBBootstrapModule.forRoot(),
        SharedModule,
        HttpClientModule,
        NgReduxModule
      ],
      providers: [{ provide: Router, useClass: MockRouter }]
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
  it("should have user name form control", () => {
    const userName = component.validatingForm.contains("signupFormModalName");
    expect(userName).toBeTruthy();
  });
  it("should have email form control", () => {
    const email = component.validatingForm.contains("signupFormModalEmail");
    expect(email).toBeTruthy();
  });
  it("should have password form control", () => {
    const password = component.validatingForm.contains(
      "signupFormModalPassword"
    );
    expect(password).toBeTruthy();
  });
  it("user name should be required", () => {
    const control = component.validatingForm.get("signupFormModalName");
    control.setValue("");
    expect(control.valid).not.toBeTruthy();
  });
  it("email should be required", () => {
    const control = component.validatingForm.get("signupFormModalEmail");
    control.setValue("");
    expect(control.valid).not.toBeTruthy();
  });
  it("password should be required", () => {
    const control = component.validatingForm.get("signupFormModalPassword");
    control.setValue("");
    expect(control.valid).not.toBeTruthy();
  });
});

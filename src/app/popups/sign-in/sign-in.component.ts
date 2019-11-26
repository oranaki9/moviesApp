import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MDBModalService } from "angular-bootstrap-md";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit {
  validatingForm: FormGroup;

  constructor(
    private auth: AuthService,
    private modalService: MDBModalService
  ) {}

  ngOnInit() {
    this.validatingForm = new FormGroup({
      signupFormModalName: new FormControl("", Validators.required),
      signupFormModalEmail: new FormControl("", Validators.email),
      signupFormModalPassword: new FormControl("", Validators.required)
    });
  }

  signUp() {
    if (!this.validatingForm.valid) {
      return;
    }
    const formData = {
      userName: this.signupFormModalName.value,
      email: this.signupFormModalEmail.value,
      password: this.signupFormModalPassword.value
    };
    this.auth
      .signIn(formData.userName, formData.email, formData.password)
      .subscribe(result => {
        console.log(result);
        this.hide();
      });
  }
  hide() {
    this.modalService.hide(1);
  }
  get signupFormModalName() {
    return this.validatingForm.get("signupFormModalName");
  }

  get signupFormModalEmail() {
    return this.validatingForm.get("signupFormModalEmail");
  }

  get signupFormModalPassword() {
    return this.validatingForm.get("signupFormModalPassword");
  }
}

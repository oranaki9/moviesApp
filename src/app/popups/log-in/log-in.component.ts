import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MDBModalService } from "angular-bootstrap-md";
import { NgRedux } from "@angular-redux/store";
import { IAuthState } from "src/app/auth/store";
import { LOGIN_SUCCESS } from "src/app/auth/action";

@Component({
  selector: "app-log-in",
  templateUrl: "./log-in.component.html",
  styleUrls: ["./log-in.component.scss"]
})
export class LogInComponent implements OnInit {
  validatingForm: FormGroup;

  constructor(
    private auth: AuthService,
    private modalService: MDBModalService,
    private ngRedux: NgRedux<IAuthState>
  ) {}

  ngOnInit() {
    this.validatingForm = new FormGroup({
      loginFormModalEmail: new FormControl("", Validators.email),
      loginFormModalPassword: new FormControl("", Validators.required)
    });
  }

  hide() {
    this.modalService.hide(1);
  }

  onLogIn() {
    if (!this.validatingForm.valid) {
      return;
    }

    const formData = {
      email: this.loginFormModalEmail.value,
      password: this.loginFormModalPassword.value
    };
    this.auth
      .logIn(formData.email, formData.password)
      .subscribe((authToken: any) => {
        this.ngRedux.dispatch({ type: "LOGIN_SUCCESS", payload: authToken });

        this.auth.saveUser(authToken);
        this.hide();
        console.log(authToken);
      });
  }
  get loginFormModalEmail() {
    return this.validatingForm.get("loginFormModalEmail");
  }
  get loginFormModalPassword() {
    return this.validatingForm.get("loginFormModalPassword");
  }
}

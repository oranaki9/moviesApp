import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { IAppState } from "../store";
import { NgRedux } from "@angular-redux/store";
@Injectable({
  providedIn: "root"
})
export class AuthService {
  API_URL = "api";

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngRedux: NgRedux<IAppState>
  ) {}
  signIn(userName: string, email: string, password: string) {
    return this.http.post(`${this.API_URL}/signIn`, {
      userName: userName,
      email: email,
      password: password
    });
  }
  logIn(email: string, password: string) {
    return this.http.post(`${this.API_URL}/logIn`, {
      email: email,
      password: password
    });
  }
  logOut() {
    this.ngRedux.dispatch({ type: "LOG_OUT" });
    this.ngRedux.dispatch({ type: "CLEAR_FAVORITE" });
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    this.router.navigate(["/"]);
  }
  saveUser(authToken: { token: string; userId: string }) {
    localStorage.setItem("token", authToken.token);
    localStorage.setItem("userId", authToken.userId);
  }
  isAuth() {
    const userAuth = localStorage.getItem("token");
    return userAuth ? true : false;
  }
  getAuthData() {
    const token: any = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token) {
      return;
    }
    return {
      token: token,
      userId: userId
    };
  }
  autoAuth() {
    const isAuth = this.isAuth();
    const authData = this.getAuthData();
    this.ngRedux.dispatch({
      type: "FETCH_AUTH",
      payload: {
        isAuth: isAuth,
        token: authData ? authData.token : "",
        userId: authData ? authData.userId : ""
      }
    });
  }
  getToken() {
    const authDate = this.getAuthData();
    return authDate ? authDate.token : undefined;
  }
}

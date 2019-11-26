import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router, CanActivate } from "@angular/router";
import { UtilsService } from "../utils/utils.service";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private utile: UtilsService
  ) {}
  canActivate(): boolean {
    const isAuth = this.auth.isAuth();
    if (!isAuth) {
      this.router.navigate(["/"]);
      this.utile.openDialog("logIn");
      return false;
    }
    return true;
  }
}

import { Component } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { UtilsService } from "src/app/utils/utils.service";
import { select } from "@angular-redux/store";
import { IAppState } from "src/app/store";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"]
})
export class NavBarComponent {
  @select((a: IAppState) => a.auth.isAuth) isAuth;
  backDrop = false;
  sideNav = false;
  constructor(private auth: AuthService, private utils: UtilsService) {}

  openSideNav() {
    this.backDrop = true;
    this.sideNav = true;
  }
  closeSideNav() {
    this.backDrop = false;
    this.sideNav = false;
  }
  openDialog(dialogName: string): void {
    this.utils.openDialog(dialogName);
  }
  logOut() {
    this.auth.logOut();
  }
}

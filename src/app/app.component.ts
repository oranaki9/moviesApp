import { Component } from "@angular/core";
import { AuthService } from "./auth/auth.service";

@Component({
  selector: "app-root",
  template: `
    <header id="main__navbar">
      <app-nav-bar></app-nav-bar>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  // auto authenticate the user...
  constructor(private auth: AuthService) {
    this.auth.autoAuth();
  }
}

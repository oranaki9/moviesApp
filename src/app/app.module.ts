import { BrowserModule } from "@angular/platform-browser";
import { NgModule, isDevMode, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { HomeComponent } from "./components/home/home.component";
import { tmdbSearchInjectables } from "./movies-service/tmdb-search-Injectables";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { modalsComponents } from "./popups/modals-components";
import { IAppState, rootReducer, INITIAL_STATE } from "./store";
import {
  NgRedux,
  NgReduxModule,
  DevToolsExtension
} from "@angular-redux/store";
import { SharedModule } from "./shared.module";
import { SearchInpComponent } from "./components/nav-bar/search-inp/search-inp.component";
import { InpDirDirective } from "./components/nav-bar/search-inp/inp-dir.directive";
import { HttpErrorInterceptor } from "./error.inteceptor";
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    modalsComponents,
    SearchInpComponent,
    InpDirDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    NgReduxModule,
    SharedModule
  ],
  entryComponents: [modalsComponents],
  providers: [
    tmdbSearchInjectables,
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    devTools: DevToolsExtension
  ) {
    const enhancers = isDevMode() ? [devTools.enhancer()] : [];
    this.ngRedux.configureStore(rootReducer, INITIAL_STATE, [], enhancers);
  }
}

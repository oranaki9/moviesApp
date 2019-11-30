import { TestBed, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { Router, RouterOutlet } from "@angular/router";

class MockRouter {
  public navigate() {}
}
xdescribe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, NavBarComponent],
      providers: [{ provide: Router, useClass: MockRouter }, RouterOutlet]
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

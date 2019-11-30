import { TestBed } from "@angular/core/testing";

import { UtilsService } from "./utils.service";
import { MDBBootstrapModule } from "angular-bootstrap-md";

xdescribe("UtilsService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [MDBBootstrapModule.forRoot()]
    })
  );

  it("should be created", () => {
    const service: UtilsService = TestBed.get(UtilsService);
    expect(service).toBeTruthy();
  });
});

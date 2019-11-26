import { Injectable } from "@angular/core";
import { modalsComponents } from "../popups/modals-components";
import { MDBModalService } from "angular-bootstrap-md";

@Injectable({
  providedIn: "root"
})
export class UtilsService {
  constructor(private modalService: MDBModalService) {}

  dialogOptions(option: string) {
    const DIALOGS = {
      signIn: modalsComponents[0],
      logIn: modalsComponents[1],
      movieInfo: modalsComponents[2],
      massage: modalsComponents[3]
    };
    return DIALOGS[option];
  }
  openDialog(dialogName: string, payload?): void {
    const dialogChoice = this.dialogOptions(dialogName);
    this.modalService.show(dialogChoice, payload);
  }
}

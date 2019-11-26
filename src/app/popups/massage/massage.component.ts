import { Component } from "@angular/core";
import { MDBModalService } from "angular-bootstrap-md";

@Component({
  selector: "app-massage",
  templateUrl: "./massage.component.html",
  styleUrls: ["./massage.component.scss"]
})
export class MassageComponent {
  massage = "";
  constructor(private modalService: MDBModalService) {
    this.massage = this.modalService.config.data as string;
    console.log(this.massage);
    console.log(this.modalService.config);
  }
  closeModal() {
    this.modalService.hide(1);
  }
}

import { Component } from "@angular/core";
import { MDBModalService } from "angular-bootstrap-md";
import { FullMovie } from "src/app/components/home/movies-crousel/FullMovie.interface";

@Component({
  selector: "app-movie-info",
  templateUrl: "./movie-info.component.html",
  styleUrls: ["./movie-info.component.scss"]
})
export class MovieInfoComponent {
  payload: FullMovie;
  constructor(private modalService: MDBModalService) {
    this.payload = this.modalService.config.data as FullMovie;
  }

  hide() {
    this.modalService.hide(1);
  }
}

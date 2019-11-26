import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { UtilsService } from "src/app/utils/utils.service";
import { ShortMovie } from "../movies-crousel/ShortMovie.interface";

@Component({
  selector: "app-movies-crousel",
  templateUrl: "./movies-crousel.component.html",
  styleUrls: ["./movies-crousel.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesCrouselComponent {
  @Input() movies: ShortMovie;
  @Input() isHomePage: boolean;
  activeSlideIndex;
  constructor(private utils: UtilsService) {}

  openDialog(dialogName: string): void {
    this.utils.openDialog(dialogName);
  }
}

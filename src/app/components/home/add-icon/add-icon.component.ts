import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "src/app/store";
import { UtilsService } from "src/app/utils/utils.service";
import { MoviesServiceService } from "src/app/movies-service/movies-service.service";
import { FullMovie } from "../movies-crousel/FullMovie.interface";
import { map } from "rxjs/operators";
@Component({
  selector: "app-add-icon",
  template: `
    <i class="material-icons add" (click)="onMovieInfoClicked()">
      library_add
    </i>
  `,
  styleUrls: ["./add-icon.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddIconComponent {
  @Input() activeSlideIndex;
  @Input() isHomePage;
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private utils: UtilsService,
    private imdb: MoviesServiceService
  ) {}
  onMovieInfoClicked() {
    const movieIndex = this.activeSlideIndex
      ? this.activeSlideIndex.relatedTarget
      : 0;
    console.log(movieIndex);

    const imdbID = this.isHomePage
      ? this.ngRedux.getState().homeMovies.randomMovies[movieIndex].imdbID
      : this.ngRedux.getState().homeMovies.favoriteMovies[movieIndex].imdbID;
    this.getFullMovieInfo(imdbID);
    console.log(imdbID);
  }
  getFullMovieInfo(imdbID: string) {
    this.imdb
      .findFullMovieDetailsById(imdbID)
      .pipe(
        map(fullInfo => this.utils.openDialog("movieInfo", { data: fullInfo }))
      )
      .subscribe(() => {});
  }
}

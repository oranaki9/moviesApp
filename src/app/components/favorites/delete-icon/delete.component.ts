import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { MoviesServiceService } from "src/app/movies-service/movies-service.service";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "src/app/store";
import { Router } from "@angular/router";

@Component({
  selector: "app-delete",
  templateUrl: "./delete.component.html",
  styleUrls: ["./delete.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteComponent {
  @Input() activeSlideIndex;


  constructor(
    private imdb: MoviesServiceService,
    private ngRedux: NgRedux<IAppState>,
    private router: Router
  ) {}

  onDeleteClicked() {
    const favoriteMovies = this.ngRedux.getState().homeMovies.favoriteMovies;

    // this line because in mdb crousel libery has a bug-its cannot find the first crousel item index.
    const movieIndex = this.activeSlideIndex
      ? this.activeSlideIndex.relatedTarget
      : 0;

    const imdbId = favoriteMovies[movieIndex].imdbID;
    this.ngRedux.dispatch({ type: "DELETE_FAVORITE_MOVIE", payload: imdbId });
    this.imdb.removeFromFavorite(imdbId).subscribe(result => {
      this.router.navigate(["/"]);
    });
  }
}

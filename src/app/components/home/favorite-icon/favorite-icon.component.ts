import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  ChangeDetectionStrategy
} from "@angular/core";
import { IAppState } from "src/app/store";
import { NgRedux } from "@angular-redux/store";
import { MoviesServiceService } from "src/app/movies-service/movies-service.service";
import { Subscription } from "rxjs";
import { UtilsService } from "src/app/utils/utils.service";

@Component({
  selector: "app-favorite-icon",
  template: `
    <i class="material-icons" (click)="onFavoriteClicked()">
      favorite
    </i>
  `,
  styleUrls: ["./favorite-icon.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteIconComponent implements OnDestroy {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private imdb: MoviesServiceService,
    private utils: UtilsService
  ) {}
  @Input() activeSlideIndex;
  addToFavoriteSub: Subscription;

  // function  check's if user is authenticated before let him add a movie to favorite list.
  onFavoriteClicked() {
    const isAuth = this.ngRedux.getState().auth.isAuth;
    if (!isAuth) {
      this.utils.openDialog("logIn");
      return;
    }
    const randomMovies = this.ngRedux.getState().homeMovies.randomMovies;
    console.log(randomMovies);

    const favoriteMoviesIds = this.ngRedux.getState().homeMovies
      .favoriteMoviesIds;
    // this line because in mdb crousel libery has a bug-its cannot find the first crousel item index.
    const movieIndex = this.activeSlideIndex
      ? this.activeSlideIndex.relatedTarget
      : 0;
    const imdbId = randomMovies[movieIndex].imdbID;
    const isFavorite = favoriteMoviesIds.find(f => f === imdbId);

    this.addToFavorite(imdbId, isFavorite);
  }

  // function add the favorite movie id to local state and the server db state
  addToFavorite(imdbId: string, isFavorite: string | boolean) {
    // make sure this movie is not favorite movie allredy.
    if (!isFavorite) {
      this.ngRedux.dispatch({
        type: "ADD_MOVIE",
        payload: imdbId
      });
      this.addToFavoriteSub = this.imdb
        .addToFavorite(imdbId)
        .subscribe(result => {
          this.showMassage("Movie added to favorite successfully.");
        });
    } else {
      this.showMassage("This movie allredy in favorite.");
    }
  }
  showMassage(massage: string) {
    this.utils.openDialog("massage", { data: massage });
  }
  ngOnDestroy() {
    if (this.addToFavoriteSub) {
      this.addToFavoriteSub.unsubscribe();
    }
  }
}

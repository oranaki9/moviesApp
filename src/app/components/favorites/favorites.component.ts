import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from "@angular/core";
import { NgRedux, select } from "@angular-redux/store";
import { IAppState } from "src/app/store";
import { MoviesServiceService } from "src/app/movies-service/movies-service.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-favorites",
  templateUrl: "./favorites.component.html",
  styleUrls: ["./favorites.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent implements OnInit, OnDestroy {
  @select((m: IAppState) => m.homeMovies.favoriteMovies) favoriteMovies;
  @select((m: IAppState) => m.homeMovies.isLoading) isLoading;
  favoriteMoviesIdsSub: Subscription;
  favoriteMoviesInfoSub: Subscription;
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private imdb: MoviesServiceService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.ngRedux.dispatch({
      type: "FATCH_MOVIES_REQUEST"
    });
    const favoriteMoviesLen = this.ngRedux.getState().homeMovies
      .favoriteMoviesIds.length;

    // check if the favorite movies allredy loaded from server
    if (favoriteMoviesLen === 0) {
      this.favoriteMoviesIdsSub = this.imdb
        .getFavoriteMovies()
        .subscribe((result: { favoriteMovies: string[] }) => {
          this.ngRedux.dispatch({
            type: "FETCH_FAVORITE_MOVIES_IDS_SUCCESS",
            payload: result.favoriteMovies
          });
          this.getFavoriteMovies();
        });
    } else {
      this.getFavoriteMovies();
    }
  }
  getFavoriteMovies() {
    const favoriteMoviesIds = this.ngRedux.getState().homeMovies
      .favoriteMoviesIds;
    const myMovies = this.serachMovieById(favoriteMoviesIds);
    this.ngRedux.dispatch({
      type: "FETCH_FAVORIE_MOVIES_SUCCESS",
      payload: myMovies
    });
  }

  // function serach movie on imdb for etch imdbId
  serachMovieById(favoriteMoviesIds) {
    const myMovies = [];
    favoriteMoviesIds.forEach(imdbId => {
      this.favoriteMoviesInfoSub = this.imdb
        .findMovieById(imdbId)
        .subscribe((result: any) => {
          myMovies.push(result);
          this.cd.detectChanges();
        });
    });

    return myMovies;
  }
  ngOnDestroy() {
    if (this.favoriteMoviesIdsSub) {
      this.favoriteMoviesIdsSub.unsubscribe();
    }
    if (this.favoriteMoviesInfoSub) {
      this.favoriteMoviesInfoSub.unsubscribe();
    }
  }
}

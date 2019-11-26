import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from "@angular/core";
import { MoviesServiceService } from "src/app/movies-service/movies-service.service";
import { NgRedux, select } from "@angular-redux/store";
import { IAppState } from "src/app/store";
import { Subscription } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  @select((m: IAppState) => m.homeMovies.randomMovies) movies;
  @select((m: IAppState) => m.homeMovies.isLoading) isLoading;
  randomMoviesSub: Subscription;
  favoriteMoviesSub: Subscription;
  constructor(
    private imdb: MoviesServiceService,
    private ngRedux: NgRedux<IAppState>
  ) {}

  ngOnInit() {
    const moviesLen = this.ngRedux.getState().homeMovies.randomMovies.length;

    // check if the random movies carousel not in state to avoid unnecessary calls for the backend
    if (moviesLen === 0) {
      this.ngRedux.dispatch({
        type: "FATCH_MOVIES_REQUEST"
      });
      this.randomMoviesSub = this.imdb
        .getNewMovies()
        .subscribe((newMovies: any) => {
          this.ngRedux.dispatch({
            type: "FATCH_RANDOM_MOVIES_SUCCESS",
            payload: newMovies.Search
          });
        });
    }
    const isAuth = this.ngRedux.getState().auth.isAuth;
    // if user is auth-load the favorite imdb id's from database
    if (isAuth) {
      this.favoriteMoviesSub = this.imdb
        .getFavoriteMovies()
        .subscribe((result: { favoriteMovies: string[] }) => {
          this.ngRedux.dispatch({
            type: "FETCH_FAVORITE_MOVIES_IDS_SUCCESS",
            payload: result.favoriteMovies
          });
        });
    }
  }
  ngOnDestroy() {
    if (this.randomMoviesSub) {
      this.randomMoviesSub.unsubscribe();
    }
    if (this.favoriteMoviesSub) {
      this.favoriteMoviesSub.unsubscribe();
    }
  }
}

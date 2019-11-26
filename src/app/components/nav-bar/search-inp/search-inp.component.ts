import {
  Component,
  HostBinding,
  ViewChild,
  OnDestroy,
  ChangeDetectionStrategy
} from "@angular/core";
import { InpDirDirective } from "./inp-dir.directive";
import { MoviesServiceService } from "src/app/movies-service/movies-service.service";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "src/app/store";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { UtilsService } from "src/app/utils/utils.service";

@Component({
  selector: "app-search-inp",
  templateUrl: "./search-inp.component.html",
  styleUrls: ["./search-inp.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchInpComponent implements OnDestroy {
  @ViewChild(InpDirDirective, { static: false })
  input: InpDirDirective;
  searchMovieSub: Subscription;
  searchText = "";
  constructor(
    private imdb: MoviesServiceService,
    private ngRedux: NgRedux<IAppState>,
    private router: Router,
    private utils: UtilsService
  ) {}

  @HostBinding("class.input-focus")
  get onFocus() {
    return this.input ? this.input.focus : false;
  }

  serachMovie = () => {
    this.searchMovieSub = this.imdb
      .findMovieByName(this.searchText)
      .subscribe((result: any) => {
        console.log(result);

        if (result.Response === "True") {
          let randomMoviesArr = [];
          randomMoviesArr = result.Search;
          this.ngRedux.dispatch({
            type: "FATCH_RANDOM_MOVIES_SUCCESS",
            payload: randomMoviesArr
          });
          this.router.navigate(["/"]);
        } else {
          this.utils.openDialog("massage", {
            data: `Cannot find movie ${this.searchText}`
          });
          // TODO: massage modal for movie not found
        }
      });
  };
  ngOnDestroy() {
    if (this.searchMovieSub) {
      this.searchMovieSub.unsubscribe();
    }
  }
}

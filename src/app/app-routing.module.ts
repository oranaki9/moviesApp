import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { FavoritesComponent } from "./components/favorites/favorites.component";
import { AuthGuardService } from "./auth/AuthGuard";

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "my-movies",
    loadChildren: () =>
      import("./components/favorites/favorite.module").then(
        mod => mod.FavoriteModule
      ),
    canActivate: [AuthGuardService]
  },

  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuardService]
})
export class AppRoutingModule {}

import { NgModule } from "@angular/core";
import { FavoritesComponent } from "./favorites.component";
import { FavoriteRoutingModule } from "./favorite-routing.module";
import { SharedModule } from "src/app/shared.module";
import { DeleteComponent } from './delete-icon/delete.component';

@NgModule({
  declarations: [FavoritesComponent],
  imports: [FavoriteRoutingModule, SharedModule]
})
export class FavoriteModule {}

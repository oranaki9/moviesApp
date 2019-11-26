import { NgModule } from "@angular/core";
import { MoviesCrouselComponent } from "./components/home/movies-crousel/movies-crousel.component";
import { FavoriteIconComponent } from "./components/home/favorite-icon/favorite-icon.component";
import { AddIconComponent } from "./components/home/add-icon/add-icon.component";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularMaterialModule } from "./angular-material/angular-material.module";
import { DeleteComponent } from './components/favorites/delete-icon/delete.component';

@NgModule({
  declarations: [
    MoviesCrouselComponent,
    FavoriteIconComponent,
    AddIconComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ],
  exports: [
    MoviesCrouselComponent,
    FavoriteIconComponent,
    AddIconComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ]
})
export class SharedModule {}

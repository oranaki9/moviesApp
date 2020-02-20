import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class MoviesServiceService {
  readonly OMDB_API_URL = "https://www.omdbapi.com/";
  readonly OMDB_API_KEY = "fb26dd1b";
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }
  getNewMovies() {
    let params: HttpParams = new HttpParams();
    params = params.append("s", "batman");
    params = params.append("type", "movie");
    params = params.append("apikey", this.OMDB_API_KEY);
    return this.http.get(this.OMDB_API_URL, { params });
  }
  findMovieById(imdbId: string) {
    return this.http.get(`${this.OMDB_API_URL}?i=${imdbId}&type=movie&apikey=${this.OMDB_API_KEY}`);
  }
  findMovieByName(movieName: string) {
    return this.http.get(`${this.OMDB_API_URL}?s=${movieName}&type=movie&apikey=${this.OMDB_API_KEY}`);
  }
  findFullMovieDetailsById(id: string) {
    return this.http.get(`${this.OMDB_API_URL}?i=${id}&type=movie&plot=full&apikey=${this.OMDB_API_KEY}`);
  }

  getFavoriteMovies() {
    const token = this.auth.getToken();
    return this.http.post("http://localhost:3000/api/favorite", { token });
  }
  addToFavorite(imdbId: string) {
    const token = this.auth.getToken();
    return this.http.put("http://localhost:3000/api/addFavorite", {
      imdbId,
      token
    });
  }
  removeFromFavorite(imdbId: string) {
    const userId = this.auth.getAuthData().userId;
    return this.http.delete(
      `http://localhost:3000/api/favorite/${userId}/${imdbId}`
    );
  }
}

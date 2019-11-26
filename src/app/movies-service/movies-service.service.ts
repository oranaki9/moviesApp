import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class MoviesServiceService {
  constructor(
    private http: HttpClient,
    @Inject("API_URL") private apiUrl,
    @Inject("OMDB_API_KEY") private apiKey,
    private auth: AuthService
  ) {}
  getNewMovies() {
    const q = `${this.apiUrl}?s=batman&type=movie&apikey=${this.apiKey}`;
    return this.http.get(q);
  }
  findMovieById(imdbId: string) {
    const q = `${this.apiUrl}?i=${imdbId}&type=movie&apikey=${this.apiKey}`;
    return this.http.get(q);
  }
  findMovieByName(movieName: string) {
    const q = `${this.apiUrl}?s=${movieName}&type=movie&apikey=${this.apiKey}`;
    return this.http.get(q);
  }
  findFullMovieDetailsById(id: string) {
    const q = `${this.apiUrl}?i=${id}&type=movie&plot=full&apikey=${this.apiKey}`;
    return this.http.get(q);
  }

  getFavoriteMovies() {
    const token = this.auth.getToken();
    return this.http.post(`api/favorite`, {
      token: token
    });
  }
  addToFavorite(imdbId: string) {
    const token = this.auth.getToken();

    return this.http.put("api/addFavorite", {
      imdbId: imdbId,
      token: token
    });
  }
  removeFromFavorite(imdbId: string) {
    const userId = this.auth.getAuthData().userId;

    return this.http.delete(
      `api/favorite/${userId}/${imdbId}`
    );
  }
}

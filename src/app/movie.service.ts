import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:8000/movies';  // Adjust based on your backend URL
  constructor(private http: HttpClient) { }
  searchMovies(query: string) {
    return this.http.get(`${this.apiUrl}/search?query=${query}`);
  }
  getMovieDetails(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  createList(name: string, isPublic: boolean, movies: string[]) {
    return this.http.post(`${this.apiUrl}/lists`, { name, isPublic, movies });
  }
  getUserLists() {
    return this.http.get(`${this.apiUrl}/lists`);
  }
  getPublicLists() {
    return this.http.get(`${this.apiUrl}/public-lists`);
  }
}


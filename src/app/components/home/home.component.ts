// src/app/components/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../movie.service';
import { AuthService } from '../../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  query = '';
  movies: any[] = [];
  movieLists: any[] = [];
  movieDetails: any = null

  

  constructor(private authService : AuthService, private movieService: MovieService, private snackBar : MatSnackBar) {}

  searchMovies() {
    this.movieService.searchMovies(this.query).subscribe(
      (response: any) => {
        this.movies = response.Search;
        this.movieDetails = null; // Clear previous movie details
      },
      (error) => {
        console.error('Error fetching movies:', error);
        this.snackBar.open('Error fetching movies. Please try again.', 'Close', { duration: 3000 });
      }
    );
  }

  searchMoviesById() {
    this.movieService.getMovieDetails(this.query).subscribe(
      (response: any) => {
        this.movieDetails = response;
        this.movies = []; // Clear previous search results
        console.log(this.movieDetails);
      },
      (error) => {
        console.error('Error fetching movie details:', error);
        this.snackBar.open('Error fetching movie details. Please try again.', 'Close', { duration: 3000 });
      }
    );
  }

  logout() {
    this.authService.logout();
  }
}

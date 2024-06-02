import { Component } from '@angular/core';
import { MovieService } from '../../movie.service';


@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent {
  query: string = '';
  movies: any[] = [];


  constructor(private movieService: MovieService) {}


  search() {
    this.movieService.searchMovies(this.query).subscribe((response: any) => {
      this.movies = response.Search;
    });
  }
}

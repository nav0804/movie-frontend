import { Component, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from '../../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Movie } from '../../classes/movie';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {
  movieLists: Movie[] = [];
  newMovieName: string = '';
  newMoviePublic: boolean = true;

  @ViewChild('addMovieDialog') addMovieDialog!: TemplateRef<any>;

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.getMovies();
    // this.addMovie();
  }

  getMovies(): void {
    this.authService.getMovieLists().subscribe(
      (data) => {
        this.movieLists = data.movieList;
      },
      error => {
        console.error('Error fetching movies', error);
      }
    );
  }

  openAddMovieDialog(): void {
    this.dialog.open(this.addMovieDialog);
  }
  closeMovieDialog():void{
    this.dialog.closeAll();
  }
  addMovie(): void {
    if (this.newMovieName) {
      const newMovie = {
        movieName: this.newMovieName,
        public: this.newMoviePublic
      };
      console.log(this.newMovieName);
      console.log(this.newMoviePublic);
      const token = localStorage.getItem('token');
      // Here you would call the service to save the new movie to the backend
      if (token) {
        this.authService.addMovie(newMovie, token).subscribe(
          (response:string) => {
            this.movieLists.push(newMovie);
            this.dialog.closeAll();
            this.router.navigate(['/home']);
          },
          (error) => {
            console.error('Error adding movie', error);
            this.snackBar.open('Error adding movie. Please try again.', 'Close', { duration: 3000 });
          }
        );
      } else {
        this.snackBar.open('You need to log in first.', 'Close', { duration: 3000 });
      }
    } else {
      this.snackBar.open('Movie name is required.', 'Close', { duration: 3000 });
    }
  }

  // ngOnInit(): void {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     this.authService.getMovieLists().subscribe(
  //       (data: any) => {
  //         // console.log(data);

  //         this.movieLists.push = data.movieList;
  //         console.log(this.movieLists);
  //       },
  //       (error) => {
  //         console.error('Error fetching movie lists:', error);
  //         this.snackBar.open('Error fetching movie lists. Please try again.', 'Close', { duration: 3000 });
  //       }
  //     );
  //   } else {
  //     this.snackBar.open('You need to log in first.', 'Close', { duration: 3000 });
  //   }
  // }
}

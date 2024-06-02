import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { Register } from './classes/register';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000'; // Adjust based on your backend URL
  constructor(private http: HttpClient, private router: Router) { }
  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/user/login`, { email, password }).pipe(
      tap((sessionData: any) => {
        // Store session data including token
        localStorage.setItem('token', sessionData.token);
        localStorage.setItem('sessionData', sessionData);
      }),
      // catchError(this.handleError)
    );;
  }
  register(register: Register): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/register`, register, { responseType: 'text' }).pipe(
    );
  }

  logout()  {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('token', token).set('Content-Type', 'application/json');
      return this.http.post(`${this.apiUrl}/user/logout`, {}, { headers, responseType:'text' }).subscribe(
        () => {
          localStorage.removeItem('token');
          localStorage.removeItem('sessionData');
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Logout error:', error);
        }
      );
    } else {
      this.router.navigate(['/login']);
      return of(null); // Return an observable to maintain a consistent return type
    }
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }


  getMovieLists(): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('token', token);
      return this.http.get(`${this.apiUrl}/user/allMovies`, { headers });
    } else {
      return throwError('No token found');
    }
  }

  addMovie(movieData: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('token', token).set('Content-Type', 'application/json');
    return this.http.post(`${this.apiUrl}/movie/addMovieLists`, { listMovieDto: [movieData] }, { headers,  responseType: 'text'  })
  }
}



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8000/user/allUsers'; // Adjust based on your backend URL
  constructor(private http: HttpClient) {}
  getUserDetails(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }
}

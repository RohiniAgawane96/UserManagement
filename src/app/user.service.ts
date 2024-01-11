import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api = 'http://localhost:3000/user';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.api)
      .pipe(
        catchError(error => {
          console.error('Error fetching users:', error);
          return throwError(error);
        })
      );
  }

addUser(postData: any): Observable<any> {
    return this.http.post(this.api, postData)
      .pipe(
        catchError(error => {
          console.error('Error adding user:', error);
          return throwError(error);
        })
      );
  }

  fetchUser(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Error fetching user with id ${id}:`, error);
          return throwError(error);
        })
      );
  }

  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(`http://localhost:3000/user/${id}`, data);
  }

  
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/user/${id}`);
  }
}
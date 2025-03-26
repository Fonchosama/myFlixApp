import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client
const apiUrl = 'https://gianflix-02d504c4ae81.herokuapp.com/';

/**
 * Service for handling user registration, login, and interactions with the API.
 */
@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  constructor(private http: HttpClient) {}

  // registration logic here
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  //User login logic here

  public userLogin(userDetails: any): Observable<any> {
    console.log('Attempting to register with:', userDetails);

    return this.http
      .post(apiUrl + 'login', userDetails, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        map((response) => {
          console.log('Login successful:', response);
          return response;
        }),
        catchError(this.handleError)
      );
  }

  //Get all movies logic here

  public getAllMovies(userDetails?: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token, }),
      })
      .pipe(
        map((response) => {
          console.log('Registration successful:', response);
          return response;
        }),
        catchError(this.handleError)
      );
  }

// Get user logic here 

public getUser(username: String): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http
    .get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token, }),
    })
    .pipe(
      map((response) => {
        console.log('Registration successful:', response);
        return response;
      }),
      catchError(this.handleError)
    );
}

  //Edit user logic here

  public editUser(userDetails: any): Observable<any> {
    console.log('Attempting to register with:', userDetails);
    const token: String | null = localStorage.getItem('token');
    const userObj: string | null = localStorage.getItem('currenUser');
    const user = userObj ? JSON.parse(userObj) : null;
  
    return this.http
      .put(apiUrl + `users/${user.Username}`, userDetails, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token, }),
      })
      .pipe(
        map((response) => {
          console.log('Registration successful:', response);
          return response;
        }),
        catchError(this.handleError)
      );
  }

  //Delete user logic here

  public deleteUser(username: String): Observable<any> {

    return this.http
      .delete(apiUrl +`users/${username}`, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        map((response) => {
          console.log('Registration successful:', response);
          return response;
        }),
        catchError(this.handleError)
      );
  }

  //add a movie to a user's list of favorites logic here

  public addFavoriteMovie(userDetails: any): Observable<any> {
    console.log('Attempting to register with:', userDetails);

    return this.http
      .post(apiUrl + 'users', userDetails, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        map((response) => {
          console.log('Registration successful:', response);
          return response;
        }),
        catchError(this.handleError)
      );
  }

  //Delete a movie from a user's list of favorites logic here

  public deleteMovie(userDetails: any): Observable<any> {
    console.log('Attempting to register with:', userDetails);

    return this.http
      .post(apiUrl + 'users', userDetails, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        map((response) => {
          console.log('Registration successful:', response);
          return response;
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}

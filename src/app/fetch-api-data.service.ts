import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client
const apiUrl = 'https://movie-api-aapq.onrender.com/';


/**
 * Service for handling user registration, login, and interactions with the API.
 */
@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  constructor(private http: HttpClient) {}

  // registration logic here
    /**
   * Registers a new user.
   * @param userDetails The user details for registration.
   * @returns An observable containing the response.
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  //User login logic here
  /**
   * Logs in a user.
   * @param userDetails The user's login credentials.
   * @returns An observable containing the authentication response.
   */
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
  /**
   * Retrieves all movies.
   * @returns An observable containing the list of movies.
   */
  public getAllMovies(): Observable<any> {
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
  /**
   * Retrieves user details.
   * @param username The username to retrieve data for.
   * @returns An observable containing user data.
   */
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
  /**
   * Updates user details.
   * @param userDetails The updated user data.
   * @returns An observable containing the response.
   */
  public editUser(userDetails: any): Observable<any> {
    console.log('Attempting to register with:', userDetails);
    const token: String | null = localStorage.getItem('token');
    const userObj: string | null = localStorage.getItem('currentUser');
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
  /**
   * Deletes a user account.
   * @param username The username of the account to delete.
   * @returns An observable containing the response.
   */
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

  public addFavoriteMovie(movieID: String): Observable<any> {
    const token: String | null = localStorage.getItem('token');
    const userObj: string | null = localStorage.getItem('currentUser');
    const user = userObj ? JSON.parse(userObj) : null;

    return this.http
      .patch(`${apiUrl}users/${user.Username}/movies/${movieID}`, null, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token, }),
      })
      .pipe(
        map((response) => {
          console.log('Movie added to Favorite list successfully:', response);
          return response;
        }),
        catchError(this.handleError)
      );
  }

  //Delete a movie from a user's list of favorites logic here

  public deleteFavoriteMovie(movieID: String): Observable<any> {
    const token: String | null = localStorage.getItem('token');
    const userObj: string | null = localStorage.getItem('currentUser');
    const user = userObj ? JSON.parse(userObj) : null;

    return this.http
      .delete(`${apiUrl}users/${user.Username}/movies/${movieID}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token, }),
      })
      .pipe(
        map((response) => {
          console.log('Movie removed from Favorite list successfully:', response);
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

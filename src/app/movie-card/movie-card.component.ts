import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MovieDescriptionComponent } from '../movie-description/movie-description.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * @description
 * MovieCardComponent is a component that displays movie cards and allows users to interact
 * with different dialogs to view movie details such as description, genre, and director.
 */

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  standalone: false,
})
export class MovieCardComponent implements OnInit {
    /**
   * @description
   * An array that holds movie objects fetched from the backend.
   * @type {any[]}
   */
  movies: any[] = [];
  favoriteMovies: string[] = [];

  /**
   * @constructor
   * Creates an instance of MovieCardComponent.
   * @param {UserRegistrationService} fetchApiData - Service to fetch data from the backend API.
   * @param {MatDialog} dialog - Angular Material dialog service to handle opening dialogs.
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {}

    /**
   * @description
   * Automatically runs when the component is initialized. Fetches all movies from the backend.
   * @returns {void}
   */
  // Automatically run when the component is initialized
  ngOnInit(): void {
    this.getAllMovies();
    this.getUser();
  }

  /**
   * @description
   * Fetches all movies from the backend API and stores them in the `movies` array.
   * This function is called during component initialization.
   * @returns {void}
   */
  // Function to get all movies from the database
  getAllMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
  /**
   * @description
   * Opens a dialog to display the movie description.
   * @param {any} movie - The movie object to display in the dialog.
   * @returns {void}
   */
    // Function to open the description dialog
    openDescriptionDialog(movie: any): void {
      this.dialog.open(MovieDescriptionComponent, {
        data: movie, // Pass the entire movie object to the dialog
        width: '500px',
      });
    }

      /**
   * @description
   * Opens a dialog to display the movie genre.
   * @param {any} movie - The movie object to display in the dialog.
   * @returns {void}
   */
       // Function to open the genre dialog
       openGenreDialog(movie: any): void {
        this.dialog.open(MovieGenreComponent, {
          data: movie, // Pass the entire movie object to the dialog
          width: '500px',
        });}
  /**
   * @description
   * Opens a dialog to display the movie director.
   * @param {any} movie - The movie object to display in the dialog.
   * @returns {void}
   */
          // Function to open the director dialog
   openDirectorDialog(movie: any): void {
      this.dialog.open(MovieDirectorComponent, {
        data: movie, // Pass the entire movie object to the dialog
        width: '500px',
      });
  }

    // Fetch the user's profile and store favorite movies
    getUser(): void {
      const userObj: string | null = localStorage.getItem('currentUser');
      if (userObj) {
        const user = JSON.parse(userObj);
        console.log(user);
        this.fetchApiData.getUser(user.Username).subscribe((resp: any) => {
          this.favoriteMovies = resp.FavoriteMovies;
        });
      }
    }

    // Check if a movie is a favorite
    isFavorite(movieId: string): boolean {
      return this.favoriteMovies.includes(movieId);
    }
  
    // Toggle favorite status of a movie
    toggleFavorite(movieId: string): void {
      if (this.isFavorite(movieId)) {
        this.fetchApiData.deleteFavoriteMovie(movieId).subscribe(
          () => {
            this.favoriteMovies = this.favoriteMovies.filter(
              (id) => id !== movieId
            );
            this.updateLocalStorageFavorites();
            this.snackBar.open('Movie removed from favorites!', 'OK', {
              duration: 2000,
            });
          },
          (error) => {
            console.error('Failed to remove favorite movie:', error);
          }
        );
      } else {
        this.fetchApiData.addFavoriteMovie(movieId).subscribe(
          () => {
            this.favoriteMovies.push(movieId);
            this.updateLocalStorageFavorites();
            this.snackBar.open('Movie saved to favorites!', 'OK', {
              duration: 2000,
            });
          },
          (error) => {
            console.error('Failed to add favorite movie:', error);
          }
        );
      }
    }

      // Update the favorites in local storage
  updateLocalStorageFavorites(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    currentUser.FavoriteMovies = this.favoriteMovies;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }
}

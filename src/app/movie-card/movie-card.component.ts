import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MovieDescriptionComponent } from '../movie-description/movie-description.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';

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

  /**
   * @constructor
   * Creates an instance of MovieCardComponent.
   * @param {UserRegistrationService} fetchApiData - Service to fetch data from the backend API.
   * @param {MatDialog} dialog - Angular Material dialog service to handle opening dialogs.
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog
  ) {}

    /**
   * @description
   * Automatically runs when the component is initialized. Fetches all movies from the backend.
   * @returns {void}
   */
  // Automatically run when the component is initialized
  ngOnInit(): void {
    this.getAllMovies();
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

}

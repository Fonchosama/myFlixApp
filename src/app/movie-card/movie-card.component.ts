import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MovieDescriptionComponent } from '../movie-description/movie-description.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  standalone: false,
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog
  ) {}

  // Automatically run when the component is initialized
  ngOnInit(): void {
    this.getAllMovies();
  }

  // Function to get all movies from the database
  getAllMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

    // Function to open the description dialog
    openDescriptionDialog(movie: any): void {
      this.dialog.open(MovieDescriptionComponent, {
        data: movie, // Pass the entire movie object to the dialog
        width: '500px',
      });
    }
       // Function to open the genre dialog
       openGenreDialog(movie: any): void {
        this.dialog.open(MovieGenreComponent, {
          data: movie, // Pass the entire movie object to the dialog
          width: '500px',
        });}

          // Function to open the director dialog
   openDirectorDialog(movie: any): void {
      this.dialog.open(MovieDirectorComponent, {
        data: movie, // Pass the entire movie object to the dialog
        width: '500px',
      });
  }

}

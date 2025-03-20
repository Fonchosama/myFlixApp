import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MovieDescriptionComponent } from '../movie-description/movie-description.component';

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

    // Function to open the synopsis dialog
    openSynopsisDialog(movie: any): void {
      this.dialog.open(MovieDescriptionComponent, {
        data: movie, // Pass the entire movie object to the dialog
        width: '500px',
      });
    }
}

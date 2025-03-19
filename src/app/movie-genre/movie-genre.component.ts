import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-genre',
  standalone: false,
  templateUrl: './movie-genre.component.html',
  styleUrl: './movie-genre.component.scss'
})
export class MovieGenreComponent {

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<MovieGenreComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  // This is the function responsible for sending the form inputs to the backend
      getGenre(movie: any): void {
        this.fetchApiData.movieGenre(this.userData).subscribe(
          (result) => {
            // Logic for a successful user registration goes here! (To be implemented)
            this.dialogRef.close(); // This will close the modal on success!
            this.snackBar.open(result, 'OK', {
              duration: 2000,
            });
          },
          (result) => {
            console.log(result);
            if (result.data) {
              this.snackBar.open('User registered successfully!', 'OK', {
                duration: 2000,
              });
            }
            this.snackBar.open(result, 'OK', {
              duration: 2000,
            });
          }
        );
      }

}

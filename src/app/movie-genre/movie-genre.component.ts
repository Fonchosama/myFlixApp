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

 
  }



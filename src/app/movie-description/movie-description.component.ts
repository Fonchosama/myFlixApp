import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


/**
 * @description
 * MovieDescriptionComponent is used to display detailed information about a movie in a dialog.
 * It receives movie data as input and provides a way to close the dialog.
 */
@Component({
  selector: 'app-movie-description',
  standalone: false,
  templateUrl: './movie-description.component.html',
  styleUrl: './movie-description.component.scss'
})
export class MovieDescriptionComponent {

    /**
   * @constructor
   * Creates an instance of MovieDescriptionComponent.
   * @param {MatDialogRef<MovieDescriptionComponent>} dialogRef - A reference to the dialog, used to close it.
   * @param {any} data - The data injected into the dialog, which contains the movie details.
   */
  constructor(
    public dialogRef: MatDialogRef<MovieDescriptionComponent>,
    // pass the entire movie object to dialog as data
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  // Close the dialog
  closeDialog(): void {
    this.dialogRef.close();
  }
}

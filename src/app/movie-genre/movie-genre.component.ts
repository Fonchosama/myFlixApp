import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


/**
 * Component that displays information about a movie genre in a modal dialog.
 */
@Component({
  selector: 'app-movie-genre',
  standalone: false,
  templateUrl: './movie-genre.component.html',
  styleUrl: './movie-genre.component.scss'
})
export class MovieGenreComponent {

   /**
   * Creates an instance of MovieGenreComponent.
   * @param dialogRef Reference to the dialog, used to close it.
   * @param data Movie data passed to the dialog.
   */
  constructor(
    public dialogRef: MatDialogRef<MovieGenreComponent>,
    // pass the entire movie object to dialog as data
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  // Close the dialog
  closeDialog(): void {
    this.dialogRef.close();
  }
}


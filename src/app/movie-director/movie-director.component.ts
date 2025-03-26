import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


/**
 * Component that displays information about a movie director in a modal dialog.
 */
@Component({
  selector: 'app-movie-director',
  standalone: false,
  templateUrl: './movie-director.component.html',
  styleUrl: './movie-director.component.scss'
})
export class MovieDirectorComponent {
    /**
   * Creates an instance of MovieDirectorComponent.
   * @param dialogRef Reference to the dialog, used to close it.
   * @param data Movie data passed to the dialog.
   */
    constructor(
      public dialogRef: MatDialogRef<MovieDirectorComponent>,
      // pass the entire movie object to dialog as data
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {}


      // Close the dialog
  closeDialog(): void {
    this.dialogRef.close();
  }
}

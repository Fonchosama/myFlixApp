import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';


/**
 * Component responsible for handling user registration.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
  standalone: false,
})
export class UserRegistrationFormComponent implements OnInit {
   /**
   * Object storing user registration data.
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };


    /**
   * Creates an instance of UserRegistrationFormComponent.
   * @param fetchApiData Service for handling API requests related to user registration.
   * @param dialogRef Reference to the dialog instance for closing the modal.
   * @param snackBar Snackbar service for displaying notifications.
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  // This is the function responsible for sending the form inputs to the backend
    /**
   * Sends the user registration data to the backend.
   * Closes the dialog and displays a notification on success or error.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
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

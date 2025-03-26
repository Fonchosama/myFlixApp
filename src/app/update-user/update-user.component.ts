// update-user.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRegistrationService } from '../fetch-api-data.service';


/**
 * Component that provides a form to update user information in a modal dialog.
 */
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
  standalone: false,
})
export class UpdateUserComponent {
  updateForm: FormGroup;


    /**
   * Creates an instance of UpdateUserComponent.
   * @param dialogRef Reference to the dialog, used to close it.
   * @param data Current user data passed to the dialog.
   * @param fb FormBuilder instance for creating the reactive form.
   * @param userRegistrationService Service for handling user data updates.
   */
  constructor(

    
    private dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Pass the current user data to dialog
    private fb: FormBuilder,
    private userRegistrationService: UserRegistrationService
  ) {
    this.updateForm = this.fb.group({
      Username: [data.Username, [Validators.required]],
      Password: ['', [Validators.required, Validators.minLength(6)]], // Ensure strong password
      Email: [data.Email, [Validators.required, Validators.email]],
    });
  }


    /**
   * Submits the form to update the user profile.
   * If successful, updates local storage and closes the dialog with the updated data.
   */
  onSubmit(): void {
    if (this.updateForm.valid) {
      this.userRegistrationService
        .editUser(this.updateForm.value)
        .subscribe(
          (response) => {
            console.log('Profile updated successfully!', response);
            // Update localStorage
            localStorage.setItem('currentUser', JSON.stringify(response));
            this.dialogRef.close(response); // Pass updated data back to profile component
          },
          (error) => {
            console.error('Error updating profile', error);
          }
        );
    }
  }

  onCancel(): void {
    this.dialogRef.close(); // Close the dialog without any changes
  }
}
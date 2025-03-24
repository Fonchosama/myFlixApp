// update-user.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
  standalone: false,
})
export class UpdateUserComponent {
  updateForm: FormGroup;

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
import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';

/**
 * Component for handling user login.
 */

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.scss',
  standalone: false,
})
export class LoginViewComponent {

    /**
   * User data object containing username and password.
   */
  @Input() userData = { Username: '', Password: '' };

  /**
   * Creates an instance of LoginViewComponent.
   * @param fetchApiData - Service for user authentication.
   * @param dialogRef - Reference to the dialog modal.
   * @param snackBar - SnackBar for displaying messages.
   * @param router - Router for navigation.
   */

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<LoginViewComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  
  ngOnInit(): void {}
    /**
   * Handles user login by calling the authentication service.
   * Stores user data and token in local storage upon success.
   * Displays success or error message using SnackBar.
   * Navigates to movies page on successful login.
   */
  userLogin(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        localStorage.setItem('currenUser', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        console.log(
          'the user has been logged in and the token was stored in the local storage'
        );
        // Logic for a successful user registration goes here! (To be implemented)
        this.dialogRef.close(); // This will close the modal on success!
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
        this.router.navigate(['movies']);
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}

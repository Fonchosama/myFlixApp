import { Component, OnInit } from '@angular/core';
import { LoginViewComponent } from '../login-view/login-view.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';


/**
 * Component representing the welcome page of the application.
 * Provides options for user registration and login.
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  standalone: false, // REN: Because of recent version update, we need explictly set standalone:false to jump to NGMODULE method.
  // REN: If No Standalone, then there is no need of IMPORTS here, so deleted
  // REN: Did the same for all the other components as well
})
export class WelcomePageComponent implements OnInit {
    /**
   * Creates an instance of WelcomePageComponent.
   * @param dialog Service for opening modal dialogs.
   */
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}
   /**
   * Lifecycle hook that runs when the component is initialized.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
    });
  }
    /**
   * Opens the user login dialog.
   */
  openUserLoginDialog(): void {
    this.dialog.open(LoginViewComponent, {
      width: '280px',
    });
  }
}

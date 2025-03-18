import { Component, OnInit } from '@angular/core';
import { LoginViewComponent } from '../login-view/login-view.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  standalone: false, // REN: Because of recent version update, we need explictly set standalone:false to jump to NGMODULE method.
  // REN: If No Standalone, then there is no need of IMPORTS here, so deleted
  // REN: Did the same for all the other components as well
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
    });
  }
  openUserLoginDialog(): void {
    this.dialog.open(LoginViewComponent, {
      width: '280px',
    });
  }
}

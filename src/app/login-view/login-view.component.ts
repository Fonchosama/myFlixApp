import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.scss',
  standalone: true,
    imports: [
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      FormsModule
    ]

})
export class LoginViewComponent {
  @Input() userData = { Username: '', Password: '' };
  
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<LoginViewComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
     }
     userLogin(): void {
      this.fetchApiData.userLogin(this.userData).subscribe((result) => {
        localStorage.setItem('currenUser', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        console.log("the user has been logged in and the token was stored in the local storage");
    // Logic for a successful user registration goes here! (To be implemented)
       this.dialogRef.close(); // This will close the modal on success!
       this.snackBar.open(result, 'OK', {
          duration: 2000
       });
      }, (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000
        });
      });
    }
  
    }



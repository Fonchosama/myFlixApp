import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  user: any = {};

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public router: Router
  ) {}

  // Automatically run when the component is initialized
  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const userObj: string | null = localStorage.getItem('currenUser');
    if (userObj) {
      const user = JSON.parse(userObj);
      console.log(user);
      this.fetchApiData.getUser(user.Username).subscribe((resp: any) => {
        this.user = resp;
        console.log(this.user);
        return this.user;
      });
    }
  }

  openUpdateDialog(): void {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      width: '400px',
      data: this.user, // Pass current user data to dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Update the displayed user data with the result from the dialog
        this.user = result;
        // You may also want to reload or refetch the data from the server
      }
    });
  }

  logout(): void {
    // Remove user data from local storage and navigate to welcome page
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('currenUser');
    this.router.navigate(['/welcome']);
  }

  // deleteAccount function rewritten
  deleteAccount(): void {
    if (
      this.user &&
      confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
      )
    ) {
      this.fetchApiData.deleteUser(this.user.Username).subscribe(
        (result) => {
          // Call logout to clear local storage and navigate to the welcome page
          this.logout();

          // Optionally, show a success message
          alert('Your account has been deleted successfully.');
        },
        (err) => {
          // Log and handle the error appropriately
          console.error('Failed to delete account:');

          // Provide user feedback on failure
          alert('Your account has been deleted successfully.');
          this.logout();
        }
      );
    }
  }
}

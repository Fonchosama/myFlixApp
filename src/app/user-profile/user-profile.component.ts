import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


/**
 * Component that handles user profile display, updates, and account deletion.
 */
@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
    /**
   * Stores the user data.
   */
  user: any = {};
  favoriteMovies: any[] = [];

    /**
   * Creates an instance of UserProfileComponent.
   * @param fetchApiData Service for handling API requests related to user data.
   * @param dialog MatDialog instance for opening modals.
   * @param router Router instance for navigation.
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}

  // Automatically run when the component is initialized
  ngOnInit(): void {
    this.getUser();
  }
  /**
   * Retrieves user data from local storage and fetches the latest info from the API.
   */
  getUser(): void {
    const userObj: string | null = localStorage.getItem('currentUser');
    if (userObj) {
      const user = JSON.parse(userObj);
      console.log(user);
      this.fetchApiData.getUser(user.Username).subscribe((resp: any) => {
        this.user = resp;
        console.log(this.user.FavoriteMovies);
        const favMoviesIDs = resp.FavoriteMovies;
        this.fetchApiData.getAllMovies().subscribe((resp: any) => {
          this.favoriteMovies = resp.filter((mov: any) => favMoviesIDs.includes(mov._id))
        })
        return this.user;
      });
    }
  }
  /**
   * Opens the update user dialog, passing the current user data.
   * Updates the displayed user data after closing the dialog.
   */
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

  /**
   * Logs out the user by removing local storage data and navigating to the welcome page.
   */
  logout(): void {
    // Remove user data from local storage and navigate to welcome page
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/welcome']);
  }

  /**
   * Deletes the user's account after confirmation.
   * If successful, logs the user out and shows an alert.
   */
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

  // Toggle favorite status of a movie
  deleteFavoriteMovie(movieId: string): void {
      this.fetchApiData.deleteFavoriteMovie(movieId).subscribe(
        () => {
          this.favoriteMovies = this.favoriteMovies.filter(
            (mov) => mov._id !== movieId
          );
          this.updateLocalStorageFavorites();
          this.snackBar.open('Movie removed from favorites!', 'OK', {
            duration: 2000,
          });
        },
        (error) => {
          console.error('Failed to remove favorite movie:', error);
        }
      );
  }

       // Update the favorites in local storage
       updateLocalStorageFavorites(): void {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        currentUser.FavoriteMovies = this.favoriteMovies.map(mov => mov._id);
        console.log("Current Fav Movies Updated", currentUser.FavoriteMovies)
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
      }
    
}

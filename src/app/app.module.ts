import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { LoginViewComponent } from './login-view/login-view.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MovieCardComponent } from './movie-card/movie-card.component';
import {MatIconModule} from '@angular/material/icon';
import { UserProfileComponent } from './user-profile/user-profile.component';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
];

@NgModule({
  // REN: We need to declare the custom components here, if NO standalone approach.
  declarations: [
    AppComponent,
    LoginViewComponent,
    UserRegistrationFormComponent,
    WelcomePageComponent,
    MovieCardComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatIconModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent], // REN: Need to bootstrap the AppComponent from here, instead of `main.ts`
})
export class AppModule {}

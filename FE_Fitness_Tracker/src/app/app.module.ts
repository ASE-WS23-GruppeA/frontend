import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewWorkoutComponent } from './components/new-workout/new-workout.component';
import { FormsModule } from '@angular/forms';
import { AccessDeniedComponent } from './errors/access-denied/access-denied.component';
import { AdminComponent } from './components/admin/admin.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptor } from "./_helpers/http.interceptor";
import { UserService } from './_services/user.service';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'new-workout', component: NewWorkoutComponent },
  // Füge weitere Routen hinzu, wenn nötig
];

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    LoginComponent,
    SignUpComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    ProfileComponent,
    NewWorkoutComponent,
    AccessDeniedComponent,
    AdminComponent,
    HttpClientModule
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

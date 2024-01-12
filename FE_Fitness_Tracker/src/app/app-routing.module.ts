import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewWorkoutComponent } from './components/new-workout/new-workout.component';
import { authGuard } from "./_helpers/auth.guard";
import { AccessDeniedComponent } from "./errors/access-denied/access-denied.component";
import { AdminComponent } from "./components/admin/admin.component";


const routes: Routes = [
  { path: '', redirectTo: '/log-in', pathMatch: 'full' },
  { path: 'log-in', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard], data: { roles: ['ROLE_ADMIN'] } },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'forbidden', component: AccessDeniedComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'about', component: AboutComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'new-workout', component: NewWorkoutComponent },
  // Weitere Routen, wenn vorhanden
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
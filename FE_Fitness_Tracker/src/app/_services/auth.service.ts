// auth.service.ts
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError, Subject} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {StorageService} from './storage.service';
import {Router} from '@angular/router';
import {User} from '../_models/user.model';
import {MessageService} from "./message.service";

interface AuthResponseData {
  id: number;
  email: string;
  jwtToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtToken = new BehaviorSubject<string | null>(null);
  AuthenticatedUser$ = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router,
    private messageService: MessageService // Inject the MessageService
  ) { }

  storeJwtToken(token: string | null) {
    if (token !== null) {
      this.jwtToken.next(token);
    }
  }

  getJwtToken(): Observable<string | null> {
    return this.jwtToken.asObservable();
  }

  login(username: string, password: string) {
    return this.http.post<AuthResponseData>('http://localhost:8443/api/auth/login', {
      username,
      password
    }, {withCredentials: true})
      .pipe(
        catchError(err => {
          let errorMessage = 'An unknown error occurred!';

          if (err.status === 401) {
            errorMessage = 'Incorrect username or password.';

            this.messageService.changeMessage(errorMessage); // Use MessageService to set the error message
          }

          return throwError(() => new Error(errorMessage));
        }),
        tap(user => {
          const extractedUser: User = {
            email: user.email,
            id: user.id,
            role: {name: 'UserRole', permissions: []} // Adjust role details as needed
          };
          this.storeJwtToken(user.jwtToken);
          this.storageService.saveUser(extractedUser);
          this.AuthenticatedUser$.next(extractedUser);
        })
      );
  }

  autoLogin() {
    const userData = this.storageService.getSavedUser();
    if (userData) {
      this.AuthenticatedUser$.next(userData);
    }
  }

  logout() {
    this.storeJwtToken(null);
    this.storageService.clean();
    this.AuthenticatedUser$.next(null);
    this.router.navigate(['/log-in']);
    this.messageService.clearMessage();
  }

  refreshToken() {
    return this.http.post('http://localhost:8443/api/auth/refresh-token-cookie', {}, {withCredentials: true});
  }

  createUser(username: string, email: string, password: string): Promise<AuthResponseData> {
    return new Promise((resolve, reject) => {
      this.http.post<AuthResponseData>('http://localhost:8443/api/auth/register', {
        username,
        email,
        password
      }, { withCredentials: true })
        .pipe(
          catchError(err => {
            let errorMessage = 'An error occurred during sign up.';
            if (err.error && err.error.message) {
              errorMessage = err.error.message;
            }
            this.messageService.changeMessage(errorMessage);
            return throwError(() => new Error(errorMessage));
          })
        )
        .subscribe({
          next: (user) => {
            resolve(user); // Resolve the promise with the user data
          },
          error: (error) => {
            reject(error); // Reject the promise with the error
          }
        });
    });
  }



  getAuthStatusListener(): Observable<User | null> {
    return this.AuthenticatedUser$.asObservable();
  }

}
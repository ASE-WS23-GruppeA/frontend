// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { User } from '../_models/user.model';

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
        private router: Router
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
        return this.http.post<AuthResponseData>('http://localhost:8443/api/auth/login', { username, password }, { withCredentials: true })
            .pipe(
                catchError(err => {
                    let errorMessage = 'An unknown error occurred!';
                    if (err.error.message === 'Bad credentials') {
                        errorMessage = 'The username or password you entered is invalid';
                    }
                    return throwError(() => new Error(errorMessage));
                }),
                tap(user => {
                    const extractedUser: User = {
                        email: user.email,
                        id: user.id,
                        role: { name: 'UserRole', permissions: [] } // Adjust role details as needed
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
        this.router.navigate(['/login']);
    }

    refreshToken() {
        return this.http.post('http://localhost:8443/api/auth/refresh-token-cookie', {}, { withCredentials: true });
    }
}

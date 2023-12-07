import { Injectable } from '@angular/core';
import { User } from '../_models/user.model';

const USER_KEY = 'authenticated-user';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() { }

    saveUser(user: User | null) {
        if (user) {
            window.localStorage.setItem(USER_KEY, JSON.stringify(user));
        } else {
            this.clean(); // If user is null, clean up the storage
        }
    }

    getSavedUser(): User | null {
        const user = window.localStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : null;
    }

    clean(): void {
        window.localStorage.removeItem(USER_KEY);
    }
}
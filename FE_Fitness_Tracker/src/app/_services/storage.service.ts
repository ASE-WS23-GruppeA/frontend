import {Injectable} from '@angular/core';
import {User} from '../_models/user.model';
import {BehaviorSubject} from "rxjs";

const USER_KEY = 'authenticated-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor() { }

  get userChanges() {
    return this.userSubject.asObservable();
  }

  saveUser(user: User | null) {
    if (user) {
      window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      this.clean(); // If user is null, clean up the storage
    }

    this.userSubject.next(user);
  }

  getSavedUser(): User | null {
    const user = window.localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  clean(): void {
    window.localStorage.removeItem(USER_KEY);
    this.userSubject.next(null);
  }

}
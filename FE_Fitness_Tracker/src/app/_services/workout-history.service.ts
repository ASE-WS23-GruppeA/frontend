import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class WorkoutHistoryService {

  private workoutServiceBaseUrl = `${environment.apiGatewayBaseUrl}/workouts`;
  private currentJwtToken: string | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.getJwtToken().subscribe(token => {
      this.currentJwtToken = token;
    });
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();

    if (this.currentJwtToken) {
      headers = headers.set('Authorization', `Bearer ${this.currentJwtToken}`);
    }

    return headers;
  }

  getAllWorkouts(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.workoutServiceBaseUrl}/user/${userId}`, {headers: this.getHeaders()});
  }

  getLastWorkout(userId: number): Observable<any> {
    return this.http.get<any>(`${this.workoutServiceBaseUrl}/last/${userId}`, {headers: this.getHeaders()});
  }

  deleteWorkout(workoutID: number): Observable<any> {
    return this.http.delete(`${this.workoutServiceBaseUrl}/${workoutID}`, {headers: this.getHeaders()});
  }

}

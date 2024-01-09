import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private url = 'TODO';
  constructor(private http: HttpClient) { }

  //GET user progress
  //GET /user-progress/{userId}
  getUserProgress(userId: string): Observable<any> {
    return this.http.get(`${this.url}/user-progress/${userId}`);
  }

  //Get workout progress
  //GET /workout-progress/{workoutId}
  getWorkoutProgress(workoutId: string): Observable<any> {

    return this.http.get(`${this.url}/workout-progress/${workoutId}`);

  }

  //Get Exercise ProgresS
  //GET /exercise-progress/{exerciseId}
  getExerciseProgress(exerciseId: string): Observable<any> {

    return this.http.get(`${this.url}/exercise-progress/${exerciseId}`);

  }

  //Get Total volume
  //GET /total-volume/{userId}
  getTotalVolume(userId: string): Observable<any> {
    return this.http.get(`${this.url}/total-volume/${userId}`);
  }

}

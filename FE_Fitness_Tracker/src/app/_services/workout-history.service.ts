import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WorkoutHistoryService {

  private workoutServiceBaseUrl = `${environment.apiGatewayBaseUrl}/workouts`;
  constructor(private http: HttpClient) { }
 
  getAllWorkouts(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.workoutServiceBaseUrl}/user/${userId}`);
  }
  
  getLastWorkout(userId: number): Observable<any> {
    return this.http.get<any>(`${this.workoutServiceBaseUrl}/last/${userId}`);
  }
  
  deleteWorkout(workoutID: number): Observable<any> {
    return this.http.delete(`${this.workoutServiceBaseUrl}/${workoutID}`);
  }
  
 

}

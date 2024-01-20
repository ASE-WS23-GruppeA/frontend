import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutHistoryService {

  private url = 'http://localhost:8443/workouts'; //old port: 3001
  constructor(private http: HttpClient) { }
 
  getAllWorkouts(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/user/${userId}`);
  }
  
  getLastWorkout(userId: number): Observable<any> {
    return this.http.get<any>(`${this.url}/last/${userId}`);
  }
  

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  private url = 'http://localhost:8081/analytics';
  constructor(private http: HttpClient) { }
 
  getUserProgress(userId: number): Observable<any> {
    return this.http.get(`${this.url}/user-progress/${userId}`);
  }

  getWorkoutProgress(workoutId: number): Observable<any> {
    return this.http.get(`${this.url}/workout-progress/${workoutId}`);
  }

  getExerciseProgress(exerciseId: number): Observable<any> {
    return this.http.get(`${this.url}/exercise-progress/${exerciseId}`);
  }

  getProgressByDate(userId: number, startDate: string, endDate: string): Observable<any> {
    return this.http.get(`${this.url}/progress-by-date/${userId}`, { params: { startDate, endDate } });
  }

  getProgressByMuscleGroup(userId: number, muscleGroup: string): Observable<any> {
    return this.http.get(`${this.url}/progress-by-muscle-group/${userId}`, { params: { muscleGroup } });
  }

  getTotalVolume(userId: number): Observable<any> {
    return this.http.get(`${this.url}/total-volume/${userId}`);
  }

  getWeightProgress(userId: number, exerciseName: string, startDate?: string, endDate?: string): Observable<any> {
    const params: {[key: string]: string} = {};
    if (startDate) params['startDate'] = startDate;
    if (endDate) params['endDate'] = endDate;
    return this.http.get(`${this.url}/weight-progress/${userId}/${exerciseName}`, { params });
  }
  
  getUserTrainingInfo(userId: number, startDate?: string, endDate?: string): Observable<any> {
    const params: {[key: string]: string} = {};
    if (startDate) params['startDate'] = startDate;
    if (endDate) params['endDate'] = endDate;
    return this.http.get(`${this.url}/user-training-info/${userId}`, { params });
  }
  
  getAverageWeightProgress(userId: number, muscleGroup: string, startDate?: string, endDate?: string): Observable<any> {
    const params: {[key: string]: string} = {};
    if (startDate) params['startDate'] = startDate;
    if (endDate) params['endDate'] = endDate;
    return this.http.get(`${this.url}/average-weight-progress/${userId}/${muscleGroup}`, { params });
  }
  
}

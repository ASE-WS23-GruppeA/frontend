import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  private analyticsServiceBaseUrl = `${environment.apiGatewayBaseUrl}/analytics`;
  constructor(private http: HttpClient) { }

  getUserProgress(userId: number): Observable<any> {
    return this.http.get(`${this.analyticsServiceBaseUrl}/user-progress/${userId}`);
  }

  getWorkoutProgress(workoutId: number): Observable<any> {
    return this.http.get(`${this.analyticsServiceBaseUrl}/workout-progress/${workoutId}`);
  }

  getExerciseProgress(exerciseId: number): Observable<any> {
    return this.http.get(`${this.analyticsServiceBaseUrl}/exercise-progress/${exerciseId}`);
  }

  getProgressByDate(userId: number, startDate: string, endDate: string): Observable<any> {
    return this.http.get(`${this.analyticsServiceBaseUrl}/progress-by-date/${userId}`, { params: { startDate, endDate } });
  }

  getProgressByMuscleGroup(userId: number, muscleGroup: string): Observable<any> {
    return this.http.get(`${this.analyticsServiceBaseUrl}/progress-by-muscle-group/${userId}`, { params: { muscleGroup } });
  }

  getTotalVolume(userId: number): Observable<any> {
    return this.http.get(`${this.analyticsServiceBaseUrl}/total-volume/${userId}`);
  }

  getWeightProgress(userId: number, exerciseName: string, startDate?: string, endDate?: string): Observable<any> {
    const params: {[key: string]: string} = {};
    if (startDate) params['startDate'] = startDate;
    if (endDate) params['endDate'] = endDate;
    return this.http.get(`${this.analyticsServiceBaseUrl}/weight-progress/${userId}/${exerciseName}`, { params });
  }

  getUserTrainingInfo(userId: number, startDate?: string, endDate?: string): Observable<any> {
    const params: {[key: string]: string} = {};
    if (startDate) params['startDate'] = startDate;
    if (endDate) params['endDate'] = endDate;
    return this.http.get(`${this.analyticsServiceBaseUrl}/user-training-info/${userId}`, { params });
  }

  getAverageWeightProgress(userId: number, muscleGroup: string, startDate?: string, endDate?: string): Observable<any> {
    const params: {[key: string]: string} = {};
    if (startDate) params['startDate'] = startDate;
    if (endDate) params['endDate'] = endDate;
    return this.http.get(`${this.analyticsServiceBaseUrl}/average-weight-progress/${userId}/${muscleGroup}`, { params });
  }

}

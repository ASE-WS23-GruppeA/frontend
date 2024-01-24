import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {AuthService} from "./auth.service";


@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  private analyticsServiceBaseUrl = `${environment.apiGatewayBaseUrl}/analytics`;
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

  getUserProgress(userId: number): Observable<any> {
    return this.http.get(`${this.analyticsServiceBaseUrl}/user-progress/${userId}`, {headers: this.getHeaders()});
  }

  getWorkoutProgress(workoutId: number): Observable<any> {
    return this.http.get(`${this.analyticsServiceBaseUrl}/workout-progress/${workoutId}`, {headers: this.getHeaders()});
  }

  getExerciseProgress(exerciseId: number): Observable<any> {
    return this.http.get(`${this.analyticsServiceBaseUrl}/exercise-progress/${exerciseId}`, {headers: this.getHeaders()});
  }

  getProgressByDate(userId: number, startDate: string, endDate: string): Observable<any> {
    return this.http.get(`${this.analyticsServiceBaseUrl}/progress-by-date/${userId}`, {
      headers: this.getHeaders(),
      params: {startDate, endDate}
    });
  }

  getProgressByMuscleGroup(userId: number, muscleGroup: string): Observable<any> {
    return this.http.get(`${this.analyticsServiceBaseUrl}/progress-by-muscle-group/${userId}`, {
      headers: this.getHeaders(),
      params: {muscleGroup}
    });
  }

  getTotalVolume(userId: number): Observable<any> {
    return this.http.get(`${this.analyticsServiceBaseUrl}/total-volume/${userId}`, {headers: this.getHeaders()});
  }

  getWeightProgress(userId: number, exerciseName: string, startDate?: string, endDate?: string): Observable<any> {
    const params: { [key: string]: string } = {};
    if (startDate) params['startDate'] = startDate;
    if (endDate) params['endDate'] = endDate;
    return this.http.get(`${this.analyticsServiceBaseUrl}/weight-progress/${userId}/${exerciseName}`, {
      headers: this.getHeaders(),
      params
    });
  }

  getUserTrainingInfo(userId: number, startDate?: string, endDate?: string): Observable<any> {
    const params: { [key: string]: string } = {};
    if (startDate) params['startDate'] = startDate;
    if (endDate) params['endDate'] = endDate;
    return this.http.get(`${this.analyticsServiceBaseUrl}/user-training-info/${userId}`, {
      headers: this.getHeaders(),
      params
    });
  }

  getAverageWeightProgress(userId: number, muscleGroup: string, startDate?: string, endDate?: string): Observable<any> {
    const params: { [key: string]: string } = {};
    if (startDate) params['startDate'] = startDate;
    if (endDate) params['endDate'] = endDate;
    return this.http.get(`${this.analyticsServiceBaseUrl}/average-weight-progress/${userId}/${muscleGroup}`, {
      headers: this.getHeaders(),
      params
    });
  }

}

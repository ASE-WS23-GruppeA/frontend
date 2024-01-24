import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Exercise} from 'src/app/_models/exercise.model';
import {environment} from "../../environments/environment";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private exerciseServiceBaseUrl = `${environment.apiGatewayBaseUrl}/exercises`;
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

  fetchExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.exerciseServiceBaseUrl, {headers: this.getHeaders()});
  }

  // Add a new function to get exercises by muscle group
  getExercisesByMuscleGroup(muscleGroup: string): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.exerciseServiceBaseUrl}?muscleGroup=${muscleGroup}`, {headers: this.getHeaders()});
  }

  //For analytics:
  // get exercises by ID
  getExerciseById(id: number): Observable<Exercise> {
    return this.http.get<Exercise>(`${this.exerciseServiceBaseUrl}/${id}`, {headers: this.getHeaders()});
  }

  //get All exercises
  getAllExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.exerciseServiceBaseUrl, {headers: this.getHeaders()});
  }
}

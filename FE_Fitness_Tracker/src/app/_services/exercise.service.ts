import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exercise } from 'src/app/_models/exercise.model';
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ExerciseService {

    private exerciseServiceBaseUrl = `${environment.apiGatewayBaseUrl}/exercises`;

    constructor(private http: HttpClient) { }

    fetchExercises(): Observable<Exercise[]> {
        return this.http.get<Exercise[]>(this.exerciseServiceBaseUrl);
    }

    // Add a new function to get exercises by muscle group
    getExercisesByMuscleGroup(muscleGroup: string): Observable<Exercise[]> {
        return this.http.get<Exercise[]>(`${this.exerciseServiceBaseUrl}?muscleGroup=${muscleGroup}`);
    }

    //For analytics:
    // get exercises by ID
    getExerciseById(id: number): Observable<Exercise> {
        return this.http.get<Exercise>(`${this.exerciseServiceBaseUrl}/${id}`);
      }

     //get All exercises
     getAllExercises(): Observable<Exercise[]> {
        return this.http.get<Exercise[]>(this.exerciseServiceBaseUrl);
    }
}

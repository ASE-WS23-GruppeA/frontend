import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exercise } from 'src/app/_models/exercise.model';

@Injectable({
    providedIn: 'root'
})
export class ExerciseService {
    private apiUrl = 'http://localhost:3000/exercises'; // Update the URL accordingly

    constructor(private http: HttpClient) { }

    fetchExercises(): Observable<Exercise[]> {
        return this.http.get<Exercise[]>(this.apiUrl);
    }

    // Add a new function to get exercises by muscle group
    getExercisesByMuscleGroup(muscleGroup: string): Observable<Exercise[]> {
        return this.http.get<Exercise[]>(`${this.apiUrl}?muscleGroup=${muscleGroup}`);
    }
}

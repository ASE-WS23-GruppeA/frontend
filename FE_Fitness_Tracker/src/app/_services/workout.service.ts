import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class WorkoutService {

    constructor(private http: HttpClient) { }

    saveWorkout(workoutData: any) {
        return this.http.post('http://localhost:3000/workouts', workoutData);
    }
}
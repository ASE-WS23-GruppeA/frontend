import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Workout } from 'src/app/_models/workout.model';
import { Exercise } from 'src/app/_models/exercise.model';
import { ExerciseSet } from 'src/app/_models/exercise-set.model';

@Injectable({
    providedIn: 'root'
})
export class WorkoutService {
    private apiUrl = 'http://localhost:3000/workouts'; // Update the URL accordingly

    constructor(private http: HttpClient) { }

    saveWorkout(workout: Workout): Observable<any> {
        const workoutData = {
            userID: this.getCurrentUserId(), // Replace with actual user ID retrieval logic
            workoutName: workout.name,
            workoutSets: workout.exercises.flatMap((exercise: Exercise) =>
                exercise.sets.map((set: ExerciseSet) => ({
                    exerciseID: exercise.exerciseID, // Update this based on your Exercise interface
                    reps: set.reps,
                    weights: set.kilos
                }))
            )
        };

        return this.http.post(this.apiUrl, workoutData).pipe(
            catchError((error) => {
                console.error('Error saving workout', error);
                throw error; // Rethrow the error to handle it further in components
            })
        );
    }

    private getCurrentUserId(): number {
        // Implement logic to retrieve the current user's ID
        return 1; // Example user ID
    }
}

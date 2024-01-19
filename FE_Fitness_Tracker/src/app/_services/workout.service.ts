import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Workout } from 'src/app/_models/workout.model';
import { Exercise } from 'src/app/_models/exercise.model';
import { ExerciseSet } from 'src/app/_models/exercise-set.model';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/_models/user.model';

@Injectable({
    providedIn: 'root'
})
export class WorkoutService {
    private apiUrl = 'http://localhost:3001/workouts'; // Update the URL accordingly

    constructor(private http: HttpClient, private authService: AuthService) {    
        }

    saveWorkoutSets(workoutSets: any, exerciseName: string): Observable<any> {
        const userID = this.retrieveCurrentUserId();

        return this.http.post('/api/workout', { userID, exerciseName, workoutSets });
    }

    finalizeWorkout(workout: Workout): Observable<any> {
        const workoutData = {
            userID: this.retrieveCurrentUserId(),
            workoutName: workout.workoutName,
            workoutSets: workout.workoutSets
        };

        return this.http.post(this.apiUrl, workoutData).pipe(
            catchError((error) => {
                console.error('Error saving workout', error);
                throw error;
            })
        );
    }

    private retrieveCurrentUserId(): number {
        let currentUserId: number | null = null;

        // Subscribe to the AuthenticatedUser$ BehaviorSubject to get the current user
        this.authService.AuthenticatedUser$.subscribe((user: User | null) => {
            if (user) {
                currentUserId = user.id;
            }
        });

        // Check if the current user ID is not null
        if (currentUserId !== null) {
            return currentUserId;
        } else {
            // Handle the case where the user ID is not available (e.g., user not logged in)
            // You can throw an error or return a default value like 0 or -1
            throw new Error("User not logged in");
        }
    }

}
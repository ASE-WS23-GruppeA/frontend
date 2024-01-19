import { ExerciseSet } from './exercise-set.model';

export interface Exercise {
    exerciseID: number;
    exerciseName: string;
    muscleGroup: string;
    // Add other properties as per your backend response
}
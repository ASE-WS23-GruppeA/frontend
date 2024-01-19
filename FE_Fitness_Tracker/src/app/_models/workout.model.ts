import { Exercise } from './exercise.model';

export interface WorkoutSet {
    exerciseID: number;
    reps: number;
    weights: number;
}

export interface Workout {
    userID: number;
    workoutName: string;
    workoutSets: WorkoutSet[];
}
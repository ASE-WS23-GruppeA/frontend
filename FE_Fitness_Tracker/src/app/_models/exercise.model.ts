import { ExerciseSet } from './exercise-set.model';

export interface Exercise {
    exerciseID: number;
    name: string;
    muscleGroup: string;
    sets: ExerciseSet[];
    // Add other properties as per your backend response
}


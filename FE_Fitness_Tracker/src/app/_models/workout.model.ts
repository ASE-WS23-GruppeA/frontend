import { Exercise } from './exercise.model';

export interface Workout {
    name: string;
    exercises: Exercise[];
}

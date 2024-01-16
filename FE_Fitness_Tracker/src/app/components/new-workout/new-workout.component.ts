import { Component } from '@angular/core';

interface ExerciseSet {
  reps: number;
  kilos: number;
}

interface Exercise {
  name: string;
  sets: ExerciseSet[];
}

interface Workout {
  name: string;
  exercises: Exercise[];
}

@Component({
  selector: 'app-new-workout',
  templateUrl: './new-workout.component.html',
  styleUrls: ['./new-workout.component.css']
})
export class NewWorkoutComponent {
  muscleGroups = [
    { name: 'Legs', exercises: ['Squats', 'Lunges'], image: './assets/muscle_groups/legs.png' },
    { name: 'Chest', exercises: ['Push-ups', 'Bench press'], image: './assets/muscle_groups/chest.png' },
    { name: 'Back', exercises: ['Pull-ups', 'Barbell rows'], image: './assets/muscle_groups/back.png' },
    { name: 'Core', exercises: ['Sit-ups', 'Plank'], image: './assets/muscle_groups/core.png' },
    { name: 'Triceps', exercises: ['Tricep extensions', 'Skull crushers'], image: './assets/muscle_groups/triceps.png' },
    { name: 'Calves', exercises: ['Calf raises', 'Calf stretches'], image: './assets/muscle_groups/calves.png' },
    { name: 'Shoulders', exercises: ['Lateral raises', 'Front raises'], image: './assets/muscle_groups/shoulders.png' },
    { name: 'Biceps', exercises: ['Cable curls', 'Hammer curls'], image: './assets/muscle_groups/biceps.png' },
    { name: 'Glutes', exercises: ['Hip thrusts', 'Cable pull-throughs'], image: './assets/muscle_groups/gluteus.png' },
    { name: 'Obliques', exercises: ['Woodchoppers', 'Russian twist'], image: './assets/muscle_groups/oblique.png' },
    // Add more muscle groups and exercises as needed
  ];

  exercises: Exercise[] = []; // Populate with your actual exercises data
  workout: Workout = { name: '', exercises: [] };
  selectedMuscleGroup: { name: string, exercises: string[] } | null = null;
  selectedExercise: string | null = null;
  sets: ExerciseSet[] = [];

  showExercises(index: number) {
    this.selectedMuscleGroup = this.muscleGroups[index];
    this.selectedExercise = null;
    this.sets = [];
  }

  showSets(exerciseIndex: number) {
    if (this.selectedMuscleGroup) {
      this.selectedExercise = this.selectedMuscleGroup.exercises[exerciseIndex];
      this.sets = [{ reps: 0, kilos: 0 }, { reps: 0, kilos: 0 }, { reps: 0, kilos: 0 }];
    }
  }

  addSet() {
    this.sets.push({ reps: 0, kilos: 0 });
  }

  deleteSet(index: number) {
    this.sets.splice(index, 1);
  }

  showWorkoutContainer = false;

  saveSet() {
    if (this.selectedExercise) {
      const exercise = this.workout.exercises.find(e => e.name === this.selectedExercise);
      if (exercise) {
        exercise.sets.push(...this.sets);
      } else {
        this.workout.exercises.push({ name: this.selectedExercise, sets: [...this.sets] });
      }
      this.sets = []; // Reset the sets
      this.showWorkoutContainer = true; // Show the workout-container after the first set is saved
    }
  }

  finalizeWorkout() {
    if (this.workout && this.workout.name.trim() && this.workout.exercises.length) {
      // Logic to save the workout to a server or local storage
      console.log('Workout saved:', this.workout);
      // Reset the workout
      this.workout = { name: '', exercises: [] };
    } else {
      // Error handling
      alert('Please enter a workout name and add at least one exercise.');
    }
  }

  }
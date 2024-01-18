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
    { name: 'Legs', exercises: ['Squats', 'Lunges', 'Deadlifts', 'Leg Press', 'Leg Curls', 'Leg Extensions', 'Romanian Deadlifts', 'Step-ups', 'Stiff-legged Deadlifts', 'Sissy Squats', 'Hack Squats', 'Hamstring Curls', 'Lunges with Dumbbells', 'Box Jumps'], image: './assets/muscle_groups/legs.png' },
    { name: 'Chest', exercises: ['Decline Bench Press', 'Push-ups', 'Bench Press', 'Dips', 'Incline Bench Press', 'Dumbbell Bench Press', 'Dumbbell Flyes'], image: './assets/muscle_groups/chest.png' },
    { name: 'Back', exercises: ['Pull-ups', 'Dumbbell Rows', 'Barbell Rows', 'Deadlifts', 'Pull-Downs', 'Seated Rows', 'Reverse Flyes', 'Romanian Deadlifts', 'Stiff-legged Deadlifts', 'Cable Rows', 'Lat Pulldowns', 'Chin-ups', 'Kettlebell Swings'], image: './assets/muscle_groups/back.png' },
    { name: 'Core', exercises: ['Sit-ups', 'Planks', 'Russian Twists', 'Hanging Leg Raise', 'Bicycle Crunches', 'Ab Wheel Rollouts', 'Flutter Kicks', 'Dragon Flags', 'Reverse Crunches', 'Leg Raises'], image: './assets/muscle_groups/core.png' },
    { name: 'Triceps', exercises: ['Tricep extensions', 'Decline Bench Press', 'Skull Crushers', 'Bench Press', 'Dips', 'Shoulder Press', 'Tricep Extensions', 'Incline Bench Press', 'Close-grip Bench Press', 'Dumbbell Bench Press'], image: './assets/muscle_groups/triceps.png' },
    { name: 'Calves', exercises: ['Calf Raises', 'Calf stretches'], image: './assets/muscle_groups/calves.png' },
    { name: 'Shoulders', exercises: ['Lateral Raises', 'Front Raises', 'Shoulder Press', 'Reverse Flyes', 'Face Pulls', 'Dumbbell Bench Press'], image: './assets/muscle_groups/shoulders.png' },
    { name: 'Biceps', exercises: ['Cable Curls', 'Hammer Curls', 'Pull-Downs', 'Bicep Curls', 'Cable Rows', 'Preacher Curls', 'Lat Pulldowns', 'Chin-ups'], image: './assets/muscle_groups/biceps.png' },
    { name: 'Glutes', exercises: ['Hip Thrusts', 'Cable Pull-throughs', 'Kettlebell Swings'], image: './assets/muscle_groups/gluteus.png' },
    { name: 'Obliques', exercises: ['Woodchoppers', 'Russian twist', 'Woodchoppers'], image: './assets/muscle_groups/oblique.png' },
    // Add more muscle groups and exercises as needed
  ];

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
      if (this.setsHasNullOrZeroOrNegativeValues()) {
        alert('Please fill in all the fields in the exercise sets.');
      } else {
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
  }

  setsHasNullOrZeroOrNegativeValues(): boolean {
    return this.sets.some(set => set.reps === null || set.kilos === null || set.reps <= 0 || set.kilos <= 0);
  }

  deleteSavedExercise(exerciseIndex: number) {
    if (this.workout.exercises[exerciseIndex]) {
      this.workout.exercises.splice(exerciseIndex, 1);
    }
  }

  finalizeWorkout(): void {
    this.saveWorkout();
  }

}
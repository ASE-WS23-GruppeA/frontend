import { Component } from '@angular/core';
import { WorkoutService } from 'src/app/_services/workout.service';
import { ExerciseService } from 'src/app/_services/exercise.service';
import { Exercise } from 'src/app/_models/exercise.model';
import { Workout } from 'src/app/_models/workout.model';
import { ExerciseSet } from 'src/app/_models/exercise-set.model';

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

  showWorkoutContainer = false;

  constructor(
    private workoutService: WorkoutService,
    private exerciseService: ExerciseService
  ) { }

  showExercises(index: number) {
    if (this.muscleGroups[index]) {
      const muscleGroup = this.muscleGroups[index].name;
      this.exerciseService.getExercisesByMuscleGroup(muscleGroup).subscribe(
        (exercises: Exercise[]) => {
          this.selectedMuscleGroup = this.muscleGroups[index];
          this.selectedMuscleGroup.exercises = exercises.map((exercise: Exercise) => exercise.name);
          this.selectedExercise = null;
          this.sets = [];
        },
        (error) => {
          console.error('Error fetching exercises by muscle group', error);
        }
      );
    }
  }

  showSets(exerciseIndex: number) {
    if (this.selectedMuscleGroup) {
      this.selectedExercise = this.selectedMuscleGroup.exercises[exerciseIndex];
      this.sets = [{ reps: 0, kilos: 0 }, { reps: 0, kilos: 0 }, { reps: 0, kilos: 0 }];
    }
  }

  addSet() {
    const e: ExerciseSet = { reps: 0, kilos: 0 };
    this.sets.push(e);
  }

  deleteSet(index: number) {
    this.sets.splice(index, 1);
  }

  saveSet() {
    if (this.selectedExercise) {
      if (this.setsHasNullOrZeroOrNegativeValues()) {
        alert('Please fill in all the fields in the exercise sets.');
      } else {
        const exercise = this.workout.exercises.find(e => e.name === this.selectedExercise);
        if (exercise) {
          exercise.sets.push(...this.sets);
        } else {
          // Create a new Exercise object with the correct structure
          const newExercise: Exercise = {
            exerciseID: 0, // You can set this to the appropriate value if available
            name: this.selectedExercise, // Use the selectedExercise as the name
            muscleGroup: '', // Set the muscle group appropriately
            sets: [...this.sets]
          };
          this.workout.exercises.push(newExercise);
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

  finalizeWorkout() {
    if (this.workout && this.workout.name.trim() && this.workout.exercises.length) {
      this.workoutService.saveWorkout(this.workout).subscribe(
        response => {
          console.log('Workout saved successfully', response);
          this.resetWorkout();
        },
        error => {
          console.error('Error saving workout', error);
        }
      );
    } else {
      alert('Please enter a workout name and add at least one exercise.');
    }
  }

  private resetWorkout() {
    this.workout = { name: '', exercises: [] };
    // any other reset logic if required
  }
}

import { Component, OnInit } from '@angular/core';
import { WorkoutService } from 'src/app/_services/workout.service';
import { ExerciseService } from 'src/app/_services/exercise.service';
import { Exercise } from 'src/app/_models/exercise.model';
import { Workout } from 'src/app/_models/workout.model';
import { ExerciseSet } from 'src/app/_models/exercise-set.model';
import { MuscleGroup } from 'src/app/_models/muscleGroups.model';

@Component({
  selector: 'app-new-workout',
  templateUrl: './new-workout.component.html',
  styleUrls: ['./new-workout.component.css']
})
export class NewWorkoutComponent {
  // muscleGroups = [
  //   { name: 'Legs', exercises: ['Squats', 'Lunges', 'Deadlifts', 'Leg Press', 'Leg Curls', 'Leg Extensions', 'Romanian Deadlifts', 'Step-ups', 'Stiff-legged Deadlifts', 'Sissy Squats', 'Hack Squats', 'Hamstring Curls', 'Lunges with Dumbbells', 'Box Jumps'], image: './assets/muscle_groups/legs.png' },
  //   { name: 'Chest', exercises: ['Decline Bench Press', 'Push-ups', 'Bench Press', 'Dips', 'Incline Bench Press', 'Dumbbell Bench Press', 'Dumbbell Flyes'], image: './assets/muscle_groups/chest.png' },
  //   { name: 'Back', exercises: ['Pull-ups', 'Dumbbell Rows', 'Barbell Rows', 'Deadlifts', 'Pull-Downs', 'Seated Rows', 'Reverse Flyes', 'Romanian Deadlifts', 'Stiff-legged Deadlifts', 'Cable Rows', 'Lat Pulldowns', 'Chin-ups', 'Kettlebell Swings'], image: './assets/muscle_groups/back.png' },
  //   { name: 'Core', exercises: ['Sit-ups', 'Planks', 'Russian Twists', 'Hanging Leg Raise', 'Bicycle Crunches', 'Ab Wheel Rollouts', 'Flutter Kicks', 'Dragon Flags', 'Reverse Crunches', 'Leg Raises'], image: './assets/muscle_groups/core.png' },
  //   { name: 'Triceps', exercises: ['Tricep extensions', 'Decline Bench Press', 'Skull Crushers', 'Bench Press', 'Dips', 'Shoulder Press', 'Tricep Extensions', 'Incline Bench Press', 'Close-grip Bench Press', 'Dumbbell Bench Press'], image: './assets/muscle_groups/triceps.png' },
  //   { name: 'Calves', exercises: ['Calf Raises', 'Calf stretches'], image: './assets/muscle_groups/calves.png' },
  //   { name: 'Shoulders', exercises: ['Lateral Raises', 'Front Raises', 'Shoulder Press', 'Reverse Flyes', 'Face Pulls', 'Dumbbell Bench Press'], image: './assets/muscle_groups/shoulders.png' },
  //   { name: 'Biceps', exercises: ['Cable Curls', 'Hammer Curls', 'Pull-Downs', 'Bicep Curls', 'Cable Rows', 'Preacher Curls', 'Lat Pulldowns', 'Chin-ups'], image: './assets/muscle_groups/biceps.png' },
  //   { name: 'Glutes', exercises: ['Hip Thrusts', 'Cable Pull-throughs', 'Kettlebell Swings'], image: './assets/muscle_groups/gluteus.png' },
  //   { name: 'Obliques', exercises: ['Woodchoppers', 'Russian twist', 'Woodchoppers'], image: './assets/muscle_groups/oblique.png' },
  //   // Add more muscle groups and exercises as needed
  // ];

  workout: Workout = { name: '', exercises: [] };
  selectedMuscleGroup: { name: string, exercises: string[] }  = { name: "", exercises: []};
  selectedExercise: string | null = null;
  sets: ExerciseSet[] = [];

  showWorkoutContainer = false;

  exercises: Exercise [] = [];
  muscleGroups: MuscleGroup[] = [
    { name: 'Legs', exercises: [], image: './assets/muscle_groups/legs.png' },
    { name: 'Chest', exercises: [], image: './assets/muscle_groups/chest.png' },
    { name: 'Back', exercises: [], image: './assets/muscle_groups/back.png' },
    { name: 'Core', exercises: [], image: './assets/muscle_groups/core.png' },
    { name: 'Triceps', exercises: [], image: './assets/muscle_groups/triceps.png' },
    { name: 'Calves', exercises: [], image: './assets/muscle_groups/calves.png' },
    { name: 'Shoulders', exercises: [], image: './assets/muscle_groups/shoulders.png' },
    { name: 'Biceps', exercises: [], image: './assets/muscle_groups/biceps.png' },
    { name: 'Glutes', exercises: [], image: './assets/muscle_groups/gluteus.png' },
    { name: 'Obliques', exercises: [], image: './assets/muscle_groups/oblique.png' },
  ];

  constructor(
    private workoutService: WorkoutService,
    private exerciseService: ExerciseService
  ) { 
    
  }

  ngOnInit(): void {
    // Call the fetchExercises() method and subscribe to it
    this.exerciseService.fetchExercises().subscribe(
      (data: Exercise[]) => {
        // Handle the data here
        this.exercises = data;
        console.log('this comes from NgOnInit');
        console.log(this.exercises);
        this.muscleGroups = this.createMuscleGroupsStructure(this.exercises, this.muscleGroups);
        console.log(this.muscleGroups);
      },
      (error) => {
        // Handle any errors here
        console.error('Error fetching exercises', error);
      }
    );


  }

  createMuscleGroupsStructure(exercises: Exercise[], muscleGroups: MuscleGroup[]): MuscleGroup[] {
    // Create a map from the exercises array for easy lookup
    const exercisesByMuscleGroup = new Map<string, string[]>();
    exercises.forEach(exercise => {
      if (!exercisesByMuscleGroup.has(exercise.muscleGroup)) {
        exercisesByMuscleGroup.set(exercise.muscleGroup, []);
      }
      exercisesByMuscleGroup.get(exercise.muscleGroup)?.push(exercise.exerciseName);
    });

    // Populate the exercises in each muscle group
    muscleGroups.forEach(group => {
      group.exercises = exercisesByMuscleGroup.get(group.name) || [];
    });

    return muscleGroups;
  }

  showExercises(index: number) {
    if (this.muscleGroups[index]) {
      const muscleGroup = this.muscleGroups[index].name || "";
      console.log(muscleGroup);
      console.log(this.muscleGroups);
      this.selectedMuscleGroup.name = muscleGroup + " Exercises";
      this.muscleGroups.forEach(muscle => {
        if (muscle.name === muscleGroup) {
          this.selectedMuscleGroup.exercises = muscle.exercises;
        }
      })
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
      // Find the exerciseID for the selectedExercise
      const exercise = this.exercises.find(e => e.exerciseName === this.selectedExercise);
      if (exercise) {
        // Prepare workoutSets
        const workoutSets = this.sets.map(set => ({
          exerciseID: exercise.exerciseID,
          reps: set.reps,
          weights: set.kilos
        }));

        // Call the workout service to save workoutSets
        this.workoutService.saveWorkoutSets(workoutSets, this.selectedExercise).subscribe(
          response => {
            console.log('Workout Sets saved successfully', response);
            // Additional logic after successful save
          },
          error => {
            console.error('Error saving workout sets', error);
          }
        );
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

  // finalizeWorkout() {
  //   if (this.workout && this.workout.name.trim() && this.workout.exercises.length) {
  //     this.workoutService.saveWorkout(this.workout).subscribe(
  //       response => {
  //         console.log('Workout saved successfully', response);
  //         this.resetWorkout();
  //       },
  //       error => {
  //         console.error('Error saving workout', error);
  //       }
  //     );
  //   } else {
  //     alert('Please enter a workout name and add at least one exercise.');
  //   }
  // }

  private resetWorkout() {
    this.workout = { name: '', exercises: [] };
    // any other reset logic if required
  }
}

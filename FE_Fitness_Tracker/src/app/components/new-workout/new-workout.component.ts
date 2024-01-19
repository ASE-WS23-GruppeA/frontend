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

  workout: Workout = { userID: 0, workoutName: '', workoutSets: [] };
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
  ) {}

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
    console.log('saveSet called with selectedExercise:', this.selectedExercise);

    if (this.selectedExercise) {
      const exercise = this.exercises.find(e => e.exerciseName === this.selectedExercise);
      console.log('Found Exercise:', exercise);

      if (exercise) {
        const workoutSets = this.sets.map(set => ({
          exerciseID: exercise.exerciseID,
          reps: set.reps,
          weights: set.kilos
        }));
        console.log('Mapped workoutSets:', workoutSets);

        // Add these workout sets to the workout object
        this.workout.workoutSets.push(...workoutSets);
        console.log('Updated workoutSets in workout:', this.workout.workoutSets);

        // Reset the sets for the next input
        this.sets = [{ reps: 0, kilos: 0 }, { reps: 0, kilos: 0 }, { reps: 0, kilos: 0 }];

        // Make the workout container visible
        this.showWorkoutContainer = true;
        console.log('showWorkoutContainer set to true');
      }
    } else {
      console.log('No selected exercise to save sets for.');
    }
  }

  setsHasNullOrZeroOrNegativeValues(): boolean {
    return this.sets.some(set => set.reps === null || set.kilos === null || set.reps <= 0 || set.kilos <= 0);
  }

  deleteSavedExercise(exerciseIndex: number) {
    if (this.workout.workoutSets[exerciseIndex]) {
      this.workout.workoutSets.splice(exerciseIndex, 1);
    }
  }

  getExerciseNameById(exerciseId: number): string {
    const exercise = this.exercises.find(e => e.exerciseID === exerciseId);
    return exercise ? exercise.exerciseName : 'Unknown Exercise';
  }

  finalizeWorkout() {
    if (this.workout.workoutName.trim() && this.workout.workoutSets.length) {
      const workoutData: Workout = {
        userID: 1, // Or retrieve the actual user ID
        workoutName: this.workout.workoutName,
        workoutSets: this.workout.workoutSets
      };
      console.log('Sending workoutData to backend:', workoutData);

      this.workoutService.finalizeWorkout(workoutData).subscribe(
        response => {
          console.log('Workout saved successfully', response);
          this.resetWorkout();
        },
        error => {
          console.error('Error saving workout', error);
        }
      );
    } else {
      console.log('Workout name is empty or no workout groups have been added.');
      alert('Please enter a workout name and add at least one exercise.');
    }
  }


  private resetWorkout() {
    this.workout = { userID: 0, workoutName: '', workoutSets: [] };
    // any other reset logic if required
  }
}
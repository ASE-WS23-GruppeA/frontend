import { Component } from '@angular/core';

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
  
  selectedMuscleGroup: { name: string, exercises: string[], image: string } | null = null;

  showExercises(index: number) {
    this.selectedMuscleGroup = this.muscleGroups[index];
  }
}

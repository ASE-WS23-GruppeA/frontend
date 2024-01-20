import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, LinearScale, BarController, BarElement, Title, Tooltip, CategoryScale, Colors } from 'chart.js/auto';
import { ArcElement } from 'chart.js/auto';
import { AnalyticsService } from 'src/app/_services/analytics.service';
import { WorkoutHistoryService } from 'src/app/_services/workout-history.service';
import { ExerciseService } from 'src/app/_services/exercise.service';
import { Exercise } from 'src/app/_models/exercise.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('chartCanvas') chartCanvas?: ElementRef;
  @ViewChild('averageWeightProgressCanvas') averageWeightProgressCanvas?: ElementRef;
  

  //selectedMuscleGroup: string = 'Legs';
  averageWeightProgressChart: Chart | undefined;

  
    totalVolume: any;
    weightProgress: any;
    public weightProgressForExerciseschart: any;
    exercises: string[] = [];
    selectedExercise: string = '';
    startDate = '';
    endDate: string = '';
    defaultExercise = 'Choose Exercise';
    defaultStartDate = '2022-01-01';
    defaultEndDate = '2024-12-31';

    workouts: any[] = [];
    lastWorkout: any;

    //list for exercises
    exerciseDetails: { [id: number]: Exercise } = {};
    //list for muscles groups
    muscleGroups: string[] = ['Legs', 'Chest', 'Back', 'Core', 'Triceps', 'Calves', 'Shoulders', 'Biceps', 'Glutes', 'Obliques']; 
    selectedMuscleGroup: string = this.muscleGroups[0]; 

    constructor( private analyticsService: AnalyticsService,
    private workoutHistoryService: WorkoutHistoryService, private ExerciseService: ExerciseService) { }

    ngOnInit() {
      const userId = 1; // TODO
      this.loadLastWorkout(userId);
      this.selectedExercise = this.defaultExercise; 
      this.startDate = this.defaultStartDate;
      this.endDate = this.defaultEndDate;
      this.getWeightProgressForExercises();
      this.getAverageWeightProgressForMuscleGroup();
      this.loadWorkouts();
      this.loadLastWorkout(userId);
      this.loadExercises();
  }

  loadWorkouts(): void {
    this.workoutHistoryService.getAllWorkouts(1) //TODO
      .subscribe(data => {
        console.log('Response from getAllWorkouts:', data);  
  
        this.workouts = data;
        const exerciseIds = data.flatMap(workout => 
          workout.workout_sets.map((set: { exerciseID: any; }) => set.exerciseID)
        );
        const uniqueExerciseIds = [...new Set(exerciseIds)];
        this.getExerciseDetails(uniqueExerciseIds);
      }, error => {
        console.error('Error loading workouts', error);
      });
  }

  loadExercises(): void {
    this.ExerciseService.fetchExercises().subscribe(
      (exerciseData: Exercise[]) => {
        const exerciseNames = exerciseData.map(exercise => exercise.exerciseName);
        const uniqueExercises = new Set(exerciseNames); 
        this.exercises = Array.from(uniqueExercises).sort((a, b) => a.localeCompare(b));

        if (this.exercises.includes(this.defaultExercise)) {
            this.selectedExercise = this.defaultExercise;
        } else {
            this.selectedExercise = this.exercises[0];
        }
        this.getWeightProgressForExercises();
      },
      error => {
        console.error('Error loading exercises', error);
      }
    );
}

  getExerciseDetails(exerciseIds: number[]): void {
    exerciseIds.forEach(id => {
      this.ExerciseService.getExerciseById(id).subscribe(exercise => {
        this.exerciseDetails[id] = exercise;
      });
    });
  }

  loadLastWorkout(userId: number): void {
    this.workoutHistoryService.getLastWorkout(userId)
      .subscribe(data => {
        console.log('Response from getLastWorkout:', data);  
        this.lastWorkout = data;
        
        if (data && data.workout_sets) {
          const exerciseIds: number[] = data.workout_sets.map((set: { exerciseID: number }) => set.exerciseID);
          const uniqueExerciseIds = [...new Set(exerciseIds)];
  
          this.getExerciseDetails(uniqueExerciseIds);
        }
      }, error => {
        console.error('Error loading last workout', error);
      });
  }
  
  deleteWorkout(workoutID: number) {
    console.log('Attempting to delete workout with ID:', workoutID);
    this.workoutHistoryService.deleteWorkout(workoutID).subscribe(
      response => {
      
        this.workouts = this.workouts.filter(w => w.workoutID !== workoutID);
      },
      error => {
        console.error('Error deleting workout', error);
      }
    );
  }

  confirmDelete(workoutID: number) {
    if (confirm('Möchten Sie dieses Workout wirklich löschen?')) {
      this.deleteWorkout(workoutID);
    }
  }

  getWeightProgressForExercises(): void {
    //TODO CHANGE HARDCODED USERID
    if (this.selectedExercise && this.startDate && this.endDate) {

      this.analyticsService.getWeightProgress(2, this.selectedExercise, this.startDate, this.endDate)
          .subscribe(data => {
              this.updateWeightProgressForExercises(data);
          }, error => {
              console.error('Error', error);
          });
    }
  }

  onExerciseChange(newExercise: string): void {
    this.selectedExercise = newExercise;
    this.getWeightProgressForExercises(); 
  }

   onDateRangeChange(newStartDate: string, newEndDate: string): void {
    this.startDate = newStartDate;
    this.endDate = newEndDate;
    this.getWeightProgressForExercises(); 
  }

  getAverageWeightProgressForMuscleGroup(): void {
    const userId = 1; // TODO
    this.analyticsService.getAverageWeightProgress(userId, this.selectedMuscleGroup, this.startDate, this.endDate)
    .subscribe(data => {
        console.log('Average Weight Progress Data:', data);
        this.updateAverageWeightProgressChart(data);
    }, error => {
        console.error('Error', error);
    });
  }
  
  private updateAverageWeightProgressChart(data: any): void {
    if (this.averageWeightProgressChart) {
      this.averageWeightProgressChart.destroy();
    }
   
    this.averageWeightProgressChart = new Chart(this.averageWeightProgressCanvas!.nativeElement, {
      type: 'bar',
      data: {
        labels: [data.MuscleGroup], // X
        datasets: [{
          label: 'Average Weight Progress',
          data: [data.averageWeightProgress], // Y
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Average Weight (kg)',
              font: {
                size: 16
              }
            }
          },
          x: {
            title: {
              display: true,
              text: 'Muscle Group',
              font: {
                size: 16
              }
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              font: {
                size: 14,
              }
            }
          },
          tooltip: {
            enabled: true,
          }
        }
      }
    });
  }
  
  private updateWeightProgressForExercises(data: any): void {
    if (this.weightProgressForExerciseschart) {
      this.weightProgressForExerciseschart.destroy();
    }
  
    this.weightProgressForExerciseschart = new Chart(this.chartCanvas!.nativeElement, {
      type: 'line',
      data: {
        labels: Object.keys(data), 
        datasets: [{
          label: this.selectedExercise,
          data: Object.values(data),
          borderColor: 'rgb(106, 90, 205)',
          tension: 0.1,
          fill: false,
        }]
      },
      options: {
        animation: {
          duration: 1000, // time for animation
          easing: 'easeOutQuad', //animation type
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Weight (kg)', 
              font: {
                size: 14
              }
            }
          },
          x: {
            title: {
              display: true,
              text: 'Date', 
              font: {
                size: 14
              }
            },
            ticks: {
              display: false, 
              autoSkip: true,
              maxRotation: 0,
              minRotation: 0
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Your Weight Progress',
            font: {
              size: 15,
            }
          }, 
          legend: {
            display: true,
            labels: {
              font: {
                size: 15,
              }
            }
            
          },
          tooltip: {
            enabled: true,
          }
        }
      }
    });
  }
  
  getWeightProgressDataExample() {
    const userId = 2; 
    const exerciseName = 'BenchPress'; 
    const startDate = '2022-01-01'; 
    const endDate = '2022-01-31'; 
  
    this.analyticsService.getWeightProgress(userId, exerciseName, startDate, endDate)
        .subscribe(data => {
            console.log(data); 
        }, error => {
            console.error('Fehler beim Abrufen der Daten', error);
        });
  }
}

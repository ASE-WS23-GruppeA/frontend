import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Chart} from 'chart.js/auto';
import {AnalyticsService} from 'src/app/_services/analytics.service';
import {WorkoutHistoryService} from 'src/app/_services/workout-history.service';
import {ExerciseService} from 'src/app/_services/exercise.service';
import {Exercise} from 'src/app/_models/exercise.model';
import {EXERCISE_COLORS} from 'src/app/constants/exercise-colors.constants';
import {StorageService} from "../../_services/storage.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('chartCanvas') chartCanvas?: ElementRef;
  @ViewChild('averageWeightProgressCanvas') averageWeightProgressCanvas?: ElementRef;
  @ViewChild('trainingInfoCanvas') trainingInfoCanvas?: ElementRef;
  @ViewChild('gymVisitsCanvas') gymVisitsCanvas?: ElementRef;

  private currentUserId: number = 0;

//charts
  averageWeightProgressChart: Chart | undefined;
  trainingInfoChart: Chart | undefined;
  gymVisitsChart: Chart | undefined;


  totalVolume: any;
  weightProgress: any;
  public weightProgressForExerciseschart: any;
  exercises: string[] = [];
  selectedExercise: string = '';

  //for chart 1
  startDate = '2024-01-01';
  endDate: string = '2024-01-31';

  //for chart 2
  startDateChart2 = '2024-01-01';
  endDateChart2: string = '2024-01-31';

  //for chart 3
  startDateTrainingInfo = '2024-01-19';
  endDateTrainingInfo: string = '2024-01-26';

  //for chart 4
  startDateGymVisits = '2024-01-01';
  endDateGymVisits = '2024-01-31';

  defaultExercise = 'Sit-ups';
  defaultStartDate = '2024-01-01';
  defaultEndDate = '2024-01-31';

  workouts: any[] = [];
  lastWorkout: any;

  //list for exercises
  exerciseDetails: { [id: number]: Exercise } = {};
  //list for muscles groups
  muscleGroups: string[] = ['Legs', 'Chest', 'Back', 'Core', 'Triceps', 'Calves', 'Shoulders', 'Biceps', 'Glutes', 'Obliques'];
  selectedMuscleGroup: string = 'Core';


  constructor(
    private analyticsService: AnalyticsService,
    private workoutHistoryService: WorkoutHistoryService,
    private ExerciseService: ExerciseService,
    private storageService: StorageService
  ) {
    this.storageService.userChanges.subscribe(user => {
      this.currentUserId = user?.id || 0;
    });
  }

  ngOnInit() {
    this.loadLastWorkout();
    this.selectedExercise = this.defaultExercise;
    this.startDate = this.defaultStartDate;
    this.endDate = this.defaultEndDate;
    this.startDateChart2 = this.defaultStartDate;
    this.endDateChart2 = this.defaultEndDate;
    this.getWeightProgressForExercises();
    this.getAverageWeightProgressForMuscleGroup();
    this.loadWorkouts();
    this.loadLastWorkout();
    this.loadExercises();
    this.loadUserTrainingInfo();
    this.getTrainingInfoData();
    this.loadGymVisitsData();
  }

  loadWorkouts(): void {
    this.workoutHistoryService.getAllWorkouts(this.currentUserId)
      .subscribe(data => {
        console.log('Response from getAllWorkouts:', data);


        this.workouts = data.sort((a, b) => {

          const dateA: any = new Date(a.createdDate);
          const dateB: any = new Date(b.createdDate);


          return dateB - dateA;
        });

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

  getTrainingInfoData(): void {
    this.analyticsService.getUserTrainingInfo(this.currentUserId, this.startDateTrainingInfo, this.endDateTrainingInfo)
      .subscribe(data => {
        this.createTrainingInfoChart(data.trainingInfo);
      }, error => {
        console.error('Fehler beim Laden der Trainingsdaten', error);
      });
  }

  loadUserTrainingInfo(): void {
    this.analyticsService.getUserTrainingInfo(this.currentUserId, '2023-01-01', '2025-12-31')
      .subscribe(data => {
        this.createTrainingInfoChart(data.trainingInfo);
      }, error => {
        console.error('Error', error);
      });
  }

  loadGymVisitsData(): void {
    this.analyticsService.getUserTrainingInfo(this.currentUserId, this.startDateGymVisits, this.endDateGymVisits)
      .subscribe(data => {
        this.createGymVisitsChart(data.gymVisits);
      }, error => {
        console.error('Error', error);
      });
  }

  createGymVisitsChart(gymVisits: number): void {
    if (this.gymVisitsChart) {
      this.gymVisitsChart.destroy();
    }

    this.gymVisitsChart = new Chart(this.gymVisitsCanvas!.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Gym Visits'],
        datasets: [{
          label: 'Number of Visits',
          data: [gymVisits],
          backgroundColor: 'rgba(102,102,255, 0.2)',
          borderColor: 'rgba(102,102,255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        },
        responsive: true,
        plugins: {
          legend: {
            display: true
          },
          title: {
            display: true,
            text: 'Your Gym Visits',
            font: {
              size: 14
            }
          }
        }
      }
    });
  }


  createTrainingInfoChart(trainingData: any): void {
    const startDate = new Date(this.startDateTrainingInfo);
    const endDate = new Date(this.endDateTrainingInfo);
    const dates: string[] = [];
    const exercises = new Set<string>();

    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    if (this.trainingInfoChart) {
      this.trainingInfoChart.destroy();
      this.trainingInfoChart = undefined;
    }

    const dataMap = new Map<string, { [exercise: string]: { sets: number, reps: number } }>();

    dates.forEach(date => {
      trainingData[date]?.forEach((exerciseData: any) => {
        exercises.add(exerciseData.exercise);
        if (!dataMap.has(date)) {
          dataMap.set(date, {});
        }
        dataMap.get(date)![exerciseData.exercise] = {
          sets: exerciseData.sets,
          reps: exerciseData.reps
        };
      });
    });

    const datasets = Array.from(exercises).map(exercise => {
      const data = dates.map(date => {
        return dataMap.has(date) && dataMap.get(date)![exercise] ? 1 : 0;
      });

      return {
        label: exercise,
        data: data,
        backgroundColor: EXERCISE_COLORS[exercise] || this.getRandomColor(),
      };
    });

    this.trainingInfoChart = new Chart(this.trainingInfoCanvas!.nativeElement, {
      type: 'bar',
      data: {
        labels: dates,
        datasets: datasets
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        },
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Your Training Info',
            font: {
              size: 14
            }
          },
        }
      }
    });
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  getExerciseDetails(exerciseIds: number[]): void {
    exerciseIds.forEach(id => {
      this.ExerciseService.getExerciseById(id).subscribe(exercise => {
        this.exerciseDetails[id] = exercise;
      });
    });
  }

  loadLastWorkout(): void {
    this.workoutHistoryService.getLastWorkout(this.currentUserId)
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
    if (confirm('Do you really want to delete this workout?')) {
      this.deleteWorkout(workoutID);
    }
  }

  getWeightProgressForExercises(): void {
    if (this.selectedExercise && this.startDateChart2 && this.endDateChart2) {
      this.analyticsService.getWeightProgress(this.currentUserId, this.selectedExercise, this.startDateChart2, this.endDateChart2)
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
    this.analyticsService.getAverageWeightProgress(this.currentUserId, this.selectedMuscleGroup, this.startDate, this.endDate)
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
          label: this.selectedMuscleGroup,
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
                size: 14
              }
            }
          },
          x: {
            title: {
              display: true,
              text: 'Muscle Group',
              font: {
                size: 14
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
          title: {
            display: true,
            text: 'Your Average Weight Progress',
            font: {
              size: 14
            }
          },
          tooltip: {
            enabled: true,
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeOutQuart',
        }
      }
    });
  }

  private updateWeightProgressForExercises(data: any): void {
    if (this.weightProgressForExerciseschart) {
      this.weightProgressForExerciseschart.destroy();
    }

    const dates = Object.keys(data).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    this.weightProgressForExerciseschart = new Chart(this.chartCanvas!.nativeElement, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: this.selectedExercise,
          data: dates.map(date => data[date]),
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
              display: true,
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
              size: 14,
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
    const exerciseName = 'BenchPress';
    const startDate = '2022-01-01';
    const endDate = '2022-01-31';

    this.analyticsService.getWeightProgress(this.currentUserId, exerciseName, startDate, endDate)
      .subscribe(data => {
        console.log(data);
      }, error => {
        console.error('Fehler beim Abrufen der Daten', error);
      });
  }
}

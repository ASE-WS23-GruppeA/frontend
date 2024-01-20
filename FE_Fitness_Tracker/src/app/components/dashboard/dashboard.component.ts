import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, LinearScale, BarController, BarElement, Title, Tooltip, CategoryScale, Colors } from 'chart.js/auto';
import { ArcElement } from 'chart.js/auto';
import { AnalyticsService } from 'src/app/_services/analytics.service';
import { WorkoutHistoryService } from 'src/app/_services/workout-history.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('chartCanvas') chartCanvas?: ElementRef;
  @ViewChild('averageWeightProgressCanvas') averageWeightProgressCanvas?: ElementRef;
  

  selectedMuscleGroup: string = 'Legs';
  averageWeightProgressChart: Chart | undefined;

  
  totalVolume: any;
  weightProgress: any;
  public weightProgressForExerciseschart: any;
  exercises = ['Legs', 'BenchPress'];
  selectedExercise: string = 'Legs';
  startDate = '';
  endDate: string = '';
  //public barChart: any;
  //public donutChart: any;
    defaultExercise = 'Legs';
    defaultStartDate = '2022-01-01';
    defaultEndDate = '2022-01-31';

    workouts: any[] = [];
    lastWorkout: any;

    constructor( private analyticsService: AnalyticsService,
    private workoutHistoryService: WorkoutHistoryService) { }

  ngOnInit() {

 
      this.selectedExercise = this.defaultExercise;
      this.startDate = this.defaultStartDate;
      this.endDate = this.defaultEndDate;
      this.getWeightProgressForExercises();
      this.getAverageWeightProgressForMuscleGroup();

      this.loadWorkouts();
      this.loadLastWorkout();
  }
  getAverageWeightProgressForMuscleGroup(): void {
    const userId = 123; //TODO
    this.analyticsService.getAverageWeightProgress(userId, this.selectedMuscleGroup, this.startDate, this.endDate)
      .subscribe(data => {
        this.updateAverageWeightProgressChart(data);
      }, error => {
        console.error('Error fetching average weight progress', error);
      });
  }
 
  private updateAverageWeightProgressChart(data: any): void {
    if (this.averageWeightProgressChart) {
      this.averageWeightProgressChart.destroy();
    }

    this.averageWeightProgressChart = new Chart(this.averageWeightProgressCanvas!.nativeElement, {
      type: 'bar',
      data: {
        labels: Object.keys(data),
        datasets: [{
          label: 'Average Weight Progress (kg)',
          data: Object.values(data),
          backgroundColor: 'rgba(0, 153, 153, 0.2)',
          borderColor: 'rgba( 0,153, 153, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Your Average Weight Progress', 
            font: {
              size: 18
            }
          }
        }
      }
    });
  }

  loadWorkouts(): void {
    this.workoutHistoryService.getAllWorkouts(1) //TODO
      .subscribe(data => {
        this.workouts = data;
      }, error => {
        console.error('Error loading workouts', error);
      });
  }
  
  loadLastWorkout(): void {
    this.workoutHistoryService.getLastWorkout(1) //TODO
      .subscribe(data => {
        this.lastWorkout = data;
      }, error => {
        console.error('Error loading last workout', error);
      });
  }


  getWeightProgressForExercises(): void {
    //TODO CHANGE HARDCODED USERID
    if (this.selectedExercise && this.startDate && this.endDate) {

      this.analyticsService.getWeightProgress(123, this.selectedExercise, this.startDate, this.endDate)
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

  private updateWeightProgressForExercises(data: any): void {
    if (this.weightProgressForExerciseschart) {
      this.weightProgressForExerciseschart.destroy();
    }
    
  
    this.weightProgressForExerciseschart = new Chart(this.chartCanvas!.nativeElement, {
      type: 'line',
      data: {
        labels: Object.keys(data), // time x axis
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
                size: 16
              }
            }
          },
          x: {
            title: {
              display: true,
              text: 'Date', 
              font: {
                size: 16
              }
            },
            ticks: {
              display: false, // Versteckt alle Ticks (Datenpunkte) auf der X-Achse
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
              size: 20,
            }
          }, 
          legend: {
            display: true,
            labels: {
              font: {
                size: 18,
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
    const userId = 123; 
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

  drawTotalVolumeChart() {
    //TODO implement
    throw new Error('Method not implemented.');
  }

  getweightProgress(){

   
  }

  getaverageWeightProgress(){

  }

  /*createBarChart() {
    this.barChart = new Chart('MyBarChart', {
      type: 'bar',
      data: {
        labels: ['2023-10-10', '2023-10-11', '2023-10-12', '2023-10-13',
          '2023-10-14', '2023-10-15', '2023-10-16', '2023-10-17'],
        datasets: [
          {
            label: 'ExampleLabelA',
            data: [143, 453, 354, 354, 92, 753, 563, 333],
            backgroundColor: '#037272',
          },
          {
            label: 'ExampleLabelB',
            data: [467, 144, 536, 523, 14, 0.00, 538, 541],
            backgroundColor: '#8bd463',
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Y-Axis Label',
              color: 'black'
            },
            ticks: {
              color: 'black'
            },
            grid: {
              color: 'grey'
            }
          },
          x: {
            title: {
              display: true,
              text: 'X-Axis Label',
              color: 'black'
            },
            ticks: {
              color: 'black'
            },
            grid: {
              color: 'grey'
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Example Bar Chart',
            color: 'black',
            font: {
              size: 20
            }
          }
        }
      }
    });
  }

  createDonutChart() {
    this.donutChart = new Chart('DonutChart', {
      type: 'doughnut',
      data: {
        labels: ['Legs', 'Shoulder', 'Arms', 'Back'],
        datasets: [{
          data: [30, 50, 10, 10], 
          backgroundColor: ['#053B50', '#8e3ef7', '#f723df', '#306df0'], 
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Workout ',
            font: {
              size: 20,
            },
          },
        },
      },
    });
  }
  */
}

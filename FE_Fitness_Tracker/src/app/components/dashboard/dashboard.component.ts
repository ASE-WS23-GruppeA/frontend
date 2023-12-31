import { Component, OnInit } from '@angular/core';
import { Chart, LinearScale, BarController, BarElement, Title, Tooltip, CategoryScale, Colors } from 'chart.js/auto';
import { ArcElement } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  public barChart: any;
  public donutChart: any;

  constructor() { }

  ngOnInit() {
    Chart.register(LinearScale, BarController, BarElement, Title, Tooltip, CategoryScale, Colors, ArcElement);
    this.createBarChart();
    this.createDonutChart();
    Chart.defaults.backgroundColor = '#000000';
    Chart.defaults.borderColor = '#000000';
    Chart.defaults.color = '#000000';
  }

  createBarChart() {
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
}

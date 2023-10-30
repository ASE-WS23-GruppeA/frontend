import { Component, OnInit } from '@angular/core';
import { Chart, LinearScale, BarController, BarElement, Title, Tooltip, CategoryScale, Colors } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  public chart: any;

  constructor() { }

  ngOnInit() {
    Chart.register(LinearScale, BarController, BarElement, Title, Tooltip, CategoryScale, Colors);
    this.createChart();
    Chart.defaults.backgroundColor = '#FFFFFF';
    Chart.defaults.borderColor = '#FFFFFF';
    Chart.defaults.color = '#FFFFFF';
  }

  createChart(){
  
    this.chart = new Chart("MyChart", {
      type: 'bar', //type of chart
    
      data: {// values on X-Axis
        labels: ['2023-10-10', '2023-10-11', '2023-10-12','2023-10-13',
								 '2023-10-14', '2023-10-15', '2023-10-16','2023-10-17', ], 
	       datasets: [
          {
            label: "ExampleLabelA",
            data: ['143','453', '354', '354', '92',
								 '753', '563', '333'],
            backgroundColor: '#f723df',
           
          
          },
          {
            label: "ExampelLabelB",
            data: ['467', '144', '536', '523', '14',
									 '0.00', '538', '541'],
            backgroundColor: '#2495c2'
          }  
        ]
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display:true,
              text: 'Y-Axis Label',
              color: 'white'
            },
            ticks: {
              color: 'white' 
            },
            grid: {
              color: 'white' 
            }
          },
          x: {
            title: {
              display: true,
              text: 'X-Axis Label',
              color: 'white'
            },
            ticks: {
              color: 'white' 
            },
            grid: {
              color: 'white' 
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Example Bar Chart', 
            color: 'white',
            font: {
              size: 20 
            }
          }
        }
      }
    });
  }
}

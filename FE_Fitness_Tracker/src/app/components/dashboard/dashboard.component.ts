import { Component, OnInit } from '@angular/core';
import { Chart, LinearScale, BarController, BarElement, Title, Tooltip, CategoryScale } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  public chart: any;

  constructor() { }

  ngOnInit() {
    Chart.register(LinearScale, BarController, BarElement, Title, Tooltip, CategoryScale);
    this.createChart();
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
            backgroundColor: 'blue'
          },
          {
            label: "ExampelLabelB",
            data: ['467', '144', '536', '523', '14',
									 '0.00', '538', '541'],
            backgroundColor: 'pink'
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
              text: 'Y-Axis Label'
            }
          },
          x: {
            title: {
              display: true,
              text: 'X-Axis Label'
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Example Bar Chart', 
            font: {
              size: 18 
            }
          }
        }
      }
    });
  }
}

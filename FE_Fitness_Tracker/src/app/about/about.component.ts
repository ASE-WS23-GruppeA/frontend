import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  changeCardColor(event: MouseEvent, color: string) {
    (event.target as HTMLElement).style.backgroundColor = color;
  }

  resetCardColor(event: MouseEvent) {
    (event.target as HTMLElement).style.backgroundColor = 'white'; 
  }
}

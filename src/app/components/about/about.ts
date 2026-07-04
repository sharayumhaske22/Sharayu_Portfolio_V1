import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent {
    roles = ['Angular Developer', 'Full Stack Developer', 'AI Enthusiast'];
}

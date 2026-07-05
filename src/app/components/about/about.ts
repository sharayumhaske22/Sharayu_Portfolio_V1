import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent {
    roles = ['Angular Developer', 'Full Stack Developer', 'AI Enthusiast'];
}

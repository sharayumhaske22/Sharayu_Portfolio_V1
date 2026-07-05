import { Component, signal,HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar";
import { AboutComponent } from "./components/about/about";
import { IntroCardComponent } from './components/intro-card/intro-card';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactComponent } from './components/contact/contact';
import { SkillsComponent } from './components/skills/skills';
import { ExperienceComponent } from './components/experience/experience';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, 
    NavbarComponent, 
    AboutComponent, 
    IntroCardComponent, 
    ContactComponent, 
    SkillsComponent,
    ExperienceComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Sharayu_Portfolio_V1');
  @HostListener('window:mousemove', ['$event'])
  onWindowMouseMove(event: MouseEvent): void {
    document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`);
  }
}

import { Component ,ViewChild, ElementRef, inject , signal } from '@angular/core';
import {ThemeService } from '../../services/theme';

interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  period: string;
  tag: string;
  bullets: string[];
}


@Component({
  selector: 'app-experience',
  imports: [],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class ExperienceComponent {
  @ViewChild('titleEl', { static: true }) titleRef!: ElementRef<HTMLElement>;
  private theme = inject(ThemeService);
  private stopScramble?: () => void;

  titleText = signal('');

  ngOnInit(): void {
    this.stopScramble = this.theme.scrambleOnScroll(this.titleRef.nativeElement, 'Experience', (val) => this.titleText.set(val));
  }
  ngOnDestroy(): void {
    this.stopScramble?.();
  }
  readonly entries: ExperienceEntry[] = [
    {
      role: 'Student Assistant',
      company: 'Fraunhofer FKIE',
      location: 'Bonn, Germany',
      period: 'May 2024 – Present',
      tag: 'CURRENT',
      bullets: [
        'Architected a dynamic tree component using Angular Material (Mat-Tree, MatDialog, MatFormField) to render and edit nested JSON data structures.',
        'Implemented Angular CDK Drag & Drop for real-time hierarchical node reordering, supporting parent-child restructuring and immutable state updates.',
        'Built scalable Reactive Forms using FormBuilder, FormGroup, and Validators for dynamic node creation, inline editing, and form validation.',
        'Enabled cross-component communication via Angular EventEmitter and @Input/@Output decorators to propagate state changes across a reactive SPA.',
        'Managed application state using RxJS BehaviorSubject and ReplaySubject within Angular Services, enabling real-time UI synchronization.',
        'Integrated RESTful APIs using Angular HttpClient with typed HTTP requests to serialize and persist JSON payloads to backend services.',
        'Built Java Spring Boot backend services, managing dependencies and builds with Maven, and consumed REST API contracts integrated with the Angular frontend.',
        'Versioned and collaborated on all features using Git, GitHub, and GitLab, managing feature branches, pull requests, and code reviews.',
      ],
    },
    {
      role: 'Software Development Intern',
      company: 'Star Spring Works Pvt. Ltd.',
      location: 'Mumbai, India',
      period: 'Sep 2021 – Mar 2022',
      tag: 'Intern',
      bullets: [
        'Developed and maintained multiple Angular applications for B2C clients across various domains.',
        'Implemented FACADE architecture to abstract and centralize API service calls, improving code maintainability.',
        'Integrated the Camera Module to capture and upload images, storing Blob data in Firebase Firestore using AngularFire.',
        'Built a lightweight custom state management store using RxJS and BehaviorSubject for shared application state.',
        'Wrote and maintained unit test cases using Jasmine/Karma to support a stable CI/CD pipeline.',
        'Managed source code using Git and GitHub, handling version control and feature branching.',
        'Responsible for building and deploying Angular applications to client domains using Angular CLI.',
      ],
    },
  ];
}


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
    'Creating a dynamic tree structure in Angular from custom <strong>JSON data</strong> using recursive functions to generate parent and child nodes.',
    'Making the tree drag-and-droppable using <strong>Angular CDK Drag & Drop</strong>, allowing nodes to be reordered and restructured.',
    'Updating <strong>JSON data</strong> in real time to reflect all changes made through drag and drop.',
    'Creating reactive forms using <strong>Angular FormBuilder and FormGroup</strong> to add new nodes to the tree.',
    'Managing tree data and state using <strong>RxJS BehaviorSubject</strong> inside an Angular service, enabling real-time updates.',
    'Creating backend services in <strong>Spring Boot</strong> to traverse the tree structure and communicate with the tree component.',
    'Using <strong>Git and GitHub</strong> for version control throughout development.' ],

    },
    {
      role: 'Software Development Intern',
      company: 'Star Spring Works Pvt. Ltd.',
      location: 'Mumbai, India',
      period: 'Sep 2021 – Mar 2022',
      tag: 'Intern',
      bullets: [
        'Developed and maintained multiple <strong>Angular</strong> applications for B2C clients across various domains.',
        'Implemented <strong>FACADE architecture</strong> to abstract and centralize API service calls, improving code maintainability.',
        'Integrated the Camera Module to capture and upload images, storing Blob data in <strong>Firebase Firestore</strong> using <strong>AngularFire</strong>.',
        'Built a lightweight custom state management store using <strong>RxJS and BehaviorSubject</strong> for shared application state.',
        'Wrote and maintained <strong>unit test cases</strong> using Jasmine/Karma to support a stable CI/CD pipeline.',
        'Managed source code using <strong>Git and GitHub</strong>, handling version control and feature branching.',
        'Responsible for building and deploying Angular applications to client domains using <strong>Angular CLI</strong>.',
      ],
    },
  ];
}


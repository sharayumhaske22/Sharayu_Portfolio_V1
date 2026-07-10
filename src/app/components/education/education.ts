import { Component ,ViewChild,ElementRef, inject, signal } from '@angular/core';
import {ThemeService } from '../../services/theme';


interface EducationEntry {
  degree: string;
  school: string;
  period: string;
  location: string;
  thesis?: string;
  bullets?: string[];
}

interface Certificate {
  title: string;
  issuer: string;
  year: string;
}

interface Language {
  name: string;
  level: string;
}

interface Achievement {
  title: string;
  detail: string;
}



@Component({
  selector: 'app-education',
  imports: [],
  templateUrl: './education.html',
  styleUrl: './education.css',
})

export class EducationComponent {
  @ViewChild('titleEl', { static: true }) titleRef!: ElementRef<HTMLElement>;
  private theme = inject(ThemeService);
  private stopScramble?: () => void;

  titleText = signal('');

  readonly education: EducationEntry[] = [
    {
      degree: "Master's in Web and Data Science",
      school: 'University of Koblenz',
      period: 'Oct 2023 – Present',
      location: 'Koblenz, Germany',
      thesis: 'Emotion Detection in Social Media',
      bullets: [
        'Extending SemEval Task 11 (2025) using the BRIGHTER dataset to compare single-step vs. two-step emotion detection and intensity pipeline approaches.'
      ],
    },
    {
      degree: "Bachelor's in Computer Engineering",
      school: 'University of Mumbai',
      period: 'Jun 2017 – May 2021',
      location: 'Mumbai, India',
    },
  ];

  readonly achievements: Achievement[] = [
  {
    title: 'Published Research Paper',
    detail: 'Bias in Recruitment Systems Utilizing Large Language Models — ICAAI 2025, 9th International Conference on Advances in Artificial Intelligence.',
  },
  {
    title: 'First Prize, Technical Project Presentation',
    detail: 'XTACY 2k18 — Project: Smart Glasses.',
  },
  {
    title: 'GATE Qualified',
    detail: '2022',
  },
  ];

  readonly certificates: Certificate[] = [
    { title: 'Complete Web Development Bootcamp', issuer: 'Udemy', year: '' },
    { title: 'Introduction to Python Programming', issuer: 'Microsoft', year: '' },
    { title: 'Complete Guide to TensorFlow with Python', issuer: 'Udemy', year: '' },
    { title: 'Intro to Machine Learning', issuer: 'Kaggle', year: '' },
  ];

  readonly languages: Language[] = [
    { name: 'English', level: 'C2 · Proficient' },
    { name: 'Hindi', level: 'C2 · Proficient' },
    { name: 'German', level: 'B1 · Independent' },
    { name: 'Marathi', level: 'Native' },
  ];

  ngOnInit(): void {
    this.stopScramble = this.theme.scrambleOnScroll(
      this.titleRef.nativeElement,
      'Education.Certificates.Languages',
      (val) => this.titleText.set(val)
    );
  }

  ngOnDestroy(): void {
    this.stopScramble?.();
  }
}


import { Component, ViewChild,ElementRef,inject ,signal} from '@angular/core';
import { ThemeService } from '../../services/theme';

interface Highlight {
  icon: 'frontend' | 'ai' | 'backend';
  title: string;
  description: string;
}

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent {
  @ViewChild('titleEl', { static: true }) titleRef!: ElementRef<HTMLElement>;
  private theme = inject(ThemeService);
  private stopScramble?: () => void;

  titleText = signal('');

  readonly linkedin = 'https://www.linkedin.com/in/sharayu-mhaske';
  readonly resumeUrl = '/assets/resume.pdf';

  readonly highlights: Highlight[] = [
    {
      icon: 'frontend',
      title: 'Frontend Engineering',
      description: 'Building reactive, scalable Angular applications with RxJS and Material.',
    },
    {
      icon: 'ai',
      title: 'AI & NLP',
      description: 'Fine-tuning transformer models like RoBERTa and DistilBERT for emotion detection.',
    },
    {
      icon: 'backend',
      title: 'Full Stack',
      description: 'Shipping REST APIs with Spring Boot and Django, integrated end to end.',
    },
  ];

  ngOnInit(): void {
    this.stopScramble = this.theme.scrambleOnScroll(
      this.titleRef.nativeElement,
      'About Me',
      (val) => this.titleText.set(val)
    );
  }

  ngOnDestroy(): void {
    this.stopScramble?.();
  }
}

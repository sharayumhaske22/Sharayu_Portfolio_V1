import { Component, OnInit, OnDestroy, ElementRef, ViewChild, signal, inject } from '@angular/core';
import { ThemeService } from '../../services/theme';

interface Highlight {
  icon: 'frontend' | 'ai' | 'backend';
  title: string;
  description: string;
}

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent implements OnInit, OnDestroy {
  @ViewChild('titleEl', { static: true }) titleRef!: ElementRef<HTMLElement>;
  @ViewChild('statsEl', { static: true }) statsRef!: ElementRef<HTMLElement>;

  private theme = inject(ThemeService);
  private stopScramble?: () => void;
  private statsObserver?: IntersectionObserver;

  titleText = signal('');
  statsStarted = signal(false);

  readonly linkedin = 'https://www.linkedin.com/in/sharayu-mhaske';
  readonly resumeUrl = 'assets/Sharayu_resume.pdf';

  readonly stats: Stat[] = [
    { value: 2, suffix: '+', label: 'Years Experience' },
    { value: 1, suffix: '', label: 'Published Paper' },
    { value: 6, suffix: '+', label: 'Projects Shipped' },
    { value: 3, suffix: '', label: 'Languages Spoken' },
  ];

  displayStats = signal<number[]>([0, 0, 0, 0]);

  readonly currentlyItems = [
    'fine-tuning transformer models 🧠',
    'debugging Angular signals ⚡',
    'reading ICAAI papers 📄',
    'building REST APIs with Spring Boot 🛠️',
  ];
  currentlyIndex = signal(0);
  private currentlyTimer?: ReturnType<typeof setInterval>;

  readonly highlights: Highlight[] = [
    { icon: 'frontend', title: 'Frontend Engineering', description: 'Building reactive, scalable Angular applications with RxJS and Material.' },
    { icon: 'ai', title: 'AI & NLP', description: 'Fine-tuning transformer models like RoBERTa and DistilBERT for emotion detection.' },
    { icon: 'backend', title: 'Full Stack', description: 'Shipping REST APIs with Spring Boot and Django, integrated end to end.' },
  ];

  ngOnInit(): void {
    this.stopScramble = this.theme.scrambleOnScroll(
      this.titleRef.nativeElement,
      'About Me',
      (val) => this.titleText.set(val)
    );

    this.statsObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !this.statsStarted()) {
            this.statsStarted.set(true);
            this.animateStats();
            this.statsObserver?.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    this.statsObserver.observe(this.statsRef.nativeElement);

    this.currentlyTimer = setInterval(() => {
      this.currentlyIndex.update(i => (i + 1) % this.currentlyItems.length);
    }, 2800);
  }

  ngOnDestroy(): void {
    this.stopScramble?.();
    this.statsObserver?.disconnect();
    clearInterval(this.currentlyTimer);
  }

  private animateStats(): void {
    this.stats.forEach((stat, i) => {
      let current = 0;
      const duration = 1000;
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = stat.value / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(timer);
        }
        this.displayStats.update(arr => {
          const copy = [...arr];
          copy[i] = Math.round(current);
          return copy;
        });
      }, stepTime);
    });
  }
}
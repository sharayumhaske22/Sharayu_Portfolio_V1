import { Component, OnInit,OnDestroy, ViewChild, ElementRef,signal,inject}from '@angular/core';
import { ThemeService } from '../../services/theme';
interface Project {
  title: string;
  tag: string;
  description: string;
  tech: string[];
  image: string;
  link: string;
  linkLabel: string;
}


@Component({
  selector: 'app-projects',
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class ProjectsComponent implements OnInit, OnDestroy {
  @ViewChild('titleEl', { static: true }) titleRef!: ElementRef<HTMLElement>;
  @ViewChild('scrollTrack') scrollTrack!: ElementRef<HTMLElement>;
  private theme = inject(ThemeService);
  private stopScramble?: () => void;

  titleText = signal('');

  readonly projects: Project[] = [
    {
      title: 'Emotion Detection in Social Media',
      tag: 'Master Thesis',
      description: 'Comparing single-step vs. two-step pipelines for joint emotion and intensity prediction using fine-tuned RoBERTa and DistilBERT.',
      tech: ['RoBERTa', 'DistilBERT', 'PyTorch', 'scikit-learn'],
      image: 'assets/Project_1.png',
      link: 'https://github.com/sharayumhaske22/Master_Thesis',
      linkLabel: 'View project →',
    },
    {
      title: 'Bias in Recruitment Systems',
      tag: 'Published Research',
      description: 'Quantifying gender, racial, and age bias in AI hiring tools using the Word Embedding Association Test. Published at ICAAI \'25.',
      tech: ['WEAT', 'NLP', 'Python', 'Responsible AI'],
      image: 'assets/Project_2.png',
      link: 'https://dl.acm.org/doi/10.1145/3787279.3787300',
      linkLabel: 'Read paper →',
    },
    {
      title: 'This Portfolio',
      tag: 'Personal Project',
      description: 'A terminal-themed personal site built with Angular, featuring scroll-aware animations, a live scramble-text effect, and a custom Tailwind design system.',
      tech: ['Angular', 'Tailwind CSS', 'RxJS', 'Signals'],
      image: 'assets/Project_3.png',
      link: 'https://github.com/sharayumhaske22/Sharayu_Portfolio_V1',
      linkLabel: 'View project →',
    },
    {
      title: 'Rock, Paper, Scissors',
      tag: 'Web Game',
      description: 'An interactive browser game with real-time user input, randomized computer responses, and Angular-driven win/loss/draw logic.',
      tech: ['Angular', 'JavaScript', 'HTML5', 'CSS3'],
      image: 'assets/Project_4.png',
      link: 'https://github.com/sharayumhaske22/rock_paper_scissors',
      linkLabel: 'View project →',
    },
  ];

  ngOnInit(): void {
    this.stopScramble = this.theme.scrambleOnScroll(
      this.titleRef.nativeElement,
      'Projects',
      (val) => this.titleText.set(val)
    );
  }

  ngOnDestroy(): void {
    this.stopScramble?.();
  }

  scroll(direction: 'left' | 'right'): void {
    const el = this.scrollTrack.nativeElement;
    const cardWidth = el.firstElementChild?.clientWidth ?? 400;
    el.scrollBy({ left: direction === 'left' ? -cardWidth - 24 : cardWidth + 24, behavior: 'smooth' });
  }
}
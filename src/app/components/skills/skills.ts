import { Component ,ViewChild,ElementRef,inject ,signal, OnDestroy,OnInit} from '@angular/core';
import { ThemeService } from '../../services/theme';

interface SkillCategory {
  title: string;
  icon: 'frontend' | 'backend' | 'languages' | 'database' | 'tools' | 'ai';
  skills: string[];
}

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class SkillsComponent implements OnInit, OnDestroy {
  @ViewChild('titleEl', { static: true }) titleRef!: ElementRef<HTMLElement>;
  private theme = inject(ThemeService);
  private stopScramble?: () => void;

  titleText = signal('');
  
  ngOnInit(): void {
    this.stopScramble = this.theme.scrambleOnScroll(this.titleRef.nativeElement, 'Skills', (val) => this.titleText.set(val));
  }

  ngOnDestroy(): void {
    this.stopScramble?.();
  }

readonly categories: SkillCategory[] = [
    {
      title: 'Frontend',
      icon: 'frontend',
      skills: ['Angular 17+', 'RxJS', 'Angular Material', 'Angular CDK', 'React.js', 'HTML5', 'CSS3'],
    },
    {
      title: 'Backend',
      icon: 'backend',
      skills: ['Node.js', 'Express.js', 'FastAPI', 'Spring Boot', 'Django REST Framework', 'REST APIs'],
    },
    {
      title: 'Programming Languages',
      icon: 'languages',
      skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C', 'SQL', 'PHP'],
    },
    {
      title: 'AI / ML',
      icon: 'ai',
      skills: ['RoBERTa', 'DistilBERT', 'Hugging Face Transformers', 'TensorFlow', 'Scikit-learn', 'Seq2Seq Models', 'Word Embeddings', 'Pandas', 'NumPy'],
    },
    {
      title: 'Databases',
      icon: 'database',
      skills: ['MySQL', 'Firebase Firestore', 'MongoDB', 'AngularFire'],
    },
    {
      title: 'Tools',
      icon: 'tools',
      skills: ['Git', 'GitHub', 'GitLab', 'Maven', 'Angular CLI', 'CI/CD', 'Postman'],
    },
  ];
}
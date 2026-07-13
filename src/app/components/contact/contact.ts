import { Component, ViewChild ,inject,ElementRef , signal , OnInit, OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme';


@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class ContactComponent implements OnInit, OnDestroy {
  @ViewChild('titleEl', { static: true }) titleRef!: ElementRef<HTMLElement>;
  private theme = inject(ThemeService);
  private stopScramble?: () => void;
  readonly phone = '+49 15901455664';
  readonly location = 'Koblenz, Germany';
  readonly email = 'sharayumhaske22@gmail.com';
  readonly linkedin = 'https://www.linkedin.com/in/sharayu-mhaske';
  readonly github = 'https://github.com/sharayumhaske22';
  readonly resumeUrl = 'assets/Sharayu_resume.pdf';


  titleText = signal('');
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.stopScramble = this.theme.scrambleOnScroll(this.titleRef.nativeElement,'Contact_Me',(val) => this.titleText.set(val));
  }

  ngOnDestroy(): void {
    this.stopScramble?.();
  }


  onSubmit(): void {
    if (this.form.invalid) return;
    console.log(this.form.value);
  }
}



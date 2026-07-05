import { Component,} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class ContactComponent {
  readonly phone = '+49 15901455664';
  readonly email = 'sharayumhaske22@gmail.com';
  readonly linkedin = 'https://www.linkedin.com/in/sharayu-mhaske';
  readonly github = 'https://github.com/sharayumhaske22';

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    console.log(this.form.value);
  }
}



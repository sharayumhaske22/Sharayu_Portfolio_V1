import { Component, OnInit, OnDestroy, signal, inject } from '@angular/core';
import { ThemeService } from '../../services/theme';

@Component({
  selector: 'app-intro-card',
  templateUrl: './intro-card.html',
  styleUrl: './intro-card.css',
})
export class IntroCardComponent implements OnInit, OnDestroy {
  readonly roles = ['Angular Developer', 'Full Stack Developer', 'Researcher', 'AI/ML Enthusiast'];

  displayName = signal('');
  displayRole = signal('');

  private theme = inject(ThemeService);
  private stopScramble?: () => void;
  private roleTimer?: ReturnType<typeof setTimeout>;
  private roleIndex = 0;
  private destroyed = false;

  ngOnInit(): void {
    this.stopScramble = this.theme.scrambleTextValue('Sharayu Mhaske', (val) => this.displayName.set(val));
    this.cycleRoles();
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.stopScramble?.();
    clearTimeout(this.roleTimer);
  }

  private cycleRoles(): void {
    if (this.destroyed) return;
    const role = this.roles[this.roleIndex];

    this.typeIn(role, () => {
      this.roleTimer = setTimeout(() => {
        this.typeOut(role, () => {
          this.roleIndex = (this.roleIndex + 1) % this.roles.length;
          this.cycleRoles();
        });
      }, 1200);
    });
  }

  private typeIn(word: string, onDone: () => void): void {
    let i = 0;
    const step = () => {
      if (this.destroyed) return;
      this.displayRole.set(word.slice(0, i + 1));
      i++;
      if (i < word.length) this.roleTimer = setTimeout(step, 55);
      else onDone();
    };
    step();
  }

  private typeOut(word: string, onDone: () => void): void {
    let i = word.length;
    const step = () => {
      if (this.destroyed) return;
      this.displayRole.set(word.slice(0, i));
      i--;
      if (i >= 0) this.roleTimer = setTimeout(step, 30);
      else onDone();
    };
    step();
  }
}
import { Component, signal,OnDestroy,OnInit } from '@angular/core';

const SCRAMBLE_CHARS = '!<>-_\\/[]{}=+*^?#';


@Component({
  selector: 'app-intro-card',
  imports: [],
  templateUrl: './intro-card.html',
  styleUrl: './intro-card.css',
})

export class IntroCardComponent  implements OnInit, OnDestroy {
  readonly fullName = 'Sharayu Mhaske';
  readonly roles = ['Angular Developer', 'Full-Stack Developer', 'Researcher', 'AI/ML Enthusiast'];

  displayName = signal('');
  displayRole = signal('');

  private scrambleInterval?: ReturnType<typeof setInterval>;
  private roleTimer?: ReturnType<typeof setTimeout>;
  private roleIndex = 0;
  private destroyed = false;

  ngOnInit(): void {
    this.scrambleIntoName();
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    clearInterval(this.scrambleInterval);
    clearTimeout(this.roleTimer);
  }

  private scrambleIntoName(): void {
    let iteration = 0;
    const maxIterations = this.fullName.length * 3;

    this.scrambleInterval = setInterval(() => {
      const revealedCount = Math.floor(iteration / 3);

      this.displayName.set(
        this.fullName
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < revealedCount) return char;
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join('')
      );

      iteration++;
      if (iteration >= maxIterations) {
        clearInterval(this.scrambleInterval);
        this.displayName.set(this.fullName);
        this.cycleRoles();
      }
    }, 40);
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


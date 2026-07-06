import { Component, ViewChild,ElementRef,inject ,signal} from '@angular/core';
import { ThemeService } from '../../services/theme';

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

  ngOnInit(): void {
    this.stopScramble = this.theme.scrambleOnScroll(this.titleRef.nativeElement,'About_Me',(val) => this.titleText.set(val));
  }

  ngOnDestroy(): void {
    this.stopScramble?.();
  }
}

import { Component, input, signal, OnInit } from '@angular/core';

@Component({
    selector: 'app-dev-score',
    standalone: true,
    template: `
    <div class="flex flex-col items-center justify-center space-y-4">
      <div class="relative w-28 h-28 flex items-center justify-center rounded-full bg-slate-800/40 shadow-inner">
        <svg class="absolute inset-0 w-full h-full transform -rotate-90 drop-shadow-md" viewBox="0 0 36 36">
          <path class="text-slate-700/50" stroke-width="2.5" stroke="currentColor" fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          <path class="transition-all duration-1000 ease-out" 
                [class.text-green-500]="score() >= 90"
                [class.text-orange-500]="score() >= 50 && score() < 90"
                stroke-width="2.5" stroke="currentColor" fill="none"
                [attr.stroke-dasharray]="100 + ', 100'"
                [attr.stroke-dashoffset]="100 - currentScore()"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
        </svg>
        <span class="text-4xl font-mono font-bold relative z-10" 
              [class.text-green-400]="score() >= 90"
              [class.text-orange-400]="score() >= 50 && score() < 90">
          {{ currentScore() }}
        </span>
      </div>
      <span class="text-sm font-semibold text-slate-400 tracking-widest uppercase">{{ label() }}</span>
    </div>
  `
})
export class DevScoreComponent implements OnInit {
    // Inputs modernos basados en Signals
    score = input.required<number>();
    label = input.required<string>();

    // Estado interno animado
    currentScore = signal(0);

    ngOnInit() {
        this.animateScore();
    }

    private animateScore() {
        let start = 0;
        const target = this.score();
        const duration = 1500; // 1.5 segundos de animación fluida
        const interval = 20;
        const step = target / (duration / interval);

        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                this.currentScore.set(target);
                clearInterval(timer);
            } else {
                this.currentScore.set(Math.floor(start));
            }
        }, interval);
    }
}
import { AfterViewInit, Component } from '@angular/core';
import { ConfettiService } from './services/confetti.service';

import * as moment from 'moment/moment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit {

  constructor(
    private confettiService: ConfettiService
  ) {
    moment.locale("he");
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.confettiService.startCelebration();
    }, 1000);
  }
}

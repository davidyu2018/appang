import { Component } from '@angular/core';
import { InternationalizationServiceTsService } from './core/internationalization.service.ts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'appang';
  constructor(private internation: InternationalizationServiceTsService) {
    this.internation.setInternation()
  }
}

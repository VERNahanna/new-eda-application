import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'eda-application';

  constructor(public translateService: TranslateService) {
    translateService.addLangs(['en', 'ar']);
    translateService.setDefaultLang('en');
  }

  translateSite(language: string) {
    this.translateService.use(language);
  }
}

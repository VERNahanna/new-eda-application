import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {FormService} from '../services/form.service';
import {FormBuilder} from '@angular/forms';
import {InputService} from '../services/input.service';
import {distinctUntilChanged, filter} from 'rxjs/operators';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() Username;
  @Input() notificationCount;
  @Output() selectedLanguage = new EventEmitter();
  screenWidth;
  menuObject = [
    {
      name: 'home',
      link: '/home',
      dropDownStatus: false
    },
    {
      name: 'createRequests',
      link: '/new-request',
      dropDownStatus: true,
      dropdownLinks: [
        {
          name: 'customRelease',
          link: '/new-request/custom-release'
        },
      ]
    },
    {
      name: 'draftRequests',
      link: '/draft-request',
      dropDownStatus: true,
      dropdownLinks: [
        {
          name: 'customRelease',
          link: '/draft-request/custom-release'
        },
      ]
    },
    {
      name: 'trackRequests',
      link: '/track-request',
      dropDownStatus: true,
      dropdownLinks: [
        {
          name: 'customRelease',
          link: '/track-request/custom-release'
        },
      ]
    },
    {
      name: 'rejectedRequests',
      link: '/rejected-request',
      dropDownStatus: true,
      dropdownLinks: [
        {
          name: 'customRelease',
          link: '/rejected-request/custom-release'
        },
      ]
    }
  ];

  alertNotificationStatus: boolean = false;
  alertNotification: any;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  isLoading: boolean = false;
  Token;
  currentLang = this.translateService.currentLang ? this.translateService.currentLang : 'en';

  constructor(private fb: FormBuilder,
              private getService: FormService,
              private inputService: InputService,
              private router: Router,
              public translateService: TranslateService,
              private route: ActivatedRoute) {
    translateService.addLangs(['en', 'ar']);
    translateService.setDefaultLang('en');

    this.onResize();
  }

  ngOnInit(): void {
    this.inputService.getInput$().pipe(
      filter(x => x.type === 'Token'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.Token = res.payload;
    });

    this.inputService.getInput$().pipe(
      filter(x => x.type === 'currentLang'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.currentLang = res.payload;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }

  isActive(link) {
    return this.router.url.includes(`${link}`);
  }

  logoutFunction() {
    this.getService.logoutAPIToken(this.Token).subscribe((res: any) => {
      if (res) {
        this.isLoading = false;
        this.router.navigate(['/login']).then(() => location.reload());
      } else {
        this.alertErrorNotificationStatus = true;
      }
    }, error => this.handleError(error));
  }

  handleError(message) {
    this.alertErrorNotificationStatus = true;
    this.alertErrorNotification = {msg: message};
    this.isLoading = false;
  }

  translateSite(language: string) {
    this.translateService.use(language);

    this.selectedLanguage.emit(language);
  }
}

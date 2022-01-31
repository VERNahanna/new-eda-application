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
      name: '',
      link: '/home',
      dropDownStatus: false,
      icon: 'fas fa-home'
    },
    {
      name: 'pharmaceuticalRawMaterial',
      link: '/new-request',
      dropDownStatus: true,
      icon: 'fas fa-pills',
      dropdownLinks: [
        {
          name: 'importationServices',
          link: '#',
          icon: 'fas fa-shipping-fast'
        },
        {
          name: 'releaseServices',
          link: '/new-request/custom-release',
          icon: 'fas fa-dolly-flatbed'
        }
      ]
    },
    {
      name: 'pharmaceuticalProducts',
      link: '/draft-request',
      dropDownStatus: true,
      icon: 'fas fa-first-aid',
      dropdownLinks: [
        {
          name: 'importationServices',
          link: '#',
          icon: 'fas fa-shipping-fast'
        },
        {
          name: 'releaseServices',
          link: '/new-request/custom-release',
          icon: 'fas fa-dolly-flatbed'
        }
      ]
    },
    {
      name: 'biologicalProducts',
      link: '/track-request',
      dropDownStatus: true,
      icon: 'fas fa-dna',
      dropdownLinks: [
        {
          name: 'importationServices',
          link: '#',
          icon: 'fas fa-shipping-fast'
        },
        {
          name: 'releaseServices',
          link: '/new-request/custom-release',
          icon: 'fas fa-dolly-flatbed'
        }
      ]
    },
    {
      name: 'narcotics',
      link: '/rejected-request',
      dropDownStatus: true,
      icon: 'fas fa-tablets',
      dropdownLinks: [
        {
          name: 'importationServices',
          link: '#',
          icon: 'fas fa-shipping-fast'
        },
        {
          name: 'releaseServices',
          link: '/new-request/custom-release',
          icon: 'fas fa-dolly-flatbed'
        }
      ]
    },
    {
      name: 'detergentsAndPesticides',
      link: '/rejected-request',
      dropDownStatus: true,
      icon: 'fas fa-vials',
      dropdownLinks: [
        {
          name: 'importationServices',
          link: '#',
          icon: 'fas fa-shipping-fast'
        },
        {
          name: 'releaseServices',
          link: '/new-request/custom-release',
          icon: 'fas fa-dolly-flatbed'
        }
      ]
    },
    {
      name: 'cosmeticsProducts',
      link: '/rejected-request',
      dropDownStatus: true,
      icon: 'fas fa-medkit',
      dropdownLinks: [
        {
          name: 'importationServices',
          link: '#'
        },
        {
          name: 'releaseServices',
          link: '/new-request/custom-release'
        }
      ]
    },
    {
      name: 'pharmaceuticalExemption',
      link: '/rejected-request',
      dropDownStatus: false,
      icon: 'fas fa-receipt'
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

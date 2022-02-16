import {Component, OnInit} from '@angular/core';
import {CardsList} from "../../../utils/common-models";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {CosmeticsProductService} from "../cosmetics-product.service";
import {TranslateService} from "@ngx-translate/core";
import {distinctUntilChanged, filter} from "rxjs/operators";
import {InputService} from "../../services/input.service";

@Component({
  selector: 'app-cosmetics-products',
  templateUrl: './cosmetics-products.component.html',
  styleUrls: ['./cosmetics-products.component.scss']
})
export class CosmeticsProductsComponent implements OnInit {
  routingPath: string;
  departId: string;
  departSecId: string;
  cosmeticsProductsImportationServices: CardsList[] = [
    {
      id: '',
      name: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      description: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      newRequestLink: '/pages/cosmetics-product/inner/new-request',
      draftListLink: '/pages/cosmetics-product/inner/draft-request',
      trackListLink: '/pages/cosmetics-product/inner/track-request',
      icon: 'fas fa-pills'
    },
    {
      id: '',
      name: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      description: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      newRequestLink: '/pages/cosmetics-product/inner/new-request',
      draftListLink: '/pages/cosmetics-product/inner/draft-request',
      trackListLink: '/pages/cosmetics-product/inner/track-request',
      icon: 'fas fa-pills'
    },
    {
      id: '',
      name: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      description: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      newRequestLink: '/pages/cosmetics-product/inner/new-request',
      draftListLink: '/pages/cosmetics-product/inner/draft-request',
      trackListLink: '/pages/cosmetics-product/inner/track-request',
      icon: 'fas fa-pills'
    },
    {
      id: '',
      name: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      description: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      newRequestLink: '/pages/cosmetics-product/inner/new-request',
      draftListLink: '/pages/cosmetics-product/inner/draft-request',
      trackListLink: '/pages/cosmetics-product/inner/track-request',
      icon: 'fas fa-pills'
    },
    {
      id: '',
      name: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      description: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      newRequestLink: '/pages/cosmetics-product/inner/new-request',
      draftListLink: '/pages/cosmetics-product/inner/draft-request',
      trackListLink: '/pages/cosmetics-product/inner/track-request',
      icon: 'fas fa-pills'
    },
  ];
  cosmeticsProductsReleaseServices: CardsList[] = [
    {
      id: '',
      name: {
        en: 'text 4',
        ar: 'الجملة41'
      },
      description: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      newRequestLink: '/pages/cosmetics-product/inner/new-request',
      draftListLink: '/pages/cosmetics-product/inner/draft-request',
      trackListLink: '/pages/cosmetics-product/inner/track-request',
      icon: 'fas fa-pills'
    },
    {
      id: '',
      name: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      description: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      newRequestLink: '/pages/cosmetics-product/inner/new-request',
      draftListLink: '/pages/cosmetics-product/inner/draft-request',
      trackListLink: '/pages/cosmetics-product/inner/track-request',
      icon: 'fas fa-pills'
    },
    {
      id: '',
      name: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      description: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      newRequestLink: '/pages/cosmetics-product/inner/new-request',
      draftListLink: '/pages/cosmetics-product/inner/draft-request',
      trackListLink: '/pages/cosmetics-product/inner/track-request',
      icon: 'fas fa-pills'
    },
    {
      id: '',
      name: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      description: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      newRequestLink: '/pages/cosmetics-product/inner/new-request',
      draftListLink: '/pages/cosmetics-product/inner/draft-request',
      trackListLink: '/pages/cosmetics-product/inner/track-request',
      icon: 'fas fa-pills'
    },
    {
      id: '',
      name: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      description: {
        en: 'text1',
        ar: 'الجملة 1'
      },
      newRequestLink: '/pages/cosmetics-product/inner/new-request',
      draftListLink: '/pages/cosmetics-product/inner/draft-request',
      trackListLink: '/pages/cosmetics-product/inner/track-request',
      icon: 'fas fa-pills'
    },
  ];

  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  isLoading: boolean = false;
  currentLang = this.translateService.currentLang ? this.translateService.currentLang : 'en';

  constructor(private router: Router,
              private inputService: InputService,
              public translateService: TranslateService,
              private services: CosmeticsProductService,
              private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.routingPath = event.url.split('/')[4];
      }
    });

    this.activatedRoute.params.subscribe(res => {
      this.departId = res.departId;
      this.departSecId = res.departSecId;
    })

  }

  ngOnInit(): void {
    this.services.getAllServicesBasedOnDeptId(this.departId, this.departSecId).subscribe((res: any) => {
      console.log('res', res);
    }, error => this.handleError(error));

    this.inputService.getInput$().pipe(
      filter(x => x.type === 'currentLang'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.currentLang = res.payload;
    });
  }

  handleError(error) {
    this.alertErrorNotificationStatus = true;
    this.alertErrorNotification = {msg: error};
    this.isLoading = false;
  }

  onClosedErrorAlert() {
    setTimeout(() => {
      this.alertErrorNotificationStatus = false;
    }, 10000);
  }
}

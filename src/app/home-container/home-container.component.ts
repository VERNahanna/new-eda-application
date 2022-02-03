import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {routerTransitionSlide} from 'src/app/animation/routable.animations';
import {FormService} from '../services/form.service';
import {distinctUntilChanged, filter} from 'rxjs/operators';
import {InputService} from '../services/input.service';
import {Observable, interval} from 'rxjs';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss'],
  animations: [
    routerTransitionSlide
  ]
})
export class HomeContainerComponent implements OnInit {
  formData = {
    ports: [],
    importReason: [],
    companyProfile: [],
    ingredient: [],
    packagingType: [],
    rowMaterial: [],
    productManufacture: {},
    releaseType: [],
    countries: [],
    currencies: [],
    unitOfMeasure: [],
    applicantList: [],
    itemTypeList:[]
  };
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  isLoading: boolean = false;
  companyProfileId: any;
  username;
  unseenCount;
  currentLang;

  constructor(private inputService: InputService, private getService: FormService) {
    interval(10000).subscribe(x => { // will execute every 30 seconds
      this.getNotificationNumber();
    });
  }

  async ngOnInit(): Promise<any> {
    this.inputService.getInput$().pipe(
      filter(x => x.type === 'CompanyId'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.companyProfileId = res.payload;
    });


    this.isLoading = true;

    await this.getService.getAllPortsLookUp().subscribe((res: any) => {
      if (res) {
        this.formData.ports = res;
      }
    });
    await this.getService.getAllInvoiceItemTypes().subscribe((res: any) => {
      if (res) {
        this.formData.itemTypeList = res;
      }
    });
    await this.getService.getAllImportReason().subscribe((res: any) => {
      if (res) {
        this.formData.importReason = res;
      }
    });
    await this.getService.getCompanyProfiles().subscribe((res: any) => {
      if (res) {
        this.formData.companyProfile = res;
      }
    });
    await this.getService.getAllIngredient().subscribe((res: any) => {
      if (res) {
        this.formData.ingredient = res;
      }
    });
    await this.getService.getAllPackagingList().subscribe((res: any) => {
      if (res) {
        this.formData.packagingType = res;
      }
    });
    await this.getService.getAllSrcRowMaterial().subscribe((res: any) => {
      if (res) {
        this.formData.rowMaterial = res;
      }
    });
    await this.getService.getAllProductManufacture().subscribe((res: any) => {
      if (res) {
        this.formData.productManufacture = res;
      }
    });
    await this.getService.getAllReleaseType().subscribe((res: any) => {
      if (res) {
        this.formData.releaseType = res;
      }
    });
    await this.getService.getSharedCountries().subscribe((res: any) => {
      if (res) {
        this.formData.countries = res;
      }
    });
    await this.getService.getSharedCurrencies().subscribe((res: any) => {
      if (res) {
        this.formData.currencies = res;
      }
    });
    await this.getService.getAllUnitOfMeasure().subscribe((res: any) => {
      if (res) {
        this.formData.unitOfMeasure = res;
      }
    });
    await this.getService.getCompanyProfileLookUp(1, this.companyProfileId, '').subscribe((res: any) => {
      this.formData.applicantList = res;

      this.formData.applicantList.filter(option => option.ID === this.companyProfileId).map(x => {
        this.username = x.NAME;
      });
    }, error => this.handleError(error));
    this.isLoading = false;
    this.inputService.publish({type: 'allLookups', payload: this.formData});

    this.inputService.getInput$().pipe(
      filter(x => x.type === 'notificationUnreadCount'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.unseenCount = res.payload.filter(x => !x.f_seen).map(list => list).length;
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
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

  getNotificationNumber() {
    this.getService.getNotificationLogsList().subscribe((res: any) => {
      this.isLoading = false;

      this.unseenCount = res.filter(x => !x.f_seen).map(list => list).length;
    }, error => this.handleError(error));
  }

  changeLang(event) {
    this.currentLang = event;

    this.inputService.publish({type: 'currentLang', payload: this.currentLang})
  }
}

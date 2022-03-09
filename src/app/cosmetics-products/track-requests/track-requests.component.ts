import {Component, OnInit, ViewChild} from '@angular/core';
import {FormService} from "../../services/form.service";
import {TranslateService} from "@ngx-translate/core";
import {InputService} from "../../services/input.service";
import {distinctUntilChanged, filter} from "rxjs/operators";
import {TabsetComponent} from "ngx-bootstrap/tabs";

@Component({
  selector: 'app-track-requests',
  templateUrl: './track-requests.component.html',
  styleUrls: ['./track-requests.component.scss']
})
export class TrackRequestsComponent implements OnInit {
  isLoading: boolean = false;
  alertNotificationStatus: boolean = false;
  alertNotification: any;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  currentLang = this.translateService.currentLang ? this.translateService.currentLang : 'en';
  CompanyRoleID;
  trackList = {
    tableHeader: ['name', 'type', 'companyName', 'companyCountry', 'requestType', 'requestStatus', 'submissionDate', 'action'],
    tableBody: []
  };
  approvedList = {
    tableHeader: ['Request Id', 'Bol Number', 'company Name', 'country Name', 'created By', 'submit Date', 'status', 'action'],
    tableBody: []
  };
  rejectedList = {
    tableHeader: ['Request Id', 'Bol Number', 'company Name', 'country Name', 'created By', 'submit Date', 'status', 'action'],
    tableBody: []
  };
  @ViewChild('formTabs', {static: false}) formTabs: TabsetComponent;

  constructor(private getService: FormService,
              public translateService: TranslateService,
              private inputService: InputService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.inputService.getInput$().pipe(
      filter(x => x.type === 'CompanyData'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.CompanyRoleID = res.payload.CompanyRoleID;
    });

    this.inputService.getInput$().pipe(
      filter(x => x.type === 'currentLang'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.currentLang = res.payload;
    });

    this.setActivatedTab({target: {id: 'inProgress'}});
  }

  setActivatedTab(event) {
    switch (event.target.id.split('-')[0]) {
      case 'inProgress':
        this.getTrackProductsList();
        break;
      case 'approvedRequest':
        this.getApprovedRequestsList();
        break;
      case 'rejectedRequests':
        this.getRejectedRequestsList();
        break;
      default:
        return;
    }

    this.isLoading = false;
  }

  getTrackProductsList() {
    this.getService.getAllPendingRequestCount(this.CompanyRoleID).subscribe((res: any) => {
      console.log('res', res);
      this.trackList = {
        tableHeader: ['requestId', 'BolNo', 'companyName', 'companyCountry', 'created By', 'submissionDate', 'status', 'action'],
        tableBody: res
      };
      this.isLoading = false;
    }, error => this.handleError(error));
  }

  getApprovedRequestsList() {
    this.getService.getAllApprovedRequestCount(this.CompanyRoleID).subscribe((res: any) => {
      this.approvedList = {
        tableHeader: ['requestId', 'BolNo', 'companyName', 'companyCountry', 'created By', 'submissionDate', 'status', 'action'],
        tableBody: res
      };
      this.isLoading = false;
    }, error => this.handleError(error));
  }

  getRejectedRequestsList() {
    this.getService.getAllRejectedRequestCount(this.CompanyRoleID).subscribe((res: any) => {

      this.rejectedList = {
        tableHeader: ['requestId', 'BolNo', 'companyName', 'companyCountry', 'created By', 'submissionDate', 'status', 'action'],
        tableBody: res
      };
      this.isLoading = false;
    }, error => this.handleError(error));
  }

  onClosedErrorAlert() {
    setTimeout(() => {
      this.alertErrorNotificationStatus = false;
    }, 2000);
  }

  handleError(message) {
    this.alertErrorNotificationStatus = true;
    this.alertErrorNotification = {msg: message};
    this.isLoading = false;
  }
}

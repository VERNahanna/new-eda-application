import {Component, OnInit} from '@angular/core';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { FormService } from 'src/app/services/form.service';
import { InputService } from 'src/app/services/input.service';

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
  currentLang = 'en';
  CompanyRoleID;
  trackList = {
    tableHeader: ['Request Id','Bol Number', 'company Name', 'country Name', 'created By', 'submit Date', 'status', 'action'],
    tableBody: []
  };
  approvedList = {
    tableHeader: ['Request Id','Bol Number', 'company Name', 'country Name', 'created By', 'submit Date', 'status', 'action'],
    tableBody: []
  };

  rejectedList = {
    tableHeader: ['Request Id','Bol Number', 'company Name', 'country Name', 'created By', 'submit Date', 'status', 'action'],
    tableBody: []
  };

  constructor(private getService: FormService,
    private inputService: InputService) {
  }

  ngOnInit(): void {

    this.inputService.getInput$().pipe(
      filter(x => x.type === 'CompanyData'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.CompanyRoleID = res.payload.CompanyRoleID;
    });
    
    this.isLoading = true;
    this.getDraftProductsList();
    this. getApprovedRequestsList();
    this.getRejectedRequestsList();
  }
  getDraftProductsList() {
    this.getService.getAllPendingRequestCount(this.CompanyRoleID).subscribe((res: any) => {
      
      this.trackList = {
        tableHeader: ['Request Id','Bol Number', 'company Name', 'country Name', 'created By', 'submit Date', 'status', 'action'],
        tableBody: res
      };
      this.isLoading = false;
    }, error => this.handleError(error));
  }
/**Approved  Requests Tab*/
  getApprovedRequestsList() {
    this.getService.getAllApprovedRequestCount(this.CompanyRoleID).subscribe((res: any) => {
      
      this.approvedList = {
        tableHeader: ['Request Id','Bol Number', 'company Name', 'country Name', 'created By', 'submit Date', 'status', 'action'],
        tableBody: res
      };
      this.isLoading = false;
    }, error => this.handleError(error));
  }

  /**Rejected  Requests Tab*/
  getRejectedRequestsList() {
    this.getService.getAllRejectedRequestCount(this.CompanyRoleID).subscribe((res: any) => {
      
      this.rejectedList = {
        tableHeader: ['Request Id','Bol Number', 'company Name', 'country Name', 'created By', 'submit Date', 'status', 'action'],
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

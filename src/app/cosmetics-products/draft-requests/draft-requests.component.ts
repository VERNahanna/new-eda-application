import {Component, OnInit} from '@angular/core';
import {FormService} from "../../services/form.service";
import {distinctUntilChanged, filter} from "rxjs/operators";
import {InputService} from "../../services/input.service";

@Component({
  selector: 'app-draft-requests',
  templateUrl: './draft-requests.component.html',
  styleUrls: ['./draft-requests.component.scss']
})
export class DraftRequestsComponent implements OnInit {

  isLoading: boolean = false;
  alertNotificationStatus: boolean = false;
  alertNotification: any;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  draftList = {};
  CompanyRoleID;

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
  }

  getDraftProductsList() {
    this.getService.getAllDraftRequestCount(this.CompanyRoleID).subscribe((res: any) => {
      this.draftList = {
        tableHeader: ['BolNo', 'supplierName', 'supplierCountry', 'requestType', 'createdDate', 'action'],
        tableBody: res
      };
      this.isLoading = false;
    }, error => this.handleError(error));
  }

  handleError(message) {
    this.alertErrorNotificationStatus = true;
    this.alertErrorNotification = {msg: message};
    this.isLoading = false;
  }

  onClosedErrorAlert() {
    setTimeout(() => {
      this.alertErrorNotificationStatus = false;
    }, 2000);
  }
}

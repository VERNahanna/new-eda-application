import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormService} from "../../../services/form.service";
import {distinctUntilChanged, filter} from "rxjs/operators";
import {InputService} from "../../../services/input.service";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-draft-import-requests',
  templateUrl: './draft-import-requests.component.html',
  styleUrls: ['./draft-import-requests.component.scss']
})
export class DraftImportRequestsComponent implements OnInit {

  isLoading: boolean = false;
  alertNotificationStatus: boolean = false;
  alertNotification: any;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  draftList = {};
  CompanyRoleID;
  @ViewChild('deleteModal') modalDeletedTemplate: TemplateRef<any>;
  modalRef: BsModalRef;
  modalOptions: ModalOptions = {
    backdrop: 'static',
    keyboard: false,
    class: 'modal-xl packagingModal',
  };
  modalRequestId: any;

  constructor(private getService: FormService,
              private modalService: BsModalService,
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
        tableHeader: [ 'supplierName', 'supplierCountry', 'requestType', 'createdDate', 'action'],
        tableBody: res
      };
      this.isLoading = false;
    }, error => this.handleError(error));
  }

  openDeleteModal(event) {
    this.modalRef = this.modalService.show(this.modalDeletedTemplate, this.modalOptions);
    this.modalRequestId = event;
  }

  removeProduct() {
    this.isLoading = true;
    this.getService.deleteRequestDetails(this.modalRequestId).subscribe(res => {

      if (res) {
        this.isLoading = false;
        this.modalRef.hide();

        this.alertNotificationStatus = true;
        this.alertNotification = this.alertForSubmitRequest();
        this.onClosedErrorAlert();

        this.getDraftProductsList();

      }
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

  alertForSubmitRequest() {
    return {msg: 'You had a successful Delete'};
  }
}

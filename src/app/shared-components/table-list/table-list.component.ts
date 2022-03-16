import {Component, OnInit, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {ActivatedRoute, Router} from '@angular/router';
import {PageChangedEvent} from 'ngx-bootstrap/pagination';
import {Observable} from 'rxjs';
import {InputService} from '../../services/input.service';
import {TranslateService} from "@ngx-translate/core";
import {distinctUntilChanged, filter} from "rxjs/operators";

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit, OnChanges {

  @Input() data;
  @Input() whichTable;
  @Input() approvedType;
  @Input() rejectedType;
  step;
  sortByForRequestNumber = [
    {
      id: 'descending',
      value: 'Descending '
    },
    {
      id: 'ascending',
      value: 'Ascending '
    }
  ];
  dataAfterFilters = [];
  filterData = {
    filterKey: []
  };
  filterRow = [];
  keyForFilter;
  keyWordsForFilter;
  staticFilterKey = {
    'BolNo': 'bolNo',
    'supplierName': 'companyName',
    'supplierCountry': 'countryName',
    'requestType': 'releaseType',
    'createdDate': 'createdDate',
  };
  sortStatus = false;
  alertNotificationStatus: boolean = false;
  currentLang = this.translateService.currentLang ? this.translateService.currentLang : 'en';

  filteredData: Observable<any[]>;


  @Input() removeFilterKey;
  @Output() seenNotification = new EventEmitter();
  @Output() editProductInInvoicesRows = new EventEmitter();
  @Output() removeProductInInvoicesRows = new EventEmitter();
  @Output() removeDraftProduct = new EventEmitter();
  @Output() choosePackagingRow = new EventEmitter();
  @Output() chooseDetailsRowOutput = new EventEmitter();
  @Output() editItemData = new EventEmitter();
  @Output() deleteItemData = new EventEmitter();
  @Output() editInvoiceData = new EventEmitter();
  @Output() deleteInvoiceData = new EventEmitter();

  contentArray = [];
  returnedArray: string[];

  constructor(private router: Router,
              private route: ActivatedRoute,
              public translateService: TranslateService,
              private inputService: InputService) {
  }

  ngOnChanges() {
    if (this.data) {
      if (this.data.tableBody && this.data.tableBody?.length > 0) {
        if (this.whichTable === 'drafted' || this.whichTable === 'track' || this.whichTable === 'notificationList') {
          this.data.tableBody.sort((a, b) => a.createdDate && b.createdDate ? (a.createdDate > b.createdDate) ? -1 : 1 : -1);

          if (this.whichTable === 'notificationList') {
            this.data.tableBody.sort((a, b) => (a.notification_time > b.notification_time) ? -1 : 1);
            // this.data.tableBody.sort((a, b) => (a.requestID > b.requestID) ? -1 : 1);
            this.data.tableBody.map(x => {
              x.ID = x.ID ? x.ID.toString() : null;
              x.NotificationNo = x.NotificationNo ? x.NotificationNo.toString() : '';
              x.oldNotificationNo = x.oldNotificationNo ? x.oldNotificationNo.toString() : '';
            });
          }

          const tableColumnID = Object.keys(this.data.tableBody[0]).map((x, i) => x);
          this.filterData.filterKey = [];

          this.data.tableHeader.map((x, i) => {
            if (this.staticFilterKey[this.data.tableHeader[i]]) {

              this.filterData.filterKey.push({
                name: this.data.tableHeader[i],
                id: this.staticFilterKey[this.data.tableHeader[i]]
              });
            }
          });

          this.contentArray = new Array(this.data.tableBody.length).fill('');
          this.contentArray = this.contentArray.map((v: string, i: number) => this.data.tableBody[i]);
          this.returnedArray = this.contentArray.slice(0, 10);
        }
      }
    }
  }

  ngOnInit(): void {
    this.inputService.getInput$().pipe(
      filter(x => x.type === 'currentLang'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.currentLang = res.payload;
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  sortBy(status, columnName) {
    this.contentArray = [];
    this.returnedArray = [];

    this.sortStatus = !status;
    if (!this.sortStatus) {
      if (this.staticFilterKey[columnName] === 'createdDate') {
        this.data.tableBody = this.data.tableBody.sort((a, b) => a.createdDate && b.createdDate ? (a.createdDate > b.createdDate) ? -1 : 1 : -1);
      } else {
        this.data.tableBody = this.data.tableBody.sort((a, b) => (a[this.staticFilterKey[columnName]].toLowerCase() > b[this.staticFilterKey[columnName]].toLowerCase()) ? 1 : -1);
      }
    } else if (this.sortStatus) {
      if (this.staticFilterKey[columnName] === 'createdDate') {
        this.data.tableBody = this.data.tableBody.sort((a, b) => a.createdDate && b.createdDate ? (a.createdDate < b.createdDate) ? 1 : -1 : -1);
      } else {
        this.data.tableBody = this.data.tableBody.sort((a, b) => (a[this.staticFilterKey[columnName]].toLowerCase() < b[this.staticFilterKey[columnName]].toLowerCase()) ? 1 : -1);
      }
    }

    this.contentArray = new Array(this.data.tableBody.length).fill('');
    this.contentArray = this.contentArray.map((v: string, i: number) => this.data.tableBody[i]);
    this.returnedArray = this.contentArray.slice(0, 10);
  }

  setTheFilteredData(event) {
    if (event.keyForFilter.id) {
      if (event.filterRow.length > 0) {
        if (event.keyWordsForFilter) {
          if (event.keyForFilter.id === 'createdDate') {
            this.dataAfterFilters.map(x => x[event.keyForFilter.id] = new Date(x[event.keyForFilter.id]).toDateString());
            if (this.dataAfterFilters.filter(x => x[event.keyForFilter.id] === event.keyWordsForFilter.toDateString()).length > 0) {
              this.dataAfterFilters = this.dataAfterFilters.filter(x => x[event.keyForFilter.id] === event.keyWordsForFilter.toDateString());
            } else {
              this.showAlertForFailedAlert();
            }
          } else {
            if (this.dataAfterFilters.filter(x => x[event.keyForFilter.id] && x[event.keyForFilter.id].toLowerCase().includes(event.keyWordsForFilter.toLowerCase())).length > 0) {
              this.dataAfterFilters = this.dataAfterFilters.filter(x => x[event.keyForFilter.id] && x[event.keyForFilter.id].toLowerCase().includes(event.keyWordsForFilter.toLowerCase()));
            } else {
              this.showAlertForFailedAlert();
            }
          }
        } else {
          event.filterRow.map((x, i) => {
            if (i === 0) {
              if (event.keyForFilter.id === 'createdDate') {
                this.data.tableBody.map(y => y[this.staticFilterKey[x.columnName]] = new Date(y[this.staticFilterKey[x.columnName]]).toDateString());
                if (this.data.tableBody.filter(y => y[this.staticFilterKey[x.columnName]] === x.keyword.toDateString()).length > 0) {
                  this.dataAfterFilters = this.data.tableBody.filter(y => y[this.staticFilterKey[x.columnName]] === x.keyword.toDateString());
                } else {
                  this.showAlertForFailedAlert();
                }
              } else {
                if (this.data.tableBody.filter(y => y[this.staticFilterKey[x.columnName]] && y[this.staticFilterKey[x.columnName]].toLowerCase().includes(x.keyword.toLowerCase())).length > 0) {
                  this.dataAfterFilters = this.data.tableBody.filter(y => y[this.staticFilterKey[x.columnName]] && y[this.staticFilterKey[x.columnName]].toLowerCase().includes(x.keyword.toLowerCase()));
                } else {
                  this.showAlertForFailedAlert();
                }
              }
            } else {
              if (event.keyForFilter.id === 'createdDate') {
                this.dataAfterFilters.map(y => y[this.staticFilterKey[x.columnName]] = new Date(y[this.staticFilterKey[x.columnName]]).toDateString());
                if (this.dataAfterFilters.filter(y => y[this.staticFilterKey[x.columnName]] === x.keyword.toDateString()).length > 0) {
                  this.dataAfterFilters = this.dataAfterFilters.filter(y => y[this.staticFilterKey[x.columnName]] === x.keyword.toDateString());
                } else {
                  this.showAlertForFailedAlert();
                }
              } else {
                if (this.dataAfterFilters.filter(y => y[this.staticFilterKey[x.columnName]] && y[this.staticFilterKey[x.columnName]].toLowerCase().includes(x.keyword.toLowerCase())).length > 0) {
                  this.dataAfterFilters = this.dataAfterFilters.filter(y => y[this.staticFilterKey[x.columnName]] && y[this.staticFilterKey[x.columnName]].toLowerCase().includes(x.keyword.toLowerCase()));
                } else {
                  this.showAlertForFailedAlert();
                }
              }
            }
          });
        }
      } else {
        if (event.keyWordsForFilter) {
          if (event.keyForFilter.id === 'createdDate') {
            this.data.tableBody.map(x => x[event.keyForFilter.id] = new Date(x[event.keyForFilter.id]).toDateString());
            if (this.data.tableBody.filter(x => x[event.keyForFilter.id] === event.keyWordsForFilter.toDateString()).length > 0) {
              this.dataAfterFilters = this.data.tableBody.filter(x => x[event.keyForFilter.id] === event.keyWordsForFilter.toDateString());
            } else {
              this.showAlertForFailedAlert();
            }
          } else {
            if (this.data.tableBody.filter(x => x[event.keyForFilter.id] && x[event.keyForFilter.id].toLowerCase().includes(event.keyWordsForFilter.toLowerCase())).length > 0) {
              this.dataAfterFilters = this.data.tableBody.filter(x => x[event.keyForFilter.id] && x[event.keyForFilter.id].toLowerCase().includes(event.keyWordsForFilter.toLowerCase()));
            } else {
              this.showAlertForFailedAlert();
            }
          }
        } else {
          this.dataAfterFilters = [];
        }
      }
    }

    this.contentArray = new Array(this.dataAfterFilters.length > 0 ? this.dataAfterFilters.length : this.data.tableBody.length).fill('');
    this.contentArray = this.contentArray.map((v: string, i: number) => this.dataAfterFilters.length > 0 ? this.dataAfterFilters[i] : this.data.tableBody[i]);
    this.returnedArray = this.contentArray.slice(0, 10);
  }

  showAlertForFailedAlert() {
    this.alertNotificationStatus = true;

    setTimeout(() => {
      this.alertNotificationStatus = false;
    }, 3000);
  }

  editProduct(request) {
    const editFrom = this.router.url.split('/')[2];

    if (editFrom === 'cosmetics-product') {
      this.router.navigate([`/pages/cosmetics-product/inner/new-request/${request.requestId}`]);
    }
  }

  deleteProduct(request) {
    const editFrom = this.router.url.split('/')[2];

    if (editFrom === 'cosmetics-product') {
      this.removeDraftProduct.emit(request.requestId);
    }


    this.dataAfterFilters = [];

    this.removeFilterKey = true;
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.contentArray.slice(startItem, endItem);
  }

  addBatch(notificationNumber) {
    this.inputService.publish({type: 'NotificationNumber', payload: notificationNumber});
    this.router.navigateByUrl('/admin/adding-batch');
  }

  seenNotificationFunction(id) {
    this.seenNotification.emit(id);
  }

  choosePackingRow(index, request) {
    this.choosePackagingRow.emit({index, data: request})
  }

  chooseDetailsRow(index, request) {
    this.chooseDetailsRowOutput.emit({index, data: request})
  }

  editInvoice(index, request) {
    this.editInvoiceData.emit({index, data: request})
  }

  deleteInvoice(index, request) {
    this.deleteInvoiceData.emit(index)
  }

  editItem(index, request) {
    this.editItemData.emit({index, data: request})
  }

  deleteItem(index, request) {
    this.deleteItemData.emit(index)
  }
}

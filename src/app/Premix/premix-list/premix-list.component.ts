import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormService } from 'src/app/services/form.service';
import { InputService } from 'src/app/services/input.service';



@Component({
  selector: 'app-premix-list',
  templateUrl: './premix-list.component.html',
  styleUrls: ['./premix-list.component.scss']
})
export class PremixListComponent implements OnInit {

 
  premixList;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  isLoading: boolean = false;
  currentLang = this.translateService.currentLang ? this.translateService.currentLang : 'en';

  constructor(private fb: FormBuilder,
    private number: DecimalPipe,
    private router: Router,
    private route: ActivatedRoute,
    private inputService: InputService,
    public translateService: TranslateService,
    private getService: FormService) {
    

}
  ngOnInit(): void {
    this.isLoading = false;

    /* this.getService.getPremixList().subscribe((res: any) => {
      this.premixList = {
        tableHeader: ['Id', 'Premix Name','Notification No','Origin Name','Origin Country','Supplier Name' ,'Supplier Country','Actions'],
        tableBody: res
      };
      this.isLoading = false;
    }, error => this.handleError(error)); */
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

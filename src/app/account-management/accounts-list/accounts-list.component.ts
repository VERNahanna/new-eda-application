import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormService } from 'src/app/services/form.service';
import { InputService } from 'src/app/services/input.service';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit {
  companyForm: FormGroup;
  

  usersList;
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
    this.getFormAsStarting('', '');
    debugger;
    this.isLoading = false;
     this.getService.GetCompanyInfo(4).subscribe((res: any) => {
       if(res)
       { debugger;
        this.companyForm.patchValue({
          companyName: res.companyProfileDto.name.en,
          companyAddress:res.companyProfileDto.address,
          companyPhone:res.companyProfileDto.phone,
          companyEmail:res.companyProfileDto.email,
        }) 
         this.usersList = {
        tableHeader: ['id','name', 'userName','address','phone','ip','lastLogin' ,'action'],
        tableBody: res.portalUserDTOs
      };
      this.isLoading = false;}
     
    }, error => this.handleError(error)); 
  }
  getFormAsStarting(data, fromWhere) {
    if (data) {
    } else {
      this.companyForm = this.fb.group({
        id: 0,
        companyName:this.fb.control(''),
        companyAddress:this.fb.control(''),
        companyPhone:this.fb.control(''),
        companyEmail:this.fb.control(''),
      });
    }
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
  removePremix(premix)
  {
 
    this.getService.removePremix(premix.id).subscribe((res: any) => {
    }, error => this.handleError(error)); 
    this.getService.GetCompanyInfo(4).subscribe((res: any) => {
      this.usersList = {
        tableHeader:['id','name', 'userName','address','phone','ip','lastLogin' ,'action'],
        tableBody: res
      };
      this.isLoading = false;
    }, error => this.handleError(error)); 
  }

  onSubmit()
  {}
}

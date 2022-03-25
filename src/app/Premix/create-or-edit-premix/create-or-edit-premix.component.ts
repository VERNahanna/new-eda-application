import {Component, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DecimalPipe} from '@angular/common';
import {catchError, debounceTime, distinctUntilChanged, filter, map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {TabsetComponent} from 'ngx-bootstrap/tabs';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';
import {TranslateService} from "@ngx-translate/core";
import { InputService } from 'src/app/services/input.service';
import { FormService } from 'src/app/services/form.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-create-or-edit-premix',
  templateUrl: './create-or-edit-premix.component.html',
  styleUrls: ['./create-or-edit-premix.component.scss']
})
export class CreateOrEditPremixComponent implements OnInit {
  PremixForm: FormGroup;

   premixObj :premix ={} as premix ;
  formData=null;
  filteredOptionsForSupplierCountry: Observable<LookupState[]>;
  filteredOptionsForOriginCountry: Observable<LookupState[]>;
  filteredOptionsForRawMaterialType: Observable<any[]>;
  filteredOptionsForFunctionList:[rawMaterialfunction];
  
  currentLang = this.translateService.currentLang ? this.translateService.currentLang : 'en';
  isLoading: boolean = false;
  premixIngredientsList;
  Ingredients=[]; 
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  selectedOriginCountryId;
  selectedSupplierCountryId;
  selectedRawId : number;
  selectedFunctionId: number;
  constructor(private fb: FormBuilder,
    private number: DecimalPipe,
    private router: Router,
    private route: ActivatedRoute,
    private inputService: InputService,
    public translateService: TranslateService,
    private modalService: BsModalService,
    private getService: FormService) { }

  ngOnInit(): void {
 this.premixObj.PremixIngredients=[];
    this.inputService.getInput$().pipe(
      filter(x => x.type === 'allLookups'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.formData = {
        ...res.payload,
      };
     
    });
    this.getFormAsStarting('', '');
    this.setAllLookupsInObservable();
    this.isLoading = false;
  }

  handleError(message) {
    this.alertErrorNotificationStatus = true;
    this.alertErrorNotification = {msg: message};
    this.isLoading = false;
  }
  AddIngredientToList()
  {  
    this.selectedFunctionId=this.filteredOptionsForFunctionList.find(o => o.functionName ===  this.PremixForm.get('function').value ).id;
    this.selectedRawId=this.getIdFromLookupByNameWithDiffModel( this.formData?.rawMaterialList, this.PremixForm.get('rowMaterialNameField').value );
    const data={
      id:this.selectedRawId,
      name: this.PremixForm.get('rowMaterialNameField').value ,
      concentration:this.PremixForm.get('concentration').value,
      function:this.selectedFunctionId,
      functionName:this.PremixForm.get('function').value 
     };

    if(data.id !=0 && data.concentration !=0 && data.function !=0) {
    this.Ingredients.push(data);
    this.premixIngredientsList = {
      tableHeader: ['id', 'name','concentration','functionName','functionId','action'],
      tableBody: this.Ingredients
    };
  }
  else {
    this.alertErrorNotificationStatus = true;
    this.alertErrorNotification = {msg: 'Please Select Raw material and its function and enter its Concentration'};
  
  }
   
  }
  
  getIdFromLookupByNameWithDiffModel(list, value) {
    let id;
    list.filter(option => option.inciName === value).map(res => {
      id = res.id;
    });

    return id;
  }

  setAllLookupsInObservable() {
    this.filteredOptionsForRawMaterialType = this.filterLookupsFunction('rowMaterialNameField', this.PremixForm.get('rowMaterialNameField'), this.formData?.rawMaterialList);
    this.filteredOptionsForSupplierCountry = this.filterLookupsFunction('countries',this.PremixForm.get('supplierCountry'), this.formData?.countries);
    this.filteredOptionsForOriginCountry   = this.filterLookupsFunction('countries',  this.PremixForm.get('originCountry'), this.formData?.countries);
    this.getService.getPremixListofFunctions().subscribe((res: any) => {this.filteredOptionsForFunctionList =res; }, error => this.handleError(error));  
  }

 
  getFormAsStarting(data, fromWhere) {
    if (data) {
    } else {
      this.PremixForm = this.fb.group({
        id: 0,
        premixName:this.fb.control(''),
        notificationNumber:this.fb.control(''),
        originCompany:this.fb.control(''),
        originCountry:this.fb.control(''),
        supplierCompany:this.fb.control(''),
        supplierCountry: this.fb.control(''),
        Ingredients: this.fb.control([]),
        concentration: this.fb.control(''),
        function:this.fb.control(''),
        rowMaterialNameField :this.fb.control(''),
      });
    }
  }
  getDecimalValue(value, fromWhere) {
    this.PremixForm.patchValue({
      concentration: this.number.transform(this.PremixForm.get('concentration').value, '1.2-2')
    }, {emitEvent: false});
  }
  filterLookupsFunction(whichLookup, formControlValue, list, index?: any) {
    if (whichLookup === 'rowMaterialNameField') {
      if (formControlValue) {
        return formControlValue.valueChanges
          .pipe(
            startWith(''),
            map(state => state ? this.filterInsideListForDiffModel(whichLookup, state, list, index).slice(0, 3000) : list.slice(0, 3000))
          );
      }
    }else{ if (formControlValue) {
        return formControlValue.valueChanges
          .pipe(
            startWith(''),
            map(state => state ? this.filterInsideList(whichLookup, state, list) : list.slice())
          );
      }}
    }
    filterInsideList(lookup, value, list, index?: any): LookupState[] {
      let filterValue;
      if (value) {
        filterValue = value.toLowerCase() ? value.toLowerCase() : '';
      }
      return list.filter(option => option.name[this.currentLang].toLowerCase().includes(filterValue)).map(x => x);
    }
    filterInsideListForDiffModel(lookup, value, list, index?: any): any[] {
      let filterValue;
      if (value) {
        filterValue = value.toLowerCase() ? value.toLowerCase() : '';
      }
      return list.filter(option => option.inciName.toLowerCase().includes(filterValue)).map(x => x);
    }

    onSubmit(){

      const data=this.PremixForm.value;
      this.selectedOriginCountryId=this.getIdFromLookupByName( this.formData?.countries, this.PremixForm.get('originCountry').value );
      this.selectedSupplierCountryId=this.getIdFromLookupByName( this.formData?.countries, this.PremixForm.get('supplierCountry').value );
      this.premixObj.id=0;
      this.premixObj.NotificationNo=data.notificationNumber;
      this.premixObj.Name=data.premixName;
      this.premixObj.CompanyOrigin=data.originCompany;
      this.premixObj.CompanySupplier=data.supplierCompany;
      this.premixObj.LkupCountryOrigin=this.selectedOriginCountryId;
      this.premixObj.LkupCountrySupplier=this.selectedSupplierCountryId;
       for (let i = 0; i < this.Ingredients.length; i++) {
          const data={ id:i, IngredientId: this.Ingredients[i].id ,concentration:this.Ingredients[i].concentration, functionId:this.selectedFunctionId}
          this.premixObj.PremixIngredients.push(data);  
          }
          this.getService.AddNewPremix(this.premixObj).subscribe(res => {
            console.log('res', res)
          })
        }
  getIdFromLookupByName(list, value) {
    let id;
    list.filter(option => option.name[this.currentLang] === value).map(res => {
      id = res.id;
    });

    return id;
  }
    removeIngredientfromPremix(ing){
      const x=  this.Ingredients.indexOf[ing];
      this.Ingredients.splice(x,1);
      this.premixIngredientsList.tableBody=[]
      this.premixIngredientsList.tableBody= this.Ingredients;
    }
}

export interface LookupState {
  code: string;
  description: { en: string, ar: string };
  id: number;
  name: { en: string, ar: string };
}

export interface premix {
  id: number;
  NotificationNo: string;
  Name: string;
  CompanyOrigin:string ;
  CompanySupplier: string; 
  LkupCountryOrigin: { en: string, ar: string };
  LkupCountrySupplier: { en: string, ar: string };
  PremixIngredients:PremixIngredients[]; 
}
     
export interface PremixIngredients {
  id: number;
  IngredientId: number;
  functionId: number;
  concentration:any ;
}

export interface rawMaterialfunction {
  id:number;
functionName:string;

}

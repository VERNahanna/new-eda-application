import {Component, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormService} from '../services/form.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DecimalPipe} from '@angular/common';
import {catchError, debounceTime, distinctUntilChanged, filter, map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {TabsetComponent} from 'ngx-bootstrap/tabs';
import {InputService} from '../services/input.service';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-custom-release',
  templateUrl: './custom-release.component.html',
  styleUrls: ['./custom-release.component.scss']
})
export class CustomReleaseComponent implements OnInit {

  isLoading: boolean = false;
  alertNotificationStatus: boolean = false;
  alertNotification: any;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  @ViewChildren(MatAutocompleteTrigger) triggerCollection: QueryList<MatAutocompleteTrigger>;
  modalRef: BsModalRef;
  modalOptions: ModalOptions = {
    backdrop: 'static',
    keyboard: false,
    class: 'modal-xl packagingModal',
  };
  @ViewChild('successSubmissionModal') modalDetailedTemplate: TemplateRef<any>;
  dataInAnyError: any;
  @ViewChild('formTabs', {static: false}) formTabs: TabsetComponent;
  @ViewChild('invoicesTabs', {static: false}) invoicesTabs: TabsetComponent;
  @ViewChild('itemsStepsTabs', {static: false}) itemsStepsTabs: TabsetComponent;
  activeTabIndex;
  regCustomReleaseForm: FormGroup;
  regInvoicesForm: FormGroup;
  regItemsForm: FormGroup;
  filteredOptionsForRequestedReleaseType: Observable<LookupState[]>;
  filteredOptionsForCustomPortName: Observable<LookupState[]>;
  filteredOptionsForSupplierCountry: Observable<LookupState[]>;
  filteredOptionsForMeasureUnitList: Observable<LookupState[]>;
  filteredOptionsForCurrency: Observable<LookupState[]>;
  filteredOptionsForManufacturingCompany: Observable<LookupState[]>;
  filteredOptionsForManufacturingCountry: Observable<LookupState[]>;
  filteredOptionsForUOM: Observable<LookupState[]>;
  filteredOptionsForIngredientList: Observable<LookupState[]>;
  filteredOptionsForFunctionList: Observable<LookupState[]>;
  formData = null;
  attachmentFields: AttachemntObject[] = [
    {
      id: 'bolPolicy',
      name: 'BOL',
      fileName: '',
      fileValue: '',
      required: false,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'packingList',
      name: 'Packing List',
      fileName: '',
      fileValue: '',
      required: false,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'receipt',
      name: 'Receipt',
      fileName: '',
      fileValue: '',
      required: false,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'exportPledge',
      name: 'Export Pledge',
      fileName: '',
      fileValue: '',
      required: false,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
    {
      id: 'importersRecord',
      name: 'Importers Record',
      fileName: '',
      fileValue: '',
      required: false,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    },
  ];
  InvoiceAttachmentFields: AttachemntObject[] = [
    {
      id: 'invoice',
      name: 'Invoice',
      fileName: '',
      fileValue: '',
      required: false,
      enable: true,
      attachmentTypeStatus: '',
      loadingStatus: false,
    }
  ];
  ItemAttachmentFields: AttachemntObject[] = [];
  fileStructure;
  attachmentRequiredStatus: boolean = false;
  invoiceListTable = {
    tableHeader: ['invoiceNo', 'invoiceDate', 'invoiceValue', 'Currency', 'Actions'],
    tableBody: []
  };
  itemListTable = {
    tableHeader: ['itemType', 'importReason', 'manufacturingCompany', 'quantity', 'batchNo', 'Actions'],
    tableBody: []
  };
  invoiceContainerDisplayStatus: boolean = false;
  itemContainerDisplayStatus: boolean = false;
  itemType;
  importReason;
  premixField;
  rowMaterialNameField;
  packingItemNameField;
  showNotificationNoStatus: boolean = false;
  notificationNo;
  editItemIndex;
  editItemRowStatus = false;
  customImportRelease: any = [];
  serviceId;
  allItemTypeAttachmentFields = {
    PRODUCTS: [
      {
        id: 'certificateOfOrigin',
        name: 'Certificate Of Origin',
        fileName: '',
        fileValue: '',
        required: false,
        enable: false,
        enabledCondition: true,
        relatedWithField: ['FINISHED_PRDUCTS'],
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'companyManufactureRelationship',
        name: 'Company Manufacture Relationship',
        fileName: '',
        fileValue: '',
        required: false,
        enable: false,
        enabledCondition: true,
        relatedWithField: ['FINISHED_PRDUCTS'],
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'legalizedHealthCertificate',
        name: 'legalized Health Certificate',
        fileName: '',
        fileValue: '',
        required: false,
        enable: false,
        enabledCondition: true,
        relatedWithField: ['FINISHED_PRDUCTS'],
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'coa',
        name: 'COA',
        fileName: '',
        fileValue: '',
        required: false,
        enable: false,
        enabledCondition: true,
        relatedWithField: ['FINISHED_PRDUCTS'],
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'coc',
        name: 'COC',
        fileName: '',
        fileValue: '',
        required: false,
        requiredWithImportReasonCondition: true,
        enable: false,
        enabledCondition: true,
        relatedWithField: ['FINISHED_PRDUCTS'],
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
    ],
    PREMIX: [
      {
        id: 'certificateOfOrigin',
        name: 'Certificate Of Origin',
        fileName: '',
        fileValue: '',
        required: false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'companyManufactureRelationship',
        name: 'Company Manufacture Relationship',
        fileName: '',
        fileValue: '',
        required: false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'materialSafetyDataSheet',
        name: 'Material  Safety Data Sheet',
        fileName: '',
        fileValue: '',
        required: false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'sourceOfRawMaterialAttach',
        name: 'Source of raw material',
        fileName: '',
        fileValue: '',
        required: false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'legalizedHealthCertificate',
        name: 'legalized Health Certificate',
        fileName: '',
        fileValue: '',
        required: false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'declarationOfChemicalTreatment',
        name: 'Declaration of chemical treatment',
        fileName: '',
        fileValue: '',
        required: false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'compositionOfPremixColorsFromManufacturer',
        name: 'Composition of premix/Colors from manufacturer',
        fileName: '',
        fileValue: '',
        required: false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'coa',
        name: 'COA',
        fileName: '',
        fileValue: '',
        required: false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'approvalOfThePublicSecurityAuthority',
        name: 'The approval of the public security authority',
        fileName: '',
        fileValue: '',
        required: false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'delegationForImportation',
        name: 'Delegation for importation (Raw Material/Packing Material)',
        fileName: '',
        fileValue: '',
        required: false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'supplyOrder',
        name: 'Supply order (Raw Material/Packing Material)',
        fileName: '',
        fileValue: '',
        required: false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
    ],
    RAW_MATERIAL: [
      {
        id: 'certificateOfOrigin',
        name: 'Certificate Of Origin',
        fileName: '',
        fileValue: '',
        required: false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'companyManufactureRelationship',
        name: 'Company Manufacture Relationship',
        fileName: '',
        fileValue: '',
        required: false,
        enable: false,
        enabledCondition: true,
        relatedWithField: ['RAW_MAT_FOR_LOCAL', 'RAW_MAT_FOR_EXPORT', 'RAW_MAT_IMPORTERS'],
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'materialSafetyDataSheet',
        name: 'Material  Safety Data Sheet',
        fileName: '',
        fileValue: '',
        required: false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'sourceOfRawMaterialAttach',
        name: 'Source of raw material',
        fileName: '',
        fileValue: '',
        required: false,
        requiredWithImportReasonCondition: true,
        enable: false,
        enabledCondition: true,
        relatedWithField: ['RAW_MAT_FOR_LOCAL', 'RAW_MAT_FOR_EXPORT', 'RAW_MAT_IMPORTERS'],
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'declarationOfChemicalTreatment',
        name: 'Declaration of chemical treatment',
        fileName: '',
        fileValue: '',
        required: false,
        enable: false,
        enabledCondition: true,
        relatedWithField: ['RAW_MAT_FOR_LOCAL', 'RAW_MAT_FOR_EXPORT', 'RAW_MAT_IMPORTERS'],
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'legalizedHealthCertificate',
        name: 'legalized Health Certificate',
        fileName: '',
        fileValue: '',
        required: false,
        enable: false,
        enabledCondition: true,
        relatedWithField: ['RAW_MAT_FOR_LOCAL', 'RAW_MAT_FOR_EXPORT', 'RAW_MAT_IMPORTERS'],
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'declarationOfFreeOfSalmonella',
        name: 'Declaration free of salmonella',
        fileName: '',
        fileValue: '',
        required: false,
        enable: false,
        enabledCondition: true,
        relatedWithField: ['RAW_MAT_FOR_LOCAL', 'RAW_MAT_FOR_EXPORT', 'RAW_MAT_IMPORTERS'],
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'compositionOfPremixColorsFromManufacturer',
        name: 'Composition of premix/Colors from manufacturer',
        fileName: '',
        fileValue: '',
        required: false,
        enable: false,
        enabledCondition: true,
        relatedWithField: ['RAW_MAT_FOR_LOCAL'],
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'coa',
        name: 'COA',
        fileName: '',
        fileValue: '',
        required: false,
        requiredWithImportReasonCondition: true,
        enable: false,
        enabledCondition: true,
        relatedWithField: ['RAW_MAT_FOR_LOCAL', 'RAW_MAT_FOR_EXPORT', 'RAW_MAT_IMPORTERS'],
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'approvalOfThePublicSecurityAuthority',
        name: 'The approval of the public security authority ',
        fileName: '',
        fileValue: '',
        required: false,
        requiredWithImportReasonCondition: true,
        enable: false,
        enabledCondition: true,
        relatedWithField: ['RAW_MAT_FOR_LOCAL', 'RAW_MAT_FOR_EXPORT', 'RAW_MAT_IMPORTERS'],
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'delegationForImportation',
        name: 'Delegation for importation (Raw Material/Packing Material)',
        fileName: '',
        fileValue: '',
        required: false,
        requiredWithImportReasonCondition: true,
        enable: false,
        enabledCondition: true,
        relatedWithField: ['RAW_MAT_FOR_LOCAL'],
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'supplyOrder',
        name: 'Supply order (Raw Material/Packing Material)',
        fileName: '',
        fileValue: '',
        required: false,
        requiredWithImportReasonCondition: true,
        enable: false,
        enabledCondition: true,
        relatedWithField: ['RAW_MAT_FOR_LOCAL'],
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
    ],
    PACKING_MATERIALS: [
      {
        id: 'certificateOfOrigin',
        name: 'Certificate Of Origin',
        fileName: '',
        fileValue: '',
        required: false,
        enable: true,
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'delegationForImportation',
        name: 'Delegation for importation (Raw Material/Packing Material)',
        fileName: '',
        fileValue: '',
        required: false,
        requiredWithImportReasonCondition: true,
        enable: false,
        enabledCondition: true,
        relatedWithField: ['PACK_FOR_LOCAL'],
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
      {
        id: 'supplyOrder',
        name: 'Supply order (Raw Material/Packing Material)',
        fileName: '',
        fileValue: '',
        required: false,
        requiredWithImportReasonCondition: true,
        enable: false,
        enabledCondition: true,
        relatedWithField: ['PACK_FOR_LOCAL'],
        attachmentTypeStatus: '',
        loadingStatus: false,
      },
    ],
  };
  currentLang = this.translateService.currentLang ? this.translateService.currentLang : 'en';
  disableItemTypeField: boolean = false;

  constructor(private fb: FormBuilder,
              private number: DecimalPipe,
              private router: Router,
              private route: ActivatedRoute,
              private inputService: InputService,
              public translateService: TranslateService,
              private modalService: BsModalService,
              private getService: FormService) {
    this.route.params.subscribe(res => {
      this.serviceId = res.serviceId;
    })

    this.getFormAsStarting('', '');
    this.getInvoicesFormAsStarting('', '');
    this.getItemsFormAsStarting('', '');
  }

  ngOnInit(): void {
    this.inputService.getInput$().pipe(
      filter(x => x.type === 'allLookups'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.formData = {
        ...res.payload,
        premixNameList: [
          {
            id: 'localFactory',
            name: 'Local factory'
          },
          {
            id: 'premixBatches',
            name: 'Premix Batches'
          }
        ],
        rawMaterialList: [
          {
            id: 'animal',
            name: 'Animal'
          },
          {
            id: 'vegetable',
            name: 'Vegetable'
          },
          {
            id: 'marain',
            name: 'Marain'
          },
          {
            id: 'chemical',
            name: 'Chemical'
          },
          {
            id: 'wool',
            name: 'Wool'
          }
        ],
        packingMaterialList: [
          {
            id: 'animal',
            name: 'Animal'
          },
          {
            id: 'vegetable',
            name: 'Vegetable'
          },
          {
            id: 'marain',
            name: 'Marain'
          },
          {
            id: 'chemical',
            name: 'Chemical'
          },
          {
            id: 'wool',
            name: 'Wool'
          }
        ],
      };
      this.isLoading = false;
    });

    this.inputService.getInput$().pipe(
      filter(x => x.type === 'CompanyId'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.setApplicant(res.payload);
    });

    this.inputService.getInput$().pipe(
      filter(x => x.type === 'currentLang'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.currentLang = res.payload;
    });

    this.inputService.getInput$().pipe(
      filter(x => x.type === 'productServices'),
      distinctUntilChanged()
    ).subscribe(res => {
      res.payload.filter(row => row.id === Number(this.serviceId)).map(item => {
        this.formData.itemTypeList = item.itemTypeList.map(element => {
          return {
            code: element.code,
            id: element.id,
            name: element.name
          }
        });
        this.formData.importReason = item.itemTypeList.map(element => {
          return element.importReasons?.map(result => {
            return {
              code: result.code,
              id: result.id,
              name: result.name
            }
          })
        });
      });

      if (this.formData.itemTypeList.length === 1) {
        this.itemType = this.formData.itemTypeList[0];
        this.disableItemTypeField = true;
        this.getTermType({value: this.formData.itemTypeList[0]});
      }
    });

    this.setAllLookupsInObservable();
  }

  setAllLookupsInObservable() {
    this.filteredOptionsForRequestedReleaseType = this.filterLookupsFunction('releaseType', this.regCustomReleaseForm.get('requestedReleaseType'), this.formData?.releaseType);
    this.filteredOptionsForCustomPortName = this.filterLookupsFunction('ports', this.regCustomReleaseForm.get('customPortName'), this.formData?.ports);
    this.filteredOptionsForSupplierCountry = this.filterLookupsFunction('countries', this.regCustomReleaseForm.get('supplierCountry'), this.formData?.countries);
    this.filteredOptionsForMeasureUnitList = this.filterLookupsFunction('unitOfMeasure', this.regCustomReleaseForm.get('measureUnit'), this.formData?.unitOfMeasure);
    this.filteredOptionsForCurrency = this.filterLookupsFunction('currencies', this.regInvoicesForm.get('currency'), this.formData?.currencies);
  }

  nextToNextTab(whichTab) {
    let activeTabIndex;
    whichTab.tabs.filter(x => x.active).map(y => activeTabIndex = whichTab.tabs.indexOf(y));
    activeTabIndex + 1 <= whichTab.tabs.length - 1 ? whichTab.tabs[activeTabIndex + 1].active = true : null;
  }

  backToNextTab(whichTab) {
    let activeTabIndex;
    whichTab.tabs.filter(x => x.active).map(y => activeTabIndex = whichTab.tabs.indexOf(y));
    activeTabIndex >= 0 ? whichTab.tabs[activeTabIndex - 1].active = true : null;
  }

  async getTermType(event): Promise<any> {
    this.formData.itemTypeList.filter(item => item.id === event.value.id).map(res => {
      this.formData.importReasonList = this.formData.importReason[this.formData.itemTypeList.indexOf(res)]
    })
  }

  setApplicant(companyProfileID) {
    this.formData.applicantList.filter(option => option.ID === companyProfileID).map(x => this.regCustomReleaseForm.patchValue({
      applicant: x.NAME
    }));
  }

  onFileSelect(event, fileControlName) {
    let cardImageBase64;
    let resForSetAttachment;
    let attachmentValue;

    if (this.attachmentFields.filter(x => x.loadingStatus === true).length === 0) {
      if (event.target.files.length > 0) {
        if (event.target.files[0].type === 'application/pdf' && event.target.files[0].size <= 5000000) {
          this.attachmentFields.filter(x => x.id === fileControlName).map(y => {
            y.fileName = event.target.value.split(/(\\|\/)/g).pop();
            attachmentValue = y.fileValue;
          });

          this.attachmentFields.filter(x => x.id === fileControlName).map(file => {
            file.attachmentTypeStatus = 'Yes';
          });
          this.fileStructure = event.target.files[0];
          const reader = new FileReader();

          reader.readAsDataURL(this.fileStructure);
          reader.onload = (res: any) => {
            if (!this.regCustomReleaseForm.value.id) {
              this.handleError('Please save the request first');
              const newAttachmentObject = {
                ...this.regCustomReleaseForm.value,
              };
            } else {
              this.setAttachmentFileFunction(this.regCustomReleaseForm.value.id, fileControlName, this.fileStructure.name, 0, res.target.result, attachmentValue);
            }
          };

        } else {
          this.attachmentFields.filter(x => x.id === fileControlName).map(file => {
            file.attachmentTypeStatus = 'No';
            file.loadingStatus = false;
          });
        }
      }
    }
  }

  setAttachmentFileFunction(requestId, FileID, FileName, id, base64Data, fileValue) {
    const dataForRequest = this.convertDataForAttachmentRequestBody(requestId, FileID, FileName, id, base64Data, fileValue);

    this.attachmentFields.filter(x => x.id === FileID).map(y => {
      y.loadingStatus = true;
    });

    this.getService.setAttachmentFile(dataForRequest).subscribe((res: any) => {
      this.attachmentFields.filter(x => x.id === FileID).map(y => {
        y.fileValue = res.ID;
        y.loadingStatus = false;
        this.regCustomReleaseForm.get(FileID).setValue(res.ID);
      });

      return res;
    }, error => this.handleError(error)); //
  }

  convertDataForAttachmentRequestBody(requestId, FileID, FileName, id, base64Data, fileValue) {
    return {
      RequestId: this.regCustomReleaseForm.value.id,
      AttachmentName: FileID,
      AttachmentFileName: FileName,
      base64Data: base64Data,
      ID: fileValue ? fileValue : id
    };
  }

  downloadFile(FileName) {
    this.getService.getAttachmentFileByID(this.regCustomReleaseForm.value.id, FileName).subscribe((res: any) => {
      this.convertFilesToPDF(res.base64Data, FileName);
    });
  }

  convertFilesToPDF(base64Data, fileName) {
    let obj = document.createElement('object');
    obj.style.width = '100%';
    obj.style.height = '842pt';
    obj.type = 'application/pdf';
    obj.data = 'data:application/pdf;base64,' + base64Data;

    var link = document.createElement('a');
    link.innerHTML = 'Download PDF file';
    link.download = `${fileName}`;
    link.className = 'pdfLink';
    link.href = 'data:application/pdf;base64,' + base64Data;

    link.click();
  }

  setShelfValue(event) {
    if (Number(event.target.value) > 500) {
      this.regCustomReleaseForm.get('grossWeight').patchValue(500);
    } else {
      this.regCustomReleaseForm.get('grossWeight').patchValue(Number(event.target.value));
    }
  }

  getDecimalValue(value, fromWhere) {
    this.regCustomReleaseForm.patchValue({
      receiptValue: this.number.transform(this.regCustomReleaseForm.get('receiptValue').value, '1.2-2')
    }, {emitEvent: false});
  }

  getFormAsStarting(data, fromWhere) {
    if (data) {
    } else {
      this.regCustomReleaseForm = this.fb.group({
        id: 0,
        estimatedValue: 0,
        bol: this.fb.control('', Validators.required),
        withinIncluded: this.fb.control(false),
        requestedReleaseType: this.fb.control('', Validators.required),
        applicant: this.fb.control('', Validators.required),
        customPortName: this.fb.control('', Validators.required),
        pod: this.fb.control(''),
        supplierName: this.fb.control(''),
        supplierCountry: this.fb.control(''),
        carrierName: this.fb.control(''),
        grossWeight: this.fb.control('', Validators.required),
        measureUnit: this.fb.control('', Validators.required),
        receiptNumber: this.fb.control('', Validators.required),
        groupNumber: this.fb.control('', Validators.required),
        receiptValue: this.fb.control('', Validators.required),
        invoiceDetails: [],
        bolPolicy: this.fb.control(''),
        packingList: this.fb.control(''),
        receipt: this.fb.control(''),
        exportPledge: this.fb.control(''),
        importersRecord: this.fb.control(''),
      });
    }
  }

  getInvoicesFormAsStarting(data, fromWhere) {
    if (data) {
    } else {
      this.regInvoicesForm = this.fb.group({
        id: 0,
        invoiceNo: this.fb.control('', Validators.required),
        withinIncluded: this.fb.control(false),
        invoiceValue: this.fb.control('', Validators.required),
        invoiceDate: this.fb.control(null, Validators.required),
        currency: this.fb.control('', Validators.required),
        itemDetails: [],
        invoice: this.fb.control(''),
      });
    }
  }

  getItemsFormAsStarting(data, fromWhere) {
    if (data) {
    } else {
      this.regItemsForm = this.fb.group({
        id: 0,
        itemType: this.fb.control(''),
        importReason: this.fb.control(''),
        NotificationNo: this.fb.control(''),
        shortName: this.fb.control(''),
        ProductEnglishName: this.fb.control('', Validators.required),
        flagType: this.fb.control(''),
        manufacturingCompany: this.fb.control('', Validators.required),
        manufacturingCountry: this.fb.control('', Validators.required),
        batchNo: this.importReason === 'PREMIX' ? this.fb.control('', Validators.required) : this.fb.control(''),
        quantity: this.fb.control('', Validators.required),
        uom: this.fb.control('', Validators.required),
        certificateOfOrigin: this.fb.control(''),
        companyManufactureRelationship: this.fb.control(''),
        legalizedHealthCertificate: this.fb.control(''),
        coa: this.itemType === 'PREMIX' || (this.itemType === 'RAW_MATERIAL' && this.importReason !== 'RAW_MAT_RD') ? this.fb.control('') : this.fb.control(''),
        coc: this.importReason === 'FINISHED_PRDUCTS' ? this.fb.control('') : this.fb.control(''),
        premixName: this.fb.control(''),
        sourceOfRawMaterial: this.fb.control(''),
        ingredient: this.importReason === 'PREMIX' ? this.fb.control('', Validators.required) : this.fb.control(''),
        concentration: this.importReason === 'PREMIX' ? this.fb.control('', Validators.required) : this.fb.control(''),
        function: this.importReason === 'PREMIX' ? this.fb.control('', Validators.required) : this.fb.control(''),
        materialSafetyDataSheet: this.itemType === 'PREMIX' || (this.itemType === 'RAW_MATERIAL' && this.importReason !== 'RAW_MAT_RD') ? this.fb.control('') : this.fb.control(''),
        sourceOfRawMaterialAttach: this.itemType === 'PREMIX' || (this.itemType === 'RAW_MATERIAL' && this.importReason !== 'RAW_MAT_RD') ? this.fb.control('') : this.fb.control(''),
        declarationOfChemicalTreatment: this.fb.control(''),
        compositionOfPremixColorsFromManufacturer: this.importReason === 'PREMIX' ? this.fb.control('') : this.fb.control(''),
        approvalOfThePublicSecurityAuthority: this.itemType === 'PREMIX' || (this.itemType === 'RAW_MATERIAL' && this.importReason !== 'RAW_MAT_RD') ? this.fb.control('') : this.fb.control(''),
        delegationForImportation: this.itemType === 'PREMIX' || (this.itemType === 'RAW_MATERIAL' && this.importReason === 'RAW_MAT_FOR_LOCAL') ? this.fb.control('') : this.fb.control(''),
        supplyOrder: this.itemType === 'PREMIX' || (this.itemType === 'RAW_MATERIAL' && this.importReason === 'RAW_MAT_FOR_LOCAL') ? this.fb.control('') : this.fb.control(''),
        rawMaterialName: this.itemType === 'RAW_MATERIAL' ? this.fb.control('') : this.fb.control(''),
        declarationOfFreeOfSalmonella: this.itemType === 'RAW_MATERIAL' && this.importReason !== 'RAW_MAT_RD' ? this.fb.control('') : this.fb.control(''),
        packingItemName: this.itemType === 'PACKING_MATERIALS' ? this.fb.control('') : this.fb.control(''),
      });
    }
  }

  saveData() {
    console.log('form', this.regInvoicesForm.value);
  }

  onSubmit() {
  }

  onSubmitInvoices() {
    this.hideInvoiceContainer();
  }

  onSubmitItems() {
    if (this.regItemsForm.valid) {
      if (!this.editItemIndex && this.editItemIndex !== 0) {
        this.regInvoicesForm.value.itemDetails.push({...this.regItemsForm.value});
      } else {
        this.regInvoicesForm.get('itemDetails').value[this.editItemIndex] = {
          ...this.regInvoicesForm.get('itemDetails').value[this.editItemIndex],
          ...this.regInvoicesForm.value
        };
        this.editItemRowStatus = false;
        this.editItemIndex = '';
      }

      this.itemListTable.tableBody.push(this.regItemsForm.value);

      this.getItemsFormAsStarting('', '');
    } else {
      this.alertErrorNotificationStatus = true;
      this.alertErrorNotification = {msg: 'please complete the required values which marked with *'};
    }


    this.hideItemContainer();
  }

  onClosed() {
    setTimeout(() => {
      this.alertNotificationStatus = false;
    }, 2000);
  }

  onClosedErrorAlert() {
    setTimeout(() => {
      this.alertErrorNotificationStatus = false;
    }, 2000);
  }

  closeSuccessSubmissionModal() {
    this.modalRef.hide();
  }

  handleError(error) {
    this.alertErrorNotificationStatus = true;
    this.alertErrorNotification = {msg: error};
    this.isLoading = false;
  }

  showInvoiceContainer() {
    this.invoiceContainerDisplayStatus = true;
  }

  showItemContainer() {
    this.itemContainerDisplayStatus = true;
  }

  hideInvoiceContainer() {
    this.invoiceContainerDisplayStatus = false;
  }

  hideItemContainer() {
    this.itemContainerDisplayStatus = false;
  }

  getTheSelectedValueForImportedReason(itemType, event) {
    console.log('event', event.value.code)
    this.isLoading = true;

    setTimeout(() => {
      this.getItemsFormAsStarting('', '');
      this.renderingTheItemAttachment(itemType, event.value);
      this.isLoading = false;
    }, 500);
  }

  renderingTheItemAttachment(itemType, importReason) {
    this.ItemAttachmentFields = this.allItemTypeAttachmentFields[itemType.code].map(item => {
      if (item.requiredWithImportReasonCondition && item.relatedWithField.includes(importReason.code)) {
        item.required = false;
      } else if (item.requiredWithImportReasonCondition && !item.relatedWithField.includes(importReason.code)) {
        item.required = false;
      }

      if (item.enabledCondition && item.relatedWithField.includes(importReason.code)) {
        item.enable = true;
      } else if (item.enabledCondition && !item.relatedWithField.includes(importReason.code)) {
        item.enable = false;
      }

      return item;
    });
  }

  applyProduct(notificationNumber) {

  }

  filterLookupsFunction(whichLookup, formControlValue, list, index?: any) {
    if (whichLookup === 'ingrediant') {
      if (formControlValue) {
        return formControlValue.valueChanges
          .pipe(
            startWith(''),
            debounceTime(30),
            map(state => state ? this.filterInsideList(whichLookup, state, list, index).slice(0, 3000) : list.slice(0, 3000))
          );
      }
    } else {
      if (formControlValue) {
        return formControlValue.valueChanges
          .pipe(
            startWith(''),
            map(state => state ? this.filterInsideList(whichLookup, state, list) : list.slice())
          );
      }
    }
  }

  filterInsideList(lookup, value, list, index?: any): LookupState[] {
    let filterValue;
    if (value) {
      filterValue = value.toLowerCase() ? value.toLowerCase() : '';
    }
    return list.filter(option => option.name[this.currentLang].toLowerCase().includes(filterValue)).map(x => x);
  }
}

export interface AttachemntObject {
  id: string;
  name: string;
  fileName: string;
  fileValue: string;
  required: boolean;
  enable: boolean;
  isCanBeAppealed?: boolean
  attachmentTypeStatus: string;
  loadingStatus: boolean;
}

export interface LookupState {
  code: string;
  description: { en: string, ar: string };
  id: number;
  name: { en: string, ar: string };
}

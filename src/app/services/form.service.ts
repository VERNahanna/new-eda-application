import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError, filter, distinctUntilChanged, tap} from 'rxjs/operators';
import {InputService} from './input.service';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private _isLoggedIn: boolean;
  apiBaseUrl = environment.apiURL;
  secondApiURL = environment.secondApiURL;
  Token;

  // loginAPIURL = environment.loginAPIURL;

  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute,
              private inputService: InputService) {
    this.inputService.getInput$().pipe(
      filter(x => x.type === 'Token'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.Token = res.payload;
    });
  }

  loginAPIToken(data) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    });
    const options = {headers};

    const newStructure = {
      UserName: data.username,
      UserPassword: data.password,
    };

    const JSONData = JSON.stringify(newStructure);

    return this.http.post(`${this.secondApiURL}PortalLogin/Login`, JSONData, options)
      .pipe(
        distinctUntilChanged(),
        tap((res: any) => {
          if (res) {
            this.isLoggedIn = true;
          }
          return res;
        }),
        catchError(this.handleError));
  }

  logoutAPIToken(token) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': token
    });
    const options = {headers};


    return this.http.post(`${this.secondApiURL}PortalLogin/Logout`, {"token": token}, options)
      .pipe(map((res: any) => {
          this.isLoggedIn = false;
          return res;
        }),
        catchError(this.handleError));
  }

  get isLoggedIn() {
    return this._isLoggedIn;
  }

  set isLoggedIn(v) {
    this._isLoggedIn = v;
  }

  getDashboardData() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Lookups/Dashboard`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getAllPortsLookUp() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.secondApiURL}BillOfLading/ports`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getAllInvoiceItemTypes() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.secondApiURL}Invoice/itemTypes`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getAllImportReason() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.secondApiURL}Invoice/importReasons`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getImportReasonByItemId(itemId) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.secondApiURL}Invoice/importReasons/${itemId}`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getCompanyProfiles() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.secondApiURL}Company/GetCompanyProfiles`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getAllDepartmentsInSys() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.secondApiURL}Department/GetDepartmentsData`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getAllIngredient() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.secondApiURL}Item/Ingredients`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getIngredientByRange(start, end) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.secondApiURL}Item​/Ingredients/${start}/${end}`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getAllPackagingList() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.secondApiURL}Item/PackingTypes`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getAllSrcRowMaterial() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.secondApiURL}Item/GetSrcRawMaterials`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getAllProductManufacture() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.secondApiURL}Product/ProductManufacture`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getAllReleaseType() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.secondApiURL}RequestRelease/ReleaseType`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getSharedCountries() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.secondApiURL}Shared/Countries`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getSharedCurrencies() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.secondApiURL}Shared/Currencies`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getAllUnitOfMeasure() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.secondApiURL}Shared/unitsOfMeasurement`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getCompanyProfileLookUp(page, companyProfile, filterText) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Lookups/CompanyProfile?pageNo=${page}&pageSize=15000&companyprofileid=${companyProfile}&searchName=${filterText}`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  createProductRequest(data) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });

    const options = {headers};

    data = JSON.stringify(data);

    return this.http.post(`${this.secondApiURL}Requests/SaveRequest`, data, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getInvoicesByBilOfLanding(bolId) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.secondApiURL}Invoice/InvoicesByBilOfLading/${bolId}`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getIngredientCount(bolId) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.secondApiURL}Item/Ingredients/Count`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getInvoiceItemForView(invoiceId) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.secondApiURL}Item/invoiceItems/${invoiceId}`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getInvoiceApprovedItem(invoiceId, approveNo) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.secondApiURL}Item/invoiceItems/${invoiceId}/${approveNo}`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getRequestDetails(requestId) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.secondApiURL}Requests/${requestId}`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getAllRequest() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.secondApiURL}Requests`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  deleteRequestDetails(requestId) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.secondApiURL}Requests/${requestId}`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  setRequestAsDraft(event) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    const JSONData = JSON.stringify(event);

    return this.http.post(`${this.apiBaseUrl}Requests/SaveRequest`, JSONData, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  setSubmissionRequest(event) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    const JSONData = JSON.stringify(event);

    return this.http.post(`${this.apiBaseUrl}Requests/SubmitRequest`, JSONData, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getRequestCount(companyRoleId) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.secondApiURL}Requests/GetAllRequestsCount/${companyRoleId}`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getAllDraftRequestCount(companyRoleId) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.secondApiURL}RequestRelease/GetDraftRequestReleasForView/${companyRoleId}`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getAllApprovedRequestCount(companyRoleId) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.secondApiURL}Requests/GetApprovedRequestsCount/${companyRoleId}`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getAllRejectedRequestCount(companyRoleId) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.secondApiURL}Requests/GetRejectedRequestsCount/${companyRoleId}`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getAllPendingRequestCount(companyRoleId) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.secondApiURL}Requests/GetPendingRequestsCount​/${companyRoleId}`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getDraftRequestForView(companyRoleId) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.secondApiURL}Requests/GetDraftRequestsForView/${companyRoleId}`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getApprovedRequestForView(companyRoleId) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.secondApiURL}Requests/GetApprovedRequestsForView/${companyRoleId}`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getRejectedRequestForView(companyRoleId) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.secondApiURL}Requests/GetRejectedRequestsForView/${companyRoleId}`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getPendingRequestForView(companyRoleId) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.secondApiURL}Requests/GetPendingRequestsForView/${companyRoleId}`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }


  // getTrackTypeLookUp() {
  //   const headers = new HttpHeaders({
  //     'Content-type': 'application/json',
  //     'Token': this.Token
  //   });
  //   const options = {headers};
  //
  //   return this.http.get(`${this.apiBaseUrl}Lookups/tracktype`, options)
  //     .pipe(map((res: any) => {
  //         return res;
  //       }),
  //       catchError(this.handleError));
  // }
  //
  // getApprovedProductsList() {
  //   const headers = new HttpHeaders({
  //     'Content-type': 'application/json',
  //     'Token': this.Token
  //   });
  //   const options = {headers};
  //
  //   return this.http.get(`${this.apiBaseUrl}Product/GetNotificationList?Type=approved&pageNo=1&pageSize=5000`, options)
  //     .pipe(map((res: any) => {
  //         return res;
  //       }),
  //       catchError(this.handleError));
  // }
  //
  // getApprovedProductsWithCommentsFromLabsList() {
  //   const headers = new HttpHeaders({
  //     'Content-type': 'application/json',
  //     'Token': this.Token
  //   });
  //   const options = {headers};
  //
  //   return this.http.get(`${this.apiBaseUrl}Product/GetNotificationList?Type=flagLab&pageNo=1&pageSize=5000`, options)
  //     .pipe(map((res: any) => {
  //         return res;
  //       }),
  //       catchError(this.handleError));
  // }
  //
  // getApprovedProductsWithCommentsFromRegList() {
  //   const headers = new HttpHeaders({
  //     'Content-type': 'application/json',
  //     'Token': this.Token
  //   });
  //   const options = {headers};
  //
  //   return this.http.get(`${this.apiBaseUrl}Product/GetNotificationList?Type=flagReg&pageNo=1&pageSize=5000`, options)
  //     .pipe(map((res: any) => {
  //         return res;
  //       }),
  //       catchError(this.handleError));
  // }
  //
  // getApprovedProductsWithCommentsFromVariationList() {
  //   const headers = new HttpHeaders({
  //     'Content-type': 'application/json',
  //     'Token': this.Token
  //   });
  //   const options = {headers};
  //
  //   return this.http.get(`${this.apiBaseUrl}Product/GetNotificationList?Type=flagVariation&pageNo=1&pageSize=5000`, options)
  //     .pipe(map((res: any) => {
  //         return res;
  //       }),
  //       catchError(this.handleError));
  // }
  //
  // getApprovedHoldProductsFromLabList() {
  //   const headers = new HttpHeaders({
  //     'Content-type': 'application/json',
  //     'Token': this.Token
  //   });
  //   const options = {headers};
  //
  //   return this.http.get(`${this.apiBaseUrl}Product/GetNotificationList?Type=holdLab&pageNo=1&pageSize=5000`, options)
  //     .pipe(map((res: any) => {
  //         return res;
  //       }),
  //       catchError(this.handleError));
  // }
  //
  // getApprovedHoldProductsFromRegList() {
  //   const headers = new HttpHeaders({
  //     'Content-type': 'application/json',
  //     'Token': this.Token
  //   });
  //   const options = {headers};
  //
  //   return this.http.get(`${this.apiBaseUrl}Product/GetNotificationList?Type=holdReg&pageNo=1&pageSize=5000`, options)
  //     .pipe(map((res: any) => {
  //         return res;
  //       }),
  //       catchError(this.handleError));
  // }
  //
  // getApprovedHoldProductsFromVariationList() {
  //   const headers = new HttpHeaders({
  //     'Content-type': 'application/json',
  //     'Token': this.Token
  //   });
  //   const options = {headers};
  //
  //   return this.http.get(`${this.apiBaseUrl}Product/GetNotificationList?Type=holdVariation&pageNo=1&pageSize=5000`, options)
  //     .pipe(map((res: any) => {
  //         return res;
  //       }),
  //       catchError(this.handleError));
  // }
  //
  getNotificationLogsList() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}Lookups/notificationlog`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  setSeenNotificationByID(id) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.post(`${this.apiBaseUrl}product/SeenNotificaion?id=${id}`, {}, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  setAttachmentFile(event) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    const JSONData = JSON.stringify(event);

    return this.http.post(`${this.apiBaseUrl}product/UploadAttachment`, JSONData, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  getAttachmentFileByID(requestID, attachmentName) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Token': this.Token
    });
    const options = {headers};

    return this.http.get(`${this.apiBaseUrl}product/GetAttachment?requestId=${requestID}&attachmentName=${attachmentName}`, options)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
  }

  //
  // getVariablesPricesLookUp() {
  //   const headers = new HttpHeaders({
  //     'Content-type': 'application/json',
  //     'Token': this.Token
  //   });
  //   const options = {headers};
  //
  //   return this.http.get(`${this.apiBaseUrl}Lookups/variables`, options)
  //     .pipe(map((res: any) => {
  //         return res;
  //       }),
  //       catchError(this.handleError));
  // }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      setTimeout(() => {
        location.reload();
      }, 1500);


      return throwError(`Error! Please login again`);
    } else {
      return throwError(`Error! ${error.error.StatusMessage ? error.error.StatusMessage : error.error}`);
    }
  }
}

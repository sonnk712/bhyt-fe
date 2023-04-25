import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import { ChangePasswordRequest, ChangePasswordResponse, CustomerUpdateResponse, RequestUpdateCusInfo } from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) { }


  updateCustomerInfo(request: RequestUpdateCusInfo):Observable<CustomerUpdateResponse> {
    return this.http.post<CustomerUpdateResponse>(`${environment.baseUrl}${environment.basePath}/account/update-info`, request);
  }

  verifyAccount(request: RequestUpdateCusInfo):Observable<CustomerUpdateResponse> {
    return this.http.post<CustomerUpdateResponse>(`${environment.baseUrl}${environment.basePath}/user/verify-otp`, request);
  }

  changePassword(request: ChangePasswordRequest): Observable<ChangePasswordResponse> {
    const formRequest = new FormData();
    formRequest.append('username', request.username);
    formRequest.append('newPassword', request.newPassword);
    formRequest.append('oldPassword', request.oldPassword);
    formRequest.append('confirmNewPassword', request.confirmNewPassword);
    return this.http.post<ChangePasswordResponse>(`${environment.baseUrl}${environment.basePath}/account/change-password`, formRequest);
  }
}

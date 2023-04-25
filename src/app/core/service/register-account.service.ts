import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {
  ActiveAccountRequest,
  RegisterAccountRequest,
  RegisterAccountResponse,
  ValidateEmailRequest,
  ValidatePhoneRequest,
  ValidateUserNameRequest
} from "../model/register-account";

@Injectable({
  providedIn: 'root'
})
export class RegisterAccountService {

  constructor(private http: HttpClient) { }

  validateEmail(request: ValidateEmailRequest): Observable<RegisterAccountResponse> {
    const formRequest = new FormData();
    formRequest.append('email', request.email);
    return this.http.post<RegisterAccountResponse>(`${environment.baseUrl}${environment.basePath}/account/validate-email`, formRequest);
  }

  validatePhone(request: ValidatePhoneRequest): Observable<RegisterAccountResponse> {
    const formRequest = new FormData();
    formRequest.append('phoneNumber', request.phoneNumber);
    return this.http.post<RegisterAccountResponse>(`${environment.baseUrl}${environment.basePath}/account/validate-phone`, formRequest);
  }

  validateUserName(request: ValidateUserNameRequest): Observable<RegisterAccountResponse> {
    const formRequest = new FormData();
    formRequest.append('username', request.username);
    return this.http.post<RegisterAccountResponse>(`${environment.baseUrl}${environment.basePath}/account/validate-username`, formRequest);
  }

  registerAccount(request: RegisterAccountRequest): Observable<RegisterAccountResponse> {
    return this.http.post<RegisterAccountResponse>(`${environment.baseUrl}${environment.basePath}/auth/register`, request);
  }

  activeAccount(request: ActiveAccountRequest) : Observable<RegisterAccountResponse> {
    const formRequest = new FormData();
    formRequest.append('token', request.token);
    return this.http.post<RegisterAccountResponse>(`${environment.baseUrl}${environment.basePath}/account/active-account`, formRequest);
  }
}

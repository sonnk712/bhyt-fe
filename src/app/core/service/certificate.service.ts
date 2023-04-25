import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';
import {
  CancelConfirmRequest,
  ConfirmResultResponse,
  ConfirmRequest,
  RaDataConfirmRequest,
  RaDataConfirmResponse,
  RaDetailRequest,
  RaDetailResponse,
  RaInitApproveRequest,
  RaInitApproveResponse,
  RaInitExtendRequest,
  RaInitExtendResponse,
  RaListRequest,
  RaStatusResponse,
  ReasonConfirmResponse,
  ReListResponse,
  ConfirmApproveRequest,
  CertificateTypeResponse,
  AgencyComboboxResponse, ServicePackageResponse, GenKeyRequest, GenKeyInfo, GenKeyResponse, GenKeyHSMRequest, GenKeyHSMResponse, GenKeyTokenResponse
} from '../model/certificate';
import {GenerateOtpForgotPassRequest, GenerateOtpResponse} from '../model/auth';
import {
  CertCaResponse,
  CertInfoArticleRequest, CertInfoArticleResponse,
  CertInfoProfileRequest, CertInfoProfileResponse, CreateCertRequest, CreateCertResponse,
  ServicePackageInfoRequest,
  ServicePackageInfoResponse, ServicePackagesRequest,
  ServicePackagesResponse
} from "../model/register-cert";
import { CurrentUserByEmailRequest, IdentityTypeResponse} from '../model/account';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(private http: HttpClient) { }

  /**
   * certificate pending to approve
   */
  searchApprove(request: RaListRequest): Observable<ReListResponse> {
    return this.http.post<ReListResponse>(`${environment.baseUrl}${environment.basePath}/certificate/filter-admin-approve`, request);
  }

  /**
   * certificate was approved
   */
  searchRequest(request: RaListRequest): Observable<ReListResponse> {
    return this.http.post<ReListResponse>(`${environment.baseUrl}${environment.basePath}/certificate/filter-admin-request`, request);
  }

  /**
   * @deprecated use searchApproved and searchRequest instead
   */
  search(request: RaListRequest): Observable<ReListResponse> {
    return this.http.post<ReListResponse>(`${environment.baseUrl}${environment.basePath}/certificate/filter-admin`, request);
  }

  statusList(): Observable<RaStatusResponse> {
    return this.http.get<RaStatusResponse>(`${environment.baseUrl}${environment.basePath}/certificate/status-admin`);
  }

  detail(request: RaDetailRequest): Observable<RaDetailResponse> {
    return this.http.post<RaDetailResponse>(`${environment.baseUrl}${environment.basePath}/certificate/detail`, request);
  }

  generateOtpForgotPass(request: GenerateOtpForgotPassRequest): Observable<GenerateOtpResponse> {
    const formRequest = new FormData();
    formRequest.append('email', request.email);
    return this.http.post<GenerateOtpResponse>(`${environment.baseUrl}${environment.basePath}/otp/generate-forgot-password`, formRequest);
  }

  dataNeedConfirm(request: RaDataConfirmRequest): Observable<RaDataConfirmResponse> {
    return this.http.post<RaDataConfirmResponse>(`${environment.baseUrl}${environment.basePath}/certificate/list-confirm-info`, request);
  }

  requestExtend(request: RaInitExtendRequest): Observable<RaInitExtendResponse> {
    return this.http.post<RaInitExtendResponse>(`${environment.baseUrl}${environment.basePath}/certificate/send-extend`, request);
  }

  cancelConfirm(request: CancelConfirmRequest): Observable<ConfirmResultResponse> {
    return this.http.post<ConfirmResultResponse>(`${environment.baseUrl}${environment.basePath}/certificate/cancel`, request);
  }

  confirmExtend(request: ConfirmRequest): Observable<ConfirmResultResponse> {
    return this.http.post<ConfirmResultResponse>(`${environment.baseUrl}${environment.basePath}/certificate/extend-admin`, request);
  }

  reason(): Observable<ReasonConfirmResponse> {
    return this.http.get<ReasonConfirmResponse>(`${environment.baseUrl}${environment.basePath}/reason/combobox`);
  }

  requestApprove(request: RaInitApproveRequest): Observable<RaInitApproveResponse> {
    return this.http.post<RaInitApproveResponse>(`${environment.baseUrl}${environment.basePath}/certificate/send-approve`, request);
  }

  confirmApprove(request: ConfirmApproveRequest): Observable<ConfirmResultResponse> {
    return this.http.post<ConfirmResultResponse>(`${environment.baseUrl}${environment.basePath}/certificate/approve`, request);
  }


  getListServicePackage(request: ServicePackagesRequest): Observable<ServicePackagesResponse> {
    return this.http.post<ServicePackagesResponse>(`${environment.baseUrl}${environment.basePath}/service-package-v2/combobox`, request);
  }

  getServicePackageInfo(request: ServicePackageInfoRequest): Observable<ServicePackageInfoResponse> {
    return this.http.post<ServicePackageInfoResponse>(`${environment.baseUrl}${environment.basePath}/certificate/info-cert-type`, request);
  }

  getCertInfoProfile(request: CertInfoProfileRequest): Observable<CertInfoProfileResponse> {
    return this.http.post<CertInfoProfileResponse>(`${environment.baseUrl}${environment.basePath}/certificate/info-profile`, request);
  }

  getCertInfoArticle(request: CertInfoArticleRequest): Observable<CertInfoArticleResponse> {
    return this.http.post<CertInfoArticleResponse>(`${environment.baseUrl}${environment.basePath}/certificate/info-article`, request);
  }

  createCertificate(request: CreateCertRequest): Observable<CreateCertResponse> {
    return this.http.post<CreateCertResponse>(`${environment.baseUrl}${environment.basePath}/certificate/create-admin`, request);
  }

  confirmReject(request: ConfirmRequest): Observable<ConfirmResultResponse> {
    return this.http.post<ConfirmResultResponse>(`${environment.baseUrl}${environment.basePath}/certificate/reject`, request);
  }

  confirmActive(request: ConfirmRequest): Observable<ConfirmResultResponse> {
    return this.http.post<ConfirmResultResponse>(`${environment.baseUrl}${environment.basePath}/certificate/resumes`, request);
  }

  confirmPause(request: ConfirmRequest): Observable<ConfirmResultResponse> {
    return this.http.post<ConfirmResultResponse>(`${environment.baseUrl}${environment.basePath}/certificate/suspended`, request);
  }

  confirmEvict(request: ConfirmRequest): Observable<ConfirmResultResponse> {
    return this.http.post<ConfirmResultResponse>(`${environment.baseUrl}${environment.basePath}/certificate/revoke`, request);
  }

  getListCertCA(): Observable<CertCaResponse> {
    return this.http.get<CertCaResponse>(`${environment.baseUrl}${environment.basePath}/cer-ca/combobox`);
  }

  getCertificateTypeCombobox(): Observable<CertificateTypeResponse> {
    return this.http.get<CertificateTypeResponse>(`${environment.baseUrl}${environment.basePath}/article/combobox`);
  }

  getAgencyCombobox(): Observable<AgencyComboboxResponse> {
    return this.http.get<AgencyComboboxResponse>(`${environment.baseUrl}${environment.basePath}/agency/combobox`);
  }

  getServicePackageCombobox(): Observable<ServicePackageResponse> {
    return this.http.get<ServicePackageResponse>(`${environment.baseUrl}${environment.basePath}/service-package/for-combobox`);
  }
  generateKeyHSM(request: GenKeyHSMRequest): Observable<GenKeyHSMResponse> {
    return this.http.post<GenKeyHSMResponse>(`${environment.baseUrl}${environment.basePath}/certificate/genKeyAndCsr`, request);
  }
  generateKeyToken(request: any): Observable<any> {
    return this.http.post<GenKeyTokenResponse>(`${environment.genKeyUrl}${environment.genKeyPath}/keys-and-csr/generate`, request);
  }
  getIdentityTypeByEmail(request: CurrentUserByEmailRequest): Observable<IdentityTypeResponse> {
    return this.http.post<IdentityTypeResponse>(`${environment.baseUrl}${environment.basePath}/account/current-user-by-email`, request);
  }
}

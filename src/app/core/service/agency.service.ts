import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AgencyDetailResponse, AgencyRequest, AgencyRequestSearch, AgencyRequestSearchV2, AgencyRequestV2, AgencyResponse, AgencyResponseV2 } from '../model/agency';
import { FileUploadResponse } from '../model/media';
import { DeleteRequest } from '../model/certificate-authority';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  constructor(private http: HttpClient) { }

  // upload
  uploadFileProfile(request: FormData): Observable<FileUploadResponse> {
    return this.http.post<FileUploadResponse>(`${environment.baseUrl}${environment.basePath}/file/upload`, request);
  }
  // lấy danh sách
  getAgencyInfo(): Observable<AgencyResponse> {
    return this.http.get<AgencyResponse>(`${environment.baseUrl}${environment.basePath}/agency/combobox`);
  }

  getAgencyInfoV2(): Observable<AgencyResponseV2> {
    return this.http.get<AgencyResponseV2>(`${environment.baseUrl}${environment.basePath}/agency/combobox`);
  }

  // search dữ liệu
  search(request: AgencyRequestSearch): Observable<AgencyResponse> {
    return this.http.post<AgencyResponse>(`${environment.baseUrl}${environment.basePath}/agency/filter`, request);
  }

  searchV2(request: AgencyRequestSearchV2): Observable<AgencyResponseV2> {
    return this.http.post<AgencyResponseV2>(`${environment.baseUrl}${environment.basePath}/agency/filter`, request);
  }
  // tạo mới
  createAgency(request: AgencyRequest): Observable<AgencyResponse> {
    return this.http.post<AgencyResponse>(`${environment.baseUrl}${environment.basePath}/agency`, request);
  }

  createAgencyV2(request: AgencyRequestV2): Observable<AgencyResponseV2> {
    return this.http.post<AgencyResponseV2>(`${environment.baseUrl}${environment.basePath}/agency/create`, request);
  }
  // lấy chi tiết
  detailAgency(id: string): Observable<AgencyDetailResponse> {
    return this.http.post<AgencyDetailResponse>(`${environment.baseUrl}${environment.basePath}/agency/detail`, { id });
  }
  // update dữ liệu
  updateAgency(request: any): Observable<AgencyDetailResponse> {
    return this.http.put<AgencyDetailResponse>(`${environment.baseUrl}${environment.basePath}/agency`, request);
  }

  delete(request: DeleteRequest): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}${environment.basePath}/agency/delete`, request);
  }

  getAll(): Observable<AgencyResponseV2> {
    return this.http.get<AgencyResponseV2>(`${environment.baseUrl}${environment.basePath}/agency/all`);
  }
}

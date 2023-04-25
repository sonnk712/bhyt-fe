import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListId, ListServicePackageCombobox, RequestSearch, ServicePackageDetailResponse, ServicePackageListResponse, ServicePackageRequest } from '../model/service-package';

@Injectable({
  providedIn: 'root'
})
export class ServicePackageService {

  constructor(private http: HttpClient) { }
    // lấy danh sách
    getInfo(): Observable<ListServicePackageCombobox> {
      return this.http.get<any>(`${environment.baseUrl}${environment.basePath}/service-package-v2/combobox`);
    }
    // search dữ liệu
    search(request: RequestSearch): Observable<ServicePackageListResponse> {
      return this.http.post<ServicePackageListResponse>(`${environment.baseUrl}${environment.basePath}/service-package-v2/filter`, request);
    }
    // tạo mới
    create(request: ServicePackageRequest): Observable<any> {
      return this.http.post<any>(`${environment.baseUrl}${environment.basePath}/service-package-v2/create`, request);
    }
    // lấy chi tiết
    detail(id: string): Observable<ServicePackageDetailResponse> {
      return this.http.post<ServicePackageDetailResponse>(`${environment.baseUrl}${environment.basePath}/service-package-v2/detail`, { id });
    }
    // update dữ liệu
    update(request: ServicePackageRequest): Observable<any> {
      return this.http.put<any>(`${environment.baseUrl}${environment.basePath}/service-package-v2/update`, request);
    }
    //xóa
    delete(listId: ListId): Observable<any> {
      return this.http.post<any>(`${environment.baseUrl}${environment.basePath}/service-package-v2/delete`, listId);
    }
    //
    getCa(): Observable<any> {
      return this.http.get<any>(`${environment.baseUrl}${environment.basePath}/cer-ca/combobox`);
    }
    //
    getTime(): Observable<any> {
      return this.http.get<any>(`${environment.baseUrl}${environment.basePath}/cerTime/getTimeCert`);
    }
    //
    getForm(): Observable<any> {
      return this.http.get<any>(`${environment.baseUrl}${environment.basePath}/form/combobox`);
    }
    //
    getCertTimeByAgency(agencyCode: string): Observable<any> {
      return this.http.post<any>(`${environment.baseUrl}${environment.basePath}/service-package-v2/getTimeByAgency`, {agencyCode});
    }
    //
    getAlgorithm(): Observable<any> {
      return this.http.get<any>(`${environment.baseUrl}${environment.basePath}/algorithm/combobox`);
    }
  
}

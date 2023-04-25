import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormInformationRequestSearch, FormInformationResponse, FormInformationRequest, FormInformationCreateRequest, ListId, ListFormInformationResponse } from '../model/form-information';

@Injectable({
  providedIn: 'root'
})
export class FormInformationService {

  constructor(private http: HttpClient) { }
     // lấy danh sách
     getFormInformationInfo(): Observable<ListFormInformationResponse> {
      return this.http.get<ListFormInformationResponse>(`${environment.baseUrl}${environment.basePath}/form-information/combobox`);
    }
    // search dữ liệu
    search(request: FormInformationRequestSearch): Observable<FormInformationResponse> {
      return this.http.post<FormInformationResponse>(`${environment.baseUrl}${environment.basePath}/form-information/filter`, request);
    }
    // tạo mới
    createFormInformation(request: FormInformationCreateRequest): Observable<FormInformationResponse> {
      return this.http.post<FormInformationResponse>(`${environment.baseUrl}${environment.basePath}/form-information/create`, request);
    }
    // lấy chi tiết
    detailFormInformation(id: string): Observable<FormInformationResponse> {
      return this.http.post<FormInformationResponse>(`${environment.baseUrl}${environment.basePath}/form-information/detail`, { id });
    }
    // update dữ liệu
    updateFormInformation(request: FormInformationRequest): Observable<FormInformationResponse> {
      return this.http.put<FormInformationResponse>(`${environment.baseUrl}${environment.basePath}/form-information/update`, request);
    }
    //xóa
    deleteFormInformation(listId: ListId): Observable<FormInformationResponse> {
      return this.http.post<FormInformationResponse>(`${environment.baseUrl}${environment.basePath}/form-information/delete`, listId);
    }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormRequestSearch, FormCreateRequest, ListId, FormFilterResponse, FormDetail, ListForm, FormDetailResponse, FormUpdate } from '../model/form';
@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }
    // lấy danh sách
    getFormInfo(): Observable<ListForm> {
      return this.http.get<any>(`${environment.baseUrl}${environment.basePath}/form/combobox`);
    }
    // search dữ liệu
    search(request: FormRequestSearch): Observable<FormFilterResponse> {
      return this.http.post<FormFilterResponse>(`${environment.baseUrl}${environment.basePath}/form/filter`, request);
    }
    // tạo mới
    createForm(request: FormCreateRequest): Observable<FormDetailResponse> {
      return this.http.post<FormDetailResponse>(`${environment.baseUrl}${environment.basePath}/form/create`, request);
    }
    // lấy chi tiết
    detailForm(id: string): Observable<FormDetailResponse> {
      return this.http.post<FormDetailResponse>(`${environment.baseUrl}${environment.basePath}/form/detail`, { id });
    }
    // update dữ liệu
    updateForm(request: FormUpdate): Observable<FormDetailResponse> {
      return this.http.put<FormDetailResponse>(`${environment.baseUrl}${environment.basePath}/form/update`, request);
    }
    //xóa
    deleteForm(listId: ListId): Observable<FormDetailResponse> {
      return this.http.post<FormDetailResponse>(`${environment.baseUrl}${environment.basePath}/form/delete`, listId);
    }
  
}

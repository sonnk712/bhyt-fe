import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AgencyResponse } from '../model/agency';
import { AlgorithmRequest, AlgorithmRequestSearch, AlgorithmResponse } from '../model/algorithm';
import { CaRequest, CaRequestSearch, CaResponse, DeleteRequest } from '../model/certificate-authority';
import { FileUploadResponse } from '../model/media';

@Injectable({
    providedIn: 'root'
  })
  export class CaService {
  
    constructor(private http: HttpClient) { }
  
    // lấy danh sách
    getCaInfo(): Observable<CaResponse> {
      return this.http.get<CaResponse>(`${environment.baseUrl}${environment.basePath}/cer-ca/combobox`);
    }
    // search dữ liệu
    search(request: CaRequestSearch): Observable<CaResponse> {
      return this.http.post<CaResponse>(`${environment.baseUrl}${environment.basePath}/cer-ca/filter`, request);
    }
    // tạo mới
    createCa(request: CaRequest): Observable<CaResponse> {
      return this.http.post<CaResponse>(`${environment.baseUrl}${environment.basePath}/cer-ca/create`, request);
    }
    // lấy chi tiết
    detailCa(id: string): Observable<CaResponse> {
      return this.http.post<CaResponse>(`${environment.baseUrl}${environment.basePath}/cer-ca/detail`, { id });
    }
    // update dữ liệu
    updateCa(request: any): Observable<CaResponse> {
      return this.http.put<CaResponse>(`${environment.baseUrl}${environment.basePath}/cer-ca/update`, request);
    }
    deleteCa(listId: DeleteRequest): Observable<any>{
      return this.http.post<any>(`${environment.baseUrl}${environment.basePath}/cer-ca/delete`, listId)
    }
  }
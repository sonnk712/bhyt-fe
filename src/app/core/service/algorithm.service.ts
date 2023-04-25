import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlgorithmRequest, AlgorithmRequestSearch, AlgorithmResponse } from '../model/algorithm';

@Injectable({
    providedIn: 'root'
  })
  export class AlgorithmService {
  
    constructor(private http: HttpClient) { }
  
    // // upload
    // uploadFileProfile(request: FormData): Observable<FileUploadResponse> {
    //   return this.http.post<FileUploadResponse>(`${environment.baseUrl}${environment.basePath}/file/upload`, request);
    // }
    // lấy danh sách
    getAlgorithmInfo(): Observable<AlgorithmResponse> {
      return this.http.get<AlgorithmResponse>(`${environment.baseUrl}${environment.basePath}/algorithm/combobox`);
    }
    // search dữ liệu
    search(request: AlgorithmRequestSearch): Observable<AlgorithmResponse> {
      return this.http.post<AlgorithmResponse>(`${environment.baseUrl}${environment.basePath}/algorithm/filterV2`, request);
    }
    // tạo mới
    createAlgorithm(request: AlgorithmRequest): Observable<AlgorithmResponse> {
      return this.http.post<AlgorithmResponse>(`${environment.baseUrl}${environment.basePath}/algorithm`, request);
    }
    // lấy chi tiết
    detailAlgorithm(id: string): Observable<AlgorithmResponse> {
      return this.http.post<AlgorithmResponse>(`${environment.baseUrl}${environment.basePath}/algorithm/detail`, { id });
    }
    // // update dữ liệu
    // updateAgency(request: any): Observable<AgencyResponse> {
    //   return this.http.put<AgencyResponse>(`${environment.baseUrl}${environment.basePath}/agency`, request);
    // }
  }
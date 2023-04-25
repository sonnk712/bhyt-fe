import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {FileUploadResponse} from '../model/media';
import {DownloadCertRequest, DownloadCertResponse} from '../model/register-cert';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http: HttpClient) { }

  uploadFile(request: FormData): Observable<FileUploadResponse> {
    return this.http.post<FileUploadResponse>(`${environment.baseUrl}${environment.basePath}/file/upload`, request);
  }

  downloadCert(request: DownloadCertRequest): Observable<DownloadCertResponse> {
    const params: HttpParams = new HttpParams().append('id', request.id);
    return this.http.post<DownloadCertResponse>(`${environment.baseUrl}${environment.basePath}/file/download-cert`, undefined, {params});
  }
}

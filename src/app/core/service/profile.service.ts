import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProfileResponse, ProfileResponseV2, TypeRequestSearch } from '../model/profile';
import { DeleteRequest } from '../model/certificate-authority';


@Injectable({
    providedIn: 'root'
  })
export class ProfileService {
    constructor(private http: HttpClient) { }

    search(request: TypeRequestSearch): Observable<ProfileResponse> {
        return this.http.post<ProfileResponse>(`${environment.baseUrl}${environment.basePath}/profile/filter`, request);
    }
    
    getAll(): Observable<ProfileResponseV2> {
    return this.http.get<ProfileResponseV2>(`${environment.baseUrl}${environment.basePath}/profile/all`);
    }

    delete(request: DeleteRequest): Observable<any> {
        return this.http.post<any>(`${environment.baseUrl}${environment.basePath}/agency/delete`, request);
    }
}
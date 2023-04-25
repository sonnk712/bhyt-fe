import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CostUnitInfomationResponse, CountryResponse, DistrictComboboxRequest, DistrictResponse, PeriodInfomationResponse, PeriodResponse, PeriodSearchRequest, PeriodTextSearch, ProvineResponse, ProvineResponseV2, TypeResponse, TypeSearchRequest, WardComboboxRequest, WardResponse } from '../model/place';
import { ProfileResponse, ProfileResponseV2 } from '../model/profile';
import { StatusSearchRequest } from '../model/place';
import { DeleteRequest } from '../model/certificate-authority';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  // constructor(private http: HttpClient) { }
  // getCountry(): Observable<CountryResponse> {
  //   return this.http.get<CountryResponse>(`${environment.baseUrl}${environment.basePath}/country/combobox`);
  // }

  // getProvince(): Observable<ProvineResponse> {
  //   return this.http.get<ProvineResponse>(`${environment.baseUrl}${environment.basePath}/province/combobox`);
  // }

  constructor(private http: HttpClient) { }
  getCountry(): Observable<CountryResponse> {
    return this.http.get<CountryResponse>(`${environment.baseUrl}${environment.basePath}/country/combobox`);
  }

  getProvince(): Observable<ProvineResponse> {
    return this.http.get<ProvineResponse>(`${environment.baseUrl}${environment.basePath}/province/combobox`);
  }

  getProvinceV2(): Observable<ProvineResponseV2> {
    return this.http.get<ProvineResponseV2>(`${environment.baseUrl}${environment.basePath}/place/province`);
  }

  getDistrictFromCity(request: DistrictComboboxRequest): Observable<DistrictResponse> {
    return this.http.post<DistrictResponse>(`${environment.baseUrl}${environment.basePath}/place/district-by-province`, request);
  }

  getWardFromDistrict(request: WardComboboxRequest): Observable<WardResponse> {
    return this.http.post<WardResponse>(`${environment.baseUrl}${environment.basePath}/place/ward-by-district`, request);
  }

  getPeriod(): Observable<PeriodResponse> {
    return this.http.get<PeriodResponse>(`${environment.baseUrl}${environment.basePath}/period/combobox`);
  }

  getType(): Observable<TypeResponse> {
    return this.http.get<TypeResponse>(`${environment.baseUrl}${environment.basePath}/type/combobox`);
  }

  searchByPeriod(request: PeriodSearchRequest): Observable<ProfileResponseV2> {
    return this.http.post<ProfileResponseV2>(`${environment.baseUrl}${environment.basePath}/profile/filter-by-period`, request);
  }

  searchByType(request: TypeSearchRequest): Observable<ProfileResponseV2> {
    return this.http.post<ProfileResponseV2>(`${environment.baseUrl}${environment.basePath}/profile/filter-by-type`, request);
  }

  searchByStatus(request: StatusSearchRequest): Observable<ProfileResponseV2> {
    return this.http.post<ProfileResponseV2>(`${environment.baseUrl}${environment.basePath}/profile/filter-by-status`, request);
  }

  //period
  periodSearch(request: PeriodTextSearch): Observable<PeriodInfomationResponse> {
    return this.http.post<PeriodInfomationResponse>(`${environment.baseUrl}${environment.basePath}/period/filter`, request);
  }

  periodDelete(request: DeleteRequest): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}${environment.basePath}/period/delete`, request);
  }

  periodCreate(request: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}${environment.basePath}/period/create`, request);
  }

  periodUpdate(request: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}${environment.basePath}/period/update`, request);
  }

  periodDetail(id : string): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}${environment.basePath}/period/detail`, { id });
  }

  //cost unit
  costUnitSearch(request: PeriodTextSearch): Observable<CostUnitInfomationResponse> {
    return this.http.post<CostUnitInfomationResponse>(`${environment.baseUrl}${environment.basePath}/charge-unit/filter`, request);
  }

  costUnitDelete(request: DeleteRequest): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}${environment.basePath}/charge-unit/delete`, request);
  }

  costUnitCreate(request: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}${environment.basePath}/charge-unit/create`, request);
  }

  costUnitUpdate(request: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}${environment.basePath}/charge-unit/update`, request);
  }

  costUnitDetail(id : string): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}${environment.basePath}/charge-unit/detail`, { id });
  }

}

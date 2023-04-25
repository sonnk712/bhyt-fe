import { Injectable } from '@angular/core';
import {DataSearchStatisticRequest, DataSearchStatisticResponse} from "../model/ra-statistic";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RaStatisticService {

  constructor(private http: HttpClient) { }

  getDataStatistic(request: DataSearchStatisticRequest, page: number, size: number): Observable<DataSearchStatisticResponse> {
    return this.http.post<DataSearchStatisticResponse>(`${environment.baseUrl}${environment.basePath}/report-admin/?page=` + page + 
    '&size=' + size, request);
  }
}

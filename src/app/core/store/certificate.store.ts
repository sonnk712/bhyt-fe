import { Injectable } from '@angular/core';
import { CertificateService } from '../service/certificate.service';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ApiState } from '../model/common';
import {
  CancelConfirmRequest,
  Certificate,
  CONFIRM_PATH,
  CONFIRM_TYPE,
  ConfirmApproveRequest,
  ConfirmByBatchRequest,
  ConfirmRequest,
  RA_MANAGE_PATH,
  RaDataConfirm,
  RaDetail,
  RaDetailRequest,
  RaInfo,
  RaInitApproveRequest,
  RaInitExtendRequest,
  RaListRequest,
  RaStatus,
  RaStatusEnum,
  ReasonConfirm
} from '../model/certificate';
import { Params, Router } from '@angular/router';
import { GenerateOtpForgotPassRequest, OtpInformation } from '../model/auth';
import { environment } from '../../../environments/environment';
import { MessageService } from 'primeng/api';
import { MediaService } from '../service/media.service';
import { FileInfo } from '../model/media';

export interface CertificateState {
  raSearchResult: RaInfo[];
  totalRaItems: number;
  raSearchState: ApiState;
  raStatus: RaStatus[];
  raStatusState: ApiState;
  raDetailState: ApiState;
  raDetail: RaDetail;
  raConfirmState: ApiState;
  raDataConfirm: RaDataConfirm[];
  generatedOtp: OtpInformation;
  amountRenewOtp: number;
  batchExtendItems: RaInfo[];
  reasonConfirm: ReasonConfirm[];
  isCallApiOnCancel: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CertificateStore extends ComponentStore<CertificateState> {
  constructor(
    private service: CertificateService,
    private router: Router,
    private messageService: MessageService,
    private mediaService: MediaService
  ) {
    super(<CertificateState>{
      raSearchResult: [] as RaInfo[],
      totalRaItems: 0,
      raSearchState: ApiState.PENDING,
      raStatus: [{status: RaStatusEnum.ALL, description: 'Tất cả'}],
      raStatusState: ApiState.PENDING,
      raDetailState: ApiState.PENDING,
      amountRenewOtp: environment.amountRenewOtpMax,
      batchExtendItems: [] as RaInfo[],
      isCallApiOnCancel: false
    });
  }

  readonly raSearchResult$ = this.select((state) => state.raSearchResult);
  readonly raSearchLoading$ = this.select((state) => state.raSearchState === ApiState.LOADING);
  readonly raDetail$ = this.select((state) => state.raDetail).pipe(
    filter((detail) => !!detail)
  );
  readonly detailLoading$ = this.select((state) => state.raDetailState === ApiState.LOADING);

  readonly amountRenewOtp$ = this.select((state) => state.amountRenewOtp);
  readonly generatedOtp$ = this.select((state) => state.generatedOtp);
  readonly generatedOtpRemaining$ = this.select((state) => state.generatedOtp).pipe(
    filter((otp) => !!otp),
    map((otp) => otp.remainingSeconds)
  );
  readonly raDataConfirm$ = this.select((state) => state.raDataConfirm);
  readonly confirmLoading$ = this.select((state) => state.raConfirmState === ApiState.LOADING);
  readonly batchExtendItems$ = this.select((state) => state.batchExtendItems);
  readonly reasonConfirm$ = this.select((state) => state.reasonConfirm);
  readonly isCallApiOnCancel$ = this.select((state) => state.isCallApiOnCancel);

  readonly searchApprove = this.effect((request$: Observable<RaListRequest>) => request$.pipe(
    tap(() => this.patchState({
      raSearchState: ApiState.LOADING
    })),
    switchMap((request) => this.service.searchApprove(request).pipe(
      tapResponse((response) => {
        this.patchState({
          raSearchResult: response.data,
          raSearchState: ApiState.SUCCESS
        });
      }, (err) => {
        console.error(err);
        this.patchState({raSearchState: ApiState.FAILED})
      })
    ))
  ));

  readonly searchRequest = this.effect((request$: Observable<RaListRequest>) => request$.pipe(
    tap(() => this.patchState({
      raSearchState: ApiState.LOADING
    })),
    switchMap((request) => this.service.searchRequest(request).pipe(
      tapResponse((response) => {
        this.patchState({
          raSearchResult: response.data,
          raSearchState: ApiState.SUCCESS
        });
      }, (err) => {
        console.error(err);
        this.patchState({raSearchState: ApiState.FAILED})
      })
    ))
  ));

  readonly detail = this.effect((request$: Observable<RaDetailRequest>) => request$.pipe(
    tap(() => this.patchState({raDetailState: ApiState.LOADING})),
    switchMap((request) => this.service.detail(request).pipe(
      tapResponse((response) => {
        this.patchState({
          raDetailState: ApiState.SUCCESS,
          raDetail: response.data
        })
      }, (err) => {
        console.error(err);
        this.patchState({raDetailState: ApiState.FAILED});
      })
    ))
  ));

  readonly changeDetailLoading = this.updater((state, value: ApiState) => ({...state, raDetailState: value}));

  readonly destroyDetailPage = this.effect((trigger$) => trigger$.pipe(
    tap(() => this.patchState({raDetail: undefined}))
  ));

  readonly beginExtend = this.effect((request$: Observable<RaInitExtendRequest>) => request$.pipe(
    tap(() => this.patchState({raDetailState: ApiState.LOADING})),
    switchMap((request) => this.service.requestExtend(request).pipe(
      tapResponse((response) => {
        const params: Params = {type: CONFIRM_TYPE.ONE};
        this.patchState({raDetailState: ApiState.SUCCESS});
        void this.router.navigate([CONFIRM_PATH.EXTEND, response.data.id], {queryParams: params});
      }, (err) => {
        console.error(err);
        this.patchState({raDetailState: ApiState.FAILED});
      })
    ))
  ));

  readonly loadDataConfirm = this.effect((route$: Observable<{
    queryParams: Params,
    params: Params,
    canCancel: boolean
  }>) => route$.pipe(
    filter(({queryParams, params}) => !!queryParams['type']),
    tap(() => this.patchState({raConfirmState: ApiState.LOADING})),
    withLatestFrom(this.batchExtendItems$),
    map(([config, batchItems]) => {
      let certificates: Certificate[] = [];
      if (config.queryParams['type'] === CONFIRM_TYPE.ONE) {
        if (config.canCancel) {
          this.patchState({isCallApiOnCancel: true});
        }
        certificates.push({id: config.params['id']});
      } else {
        batchItems.forEach((item) => {
          certificates.push({id: item.id});
        });
      }
      return {certificates, config};
    }),
    switchMap(({certificates, config}) => this.service.dataNeedConfirm({certificate: certificates}).pipe(
      map((response) => {
        if (Array.isArray(response.data.content)) {
          const raStatus: RaStatusEnum = config.queryParams['status'];
          response.data.content.forEach((item) => {
            let fileInfo: FileInfo | undefined;
            if (raStatus) {
              if (raStatus == RaStatusEnum.EXTEND_PENDING && item.extendInfo) {
                fileInfo = item.extendInfo;
              } else if (raStatus == RaStatusEnum.RENEW_PENDING && item.resumesInfo) {
                fileInfo = item.resumesInfo;
              } else if (raStatus == RaStatusEnum.PAUSE_PENDING && item.suspendedInfo) {
                fileInfo = item.suspendedInfo;
              } else if (raStatus == RaStatusEnum.EVICT_PENDING && item.revokeInfo) {
                fileInfo = item.revokeInfo;
              }
            }
            if (fileInfo) {
              item.fileItems = [{
                name: fileInfo.objectName,
                downloadUrl: fileInfo.url ? fileInfo.url : '',
                objectName: fileInfo.objectName,
                bucketName: fileInfo.bucketName,
                downloadTarget: '_blank',
                canView: false,
                canDownload: true,
                canRemove: false,
              }];
            } else {
              item.fileItems = [];
            }
          })
        }
        return response;
      }),
      tapResponse((response) => {
        this.patchState({
          raDataConfirm: response.data.content,
          raConfirmState: ApiState.SUCCESS
        });
      }, (err) => {
        console.error(err);
        this.patchState({raConfirmState: ApiState.FAILED, raDataConfirm: []});
      })
    ))
  ));

  readonly generateOtp = this.effect((request$: Observable<GenerateOtpForgotPassRequest>) => request$.pipe(
    tap(() => this.patchState({raConfirmState: ApiState.LOADING})),
    switchMap((request) => this.service.generateOtpForgotPass(request).pipe(
      withLatestFrom(this.amountRenewOtp$),
      tapResponse(([response, currentAmountRenew]) => {
        this.patchState({
          raConfirmState: ApiState.SUCCESS,
          generatedOtp: response.data,
          amountRenewOtp: currentAmountRenew - 1
        });
      }, (err) => {
        console.error(err);
        this.patchState({raConfirmState: ApiState.FAILED});
      })
    ))
  ));

  readonly cancelConfirm = this.effect((request$: Observable<CancelConfirmRequest>) => request$.pipe(
    withLatestFrom(this.isCallApiOnCancel$),
    tap(([request, isCallApi]) => {
      if (!isCallApi) {
        void this.router.navigate([`/${request.isBackToApprove ? RA_MANAGE_PATH.APPROVE : RA_MANAGE_PATH.REQUEST}`]);
      }
    }),
    filter(([_, isCallApi]) => isCallApi),
    tap(() => this.patchState({raConfirmState: ApiState.LOADING})),
    switchMap(([request, _]) => this.service.cancelConfirm({listId: request.listId}).pipe(
      tapResponse((response) => {
        this.patchState({
          raConfirmState: ApiState.SUCCESS
        });
        if (response.data) {
          void this.router.navigate([`/${request.isBackToApprove ? RA_MANAGE_PATH.APPROVE : RA_MANAGE_PATH.REQUEST}`]);
        }
      }, (err) => {
        console.error(err);
        void this.router.navigate([`/${request.isBackToApprove ? RA_MANAGE_PATH.APPROVE : RA_MANAGE_PATH.REQUEST}`]);
        this.patchState({raConfirmState: ApiState.FAILED});
      })
    ))
  ));

  readonly confirmExtend = this.effect((request$: Observable<ConfirmRequest>) => request$.pipe(
    withLatestFrom(this.generatedOtp$),
    tap(() => this.patchState({raConfirmState: ApiState.LOADING})),
    switchMap(([request, otpState]) => this.service.confirmExtend({
      ...request,
      step: otpState ? otpState.step : undefined
    }).pipe(
      tapResponse((response) => {
        this.patchState({
          raConfirmState: ApiState.SUCCESS
        });
        if (response.data) {
          this.messageService.add({
            severity: 'success',
            detail: 'Gia hạn chứng thư số thành công'
          });
          void this.router.navigate([`/${RA_MANAGE_PATH.REQUEST}`]);
        }
      }, (err) => {
        console.error(err);
        this.patchState({raConfirmState: ApiState.FAILED});
      })
    ))
  ));

  readonly confirmReject = this.effect((request$: Observable<ConfirmRequest>) => request$.pipe(
    withLatestFrom(this.generatedOtp$),
    tap(() => this.patchState({raConfirmState: ApiState.LOADING})),
    switchMap(([request, otpState]) => this.service.confirmReject({
      ...request,
      step: otpState ? otpState.step : undefined
    }).pipe(
      tapResponse((response) => {
        this.patchState({
          raConfirmState: ApiState.SUCCESS
        });
        if (response.data) {
          this.messageService.add({
            severity: 'success',
            detail: 'Từ chối chứng thư số thành công'
          });
          void this.router.navigate([`/${RA_MANAGE_PATH.APPROVE}`]);
        }
      }, (err) => {
        console.error(err);
        this.patchState({raConfirmState: ApiState.FAILED});
      })
    ))
  ));

  readonly confirmActive = this.effect((request$: Observable<ConfirmRequest>) => request$.pipe(
    withLatestFrom(this.generatedOtp$),
    tap(() => this.patchState({raConfirmState: ApiState.LOADING})),
    switchMap(([request, otpState]) => this.service.confirmActive({
      ...request,
      step: otpState ? otpState.step : undefined
    }).pipe(
      tapResponse((response) => {
        this.patchState({
          raConfirmState: ApiState.SUCCESS
        });
        if (response.data) {
          this.messageService.add({
            severity: 'success',
            detail: 'Kích hoạt chứng thư số thành công'
          });
          void this.router.navigate([`/${RA_MANAGE_PATH.REQUEST}`]);
        }
      }, (err) => {
        console.error(err);
        this.patchState({raConfirmState: ApiState.FAILED});
      })
    ))
  ));

  readonly confirmPause = this.effect((request$: Observable<ConfirmRequest>) => request$.pipe(
    withLatestFrom(this.generatedOtp$),
    tap(() => this.patchState({raConfirmState: ApiState.LOADING})),
    switchMap(([request, otpState]) => this.service.confirmPause({
      ...request,
      step: otpState ? otpState.step : undefined
    }).pipe(
      tapResponse((response) => {
        this.patchState({
          raConfirmState: ApiState.SUCCESS
        });
        if (response.data) {
          this.messageService.add({
            severity: 'success',
            detail: 'Tạm dừng chứng thư số thành công'
          });
          void this.router.navigate([`/${RA_MANAGE_PATH.REQUEST}`]);
        }
      }, (err) => {
        console.error(err);
        this.patchState({raConfirmState: ApiState.FAILED});
      })
    ))
  ));

  readonly confirmEvict = this.effect((request$: Observable<ConfirmRequest>) => request$.pipe(
    withLatestFrom(this.generatedOtp$),
    tap(() => this.patchState({raConfirmState: ApiState.LOADING})),
    switchMap(([request, otpState]) => this.service.confirmEvict({
      ...request,
      step: otpState ? otpState.step : undefined
    }).pipe(
      tapResponse((response) => {
        this.patchState({
          raConfirmState: ApiState.SUCCESS
        });
        if (response.data) {
          this.messageService.add({
            severity: 'success',
            detail: 'Thu hồi chứng thư số thành công'
          });
          void this.router.navigate([`/${RA_MANAGE_PATH.REQUEST}`]);
        }
      }, (err) => {
        console.error(err);
        this.patchState({raConfirmState: ApiState.FAILED});
      })
    ))
  ));

  readonly destroyConfirmInformation = this.effect((trigger$) => trigger$.pipe(
    tap(() => this.patchState({
      generatedOtp: undefined,
      batchExtendItems: [],
      amountRenewOtp: environment.amountRenewOtpMax,
      isCallApiOnCancel: false
    }))
  ));

  readonly loadReason = this.effect((trigger$) => trigger$.pipe(
    switchMap(() => this.service.reason().pipe(
      tapResponse((response) => {
        this.patchState({reasonConfirm: response.data});
      }, err => {
        console.error(err);
      })
    ))
  ));

  readonly beginReject = this.effect((detail$: Observable<RaDetail>) => detail$.pipe(
    tap((detail) => {
      const params: Params = {type: CONFIRM_TYPE.ONE, status: detail.status};
      void this.router.navigate([CONFIRM_PATH.REJECT, detail.id], {queryParams: params});
    }),
  ));

  readonly beginPause = this.effect((id$: Observable<string>) => id$.pipe(
    tap((id) => {
      const params: Params = {type: CONFIRM_TYPE.ONE};
      void this.router.navigate([CONFIRM_PATH.PAUSE, id], {queryParams: params});
    }),
  ));

  readonly beginEvict = this.effect((id$: Observable<string>) => id$.pipe(
    tap((id) => {
      const params: Params = {type: CONFIRM_TYPE.ONE};
      void this.router.navigate([CONFIRM_PATH.EVICT, id], {queryParams: params});
    }),
  ));

  readonly beginActive = this.effect((id$: Observable<string>) => id$.pipe(
    tap((id) => {
      const params: Params = {type: CONFIRM_TYPE.ONE};
      void this.router.navigate([CONFIRM_PATH.ACTIVE, id], {queryParams: params});
    }),
  ));

  readonly beginApprove = this.effect((request$: Observable<RaInitApproveRequest>) => request$.pipe(
    tap(() => this.patchState({raDetailState: ApiState.LOADING})),
    switchMap((request) => this.service.requestApprove(request).pipe(
      tapResponse((response) => {
        const params: Params = {type: CONFIRM_TYPE.ONE, status: request.status};
        this.patchState({raDetailState: ApiState.SUCCESS});
        void this.router.navigate([CONFIRM_PATH.APPROVE, response.data.id], {queryParams: params});
      }, (err) => {
        console.error(err);
        this.patchState({raDetailState: ApiState.FAILED});
      })
    ))
  ));

  readonly confirmApprove = this.effect((request$: Observable<ConfirmApproveRequest>) => request$.pipe(
    withLatestFrom(this.generatedOtp$),
    tap(() => this.patchState({raConfirmState: ApiState.LOADING})),
    switchMap(([request, otpState]) => this.service.confirmApprove({
      ...request, step: otpState ? otpState.step : undefined
    }).pipe(
      tapResponse((response) => {
        this.patchState({
          raConfirmState: ApiState.SUCCESS
        });
        if (response.data) {
          this.messageService.add({
            severity: 'success',
            detail: 'Duyệt chứng thư số thành công'
          });
          void this.router.navigate([`/${RA_MANAGE_PATH.APPROVE}`]);
        }
      }, (err) => {
        console.error(err);
        this.patchState({raConfirmState: ApiState.FAILED});
      })
    ))
  ));

  readonly download = this.effect((id$: Observable<string>) => id$.pipe(
    tap(() => this.patchState({raSearchState: ApiState.LOADING})),
    switchMap((id) => this.mediaService.downloadCert({id}).pipe(
      tapResponse((res) => {
        this.patchState({raSearchState: ApiState.SUCCESS});
        window.open(res.data, '_blank');
      }, err => {
        console.error(err);
        this.patchState({raSearchState: ApiState.FAILED});
      })
    ))
  ));

  readonly showMissingContract = this.effect((trigger$) => trigger$.pipe(
    tap(() => this.messageService.add({severity: 'error', detail: 'Vui lòng chọn thông tin hồ sơ'}))
  ));

  readonly beginConfirmByBatch = this.effect((request$: Observable<ConfirmByBatchRequest>) => request$.pipe(
    tap((request) => {
      const params: Params = {type: CONFIRM_TYPE.BATCH, status: request.status};
      this.patchState({batchExtendItems: request.data});
      void this.router.navigate([request.path, 'null'], {queryParams: params});
    })
  ));
}

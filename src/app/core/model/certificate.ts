import {ApiResponse} from './common';
import {Event} from '@angular/router';
import { FileInfo } from './media';
import { FileItem } from '../../shared/model/file-item';

export enum RaStatusEnum {
  ALL = -1,
  IN_ACTIVE = 0,
  ACTIVE = 1,
  EXPIRED = 2,
  EVICT = 3,
  PENDING = 4,
  PAUSE = 5,
  REJECT = 6,
  REGISTRY_PENDING = 7,
  REGISTRY_REJECT = 8,
  REGISTRY_EXPIRE = 9,
  PROVIDE_PENDING = 10,
  PROVIDE_REJECT = 11,
  PROVIDE_EXPIRE = 12,
  PAUSE_PENDING = 13,
  PAUSE_REJECT = 14,
  EXTEND_PENDING = 15,
  EXTEND_REJECT = 16,
  EXTEND_EXPIRE = 17,
  EXTEND_ABLE = 18,
  EXTENDED = 19,
  EVICT_PENDING = 20,
  EVICT_REJECT = 21,
  RENEW_PENDING = 22,
  RENEW_REJECT = 23,
  USER_CONFIRM_PENDING = 24
}

export interface RaInfo {
  id: string;
  serialNumber: string;
  subjectDn: string;
  cn: string;
  organization: string;
  organizationUnit: string;
  country: string;
  province: string;
  servicePackage: string;
  certificateType: string;
  dateRequest: string;
  validFrom: string;
  validTo: string;
  status: number;
  isSeen: boolean;
  action: number[];
}

export const DataSourceTypes = {
  DEFAULT: 'default',
  LDAP: 'ldap'
}

export interface DropdownCommon {
  id: string;
  code: string;
  name: string;
}

export interface ServicePackage extends DropdownCommon {}
export interface ServicePackageResponse extends ApiResponse {
  data: ServicePackage[];
}
export interface CertificateType extends DropdownCommon {}
export interface CertificateTypeResponse extends ApiResponse {
  data: CertificateType[];
}
export interface Agency {
  data: DropdownCommon;
  children: Agency[];
}
export interface AgencyComboboxResponse extends ApiResponse {
  data: Agency[];
}

export interface AgencyTree extends DropdownCommon {
  label: string;
  children?: AgencyTree[];
}

export interface RaListRequest {
  textSearch: string;
  status: number;
  dataSource: string;
  pageIndex?: number;
  pageSize?: number;
  validFromStart: string;
  validFromEnd: string;
  validToStart: string;
  validToEnd: string;
  dateRequestStart: string;
  dateRequestEnd: string;
  servicePackage: ServicePackage;
  certificateType: CertificateType;
  agency: DropdownCommon;
  ca: DropdownCommon;
}

export interface ReListResponse extends ApiResponse {
  data: RaInfo[];
}

export interface RaDetailRequest {
  id: string;
  responseFileType?: string;
}

export type TimeInit = 'days' | 'months' | 'years';

export const RA_PROFILE_TYPE = {
  ID: 'unique_identifier',
  FULL_NAME: 'common_name',
  COUNTRY: 'country',
  EMAIL_USER: 'email',
  EMAIL_ADMIN: 'email_admin',
  ORGANIZATION: 'organization_name',
  ORGANIZATION_UNIT: 'organization_units'
}


export const CERT_TYPE = {
  CERT_FOR_INDIVIDUAL: 1,
  CERT_FOR_INDIVIDUAL_OF_ORGANIZATION: 2,
}

export const SERVICE_PACKAGE_TYPE = {
  EXTERNAL_CUSTOMER: 0,
  INTERNAL_CUSTOMER: 1,
  HSM: 2,
}

export const DEVICE_TYPE = {
  USB: 0,
  HSM: 1
}

export const formTypes = {
  USER_ENTER: 1,
  STATIC: 2,
  UPLOAD_FILE : 3,
  FROM_CATALOG: 4,
  FROM_USER_PROFILE: 5
};

export interface RaCombobox {
  code: string;
  id: string;
  name: string;
}

export interface RaProfile {
  combobox: RaCombobox[];
  description: string;
  mandatory: boolean;
  nameField: string;
  valueText: string;
  valueType: number;
}

export interface RaArticle {
  id: string;
  bucketName: string;
  description: string;
  mandatory: string;
  nameField: string;
  objectName: string;
  valueText: string;
  valueType: string;
}

export interface GenKeyRequest{
  keyPreix: string,
  alias: string,
  subjectDN: string,
  keyLength: string,
  pinCode: string,
  responseDataFormat: string
}

export interface GenKeyResponse extends ApiResponse{
  code: number,
  message: string,
  transactionId: string,
  data: GenKeyInfo
}

export interface GenKeyInfo{
  alias: string,
  csr: string
}


export interface RaTime {
  id: string;
  timeDuration: number;
  timeUnit: TimeInit;
  name?: string;
}

export interface RaDetail {
  id: string;
  article: RaArticle[];
  profile: RaProfile[];
  listTimeProfile: RaTime[];
  timeProfile: RaTime;
  isSeen: boolean;
  status: number;
  reason?: ReasonConfirm;
  checkRevoke: string;
  checkRevokeMethod: string;
  checkValidTime: string;
  action: number[];
}

export interface RaDetailResponse extends ApiResponse {
  data: RaDetail
}

export interface RaStatus {
  status: number;
  description: string;
}

export interface RaStatusResponse extends ApiResponse {
  data: RaStatus[];
}

export interface RaInitExtendRequest {
  id: string;
  timeProfile?: RaTime;
  profile: RaProfile[];
  article: RaArticle[];
  commitment: boolean;
  description?: string;
}

export interface RaInitExtendResponse extends ApiResponse {
  data: { id: string }
}

export interface RaDataConfirmRequest {
  certificate: Certificate[];
}

export interface RaDataConfirm {
  id: string;
  servicePackageName: string;
  subjectDn: string;
  validFrom: Date;
  validTo: Date;
  extendInfo?: FileInfo;
  resumesInfo?: FileInfo;
  suspendedInfo?: FileInfo;
  rejectInfo?: FileInfo;
  revokeInfo?: FileInfo;
  fileItems?: FileItem[];
}

export interface RaDataConfirmResponse extends ApiResponse {
  data: {
    content: RaDataConfirm[];
  }
}

export interface CancelConfirmRequest {
  listId: {id: string}[];
  isBackToApprove?: boolean;
}

export interface ConfirmResultResponse extends ApiResponse {
  data: boolean;
}

export interface ArticleConfirmExtend {
  url: string;
  bucketName: string;
  objectName: string;
}

export interface Certificate {
  id: string;
  article?: ArticleConfirmExtend;
}

export interface ConfirmRequest {
  certificate: Certificate[];
  commitment: boolean;
  otp?: string;
  step?: number;
  reason?: ReasonConfirm;
}

export const CONFIRM_TYPE = {
  BATCH: 'batch',
  ONE: 'one'
}

export interface RaExtend {
  id: string;
  articleFiles?: FileList
}

export interface ReasonConfirm {
  id: string;
  code: string;
  name: string;
}

export interface ReasonConfirmResponse extends ApiResponse {
  data: ReasonConfirm[]
}

export interface ConfirmApproveRequest {
  certificate: Certificate[];
  commitment: boolean;
  otp?: string;
  step?: number;
  reason: string | ReasonConfirm;
}

export interface RaInitApproveRequest {
  id: string;
  timeProfile?: RaTime;
  profile: RaProfile[];
  article: RaArticle[];
  commitment: boolean;
  description?: string;
  status?: RaStatusEnum;
}

export interface RaInitApproveResponse extends ApiResponse {
  data: { id: string }
}

export interface RaTableRowSelect {
  data: RaInfo;
  index?: number;
  originalEvent: Event;
  type: string;
}

export interface RaSelectedChange extends RaTableRowSelect {
  action: 'select' | 'unSelect';
  selected: RaInfo[];
  pathType?: string;
}

export const CONFIRM_PATH = {
  EXTEND: 'extend',
  APPROVE: 'approve',
  REJECT: 'reject',
  ACTIVE: 'active',
  PAUSE: 'pause',
  EVICT: 'evict'
};

export const RA_MANAGE_PATH = {
  REQUEST: 'request',
  APPROVE: 'approve',
  DETAIL: 'detail',
  REGISTRY: 'registry'
};

export interface ConfirmByBatchRequest {
  data: RaInfo[];
  path: string;
  status: RaStatusEnum;
}

export const CheckCertificateOnline = {
  TIME_EXPIRED: 'EXPIRED',
  TIME_VALID: 'VALID',
  TIME_NOT_YET_VALID: 'NOT_YET_VALID',
  TIME_UNDEFINED: 'UNDEFINED',
  REVOKE_REVOKED: 'REVOKED',
  REVOKE_GOOD: 'GOOD',
  REVOKE_UNKNOWN: 'UNKNOWN',
  REVOKE_UNDEFINED: 'UNDEFINED',
}

export enum CertificateActionEnum {
  NONE,
  APPROVE,
  EXTEND,
  EVICT,
  PAUSE,
  RESUME,
  REJECT
}

export interface GenKeyHSMRequest{
  keyPrefix: string,
  alias: string,
  subjectDN: string,
  keyLength: string,
  pinCode: string,
  responseDataFormat: string
}

export interface GenKeyTokenRequest{
  subjectDN: string,
  nameToken: string
}

export interface GenKeyHSMResponse{
  code: number,
  message: string,
  transactionId: string,
  data: GenKeyInfo
}

export interface GenKeyTokenResponse{
  messageCode: number,
  message: string,
  data: string
}

export interface GenKeyInfo{
  alias: string,
  csr: string
}

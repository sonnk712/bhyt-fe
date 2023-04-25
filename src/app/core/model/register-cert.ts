import {ApiResponse} from "./common";
import {RaProfile, RaTime} from "./certificate";

export interface ServicePackage {
  id: string;
  code: string;
  name: string;
}

export interface ArticleServicePackageInfo{
  id: string;
  name: string;
}

export interface ServicePackageInfo {
  id: string;
  code: string;
  name: string;
  article: ArticleServicePackageInfo;
  device: string;
  agencyName: string;
  profileId: string;
  timeProfile: RaTime [];
}

export interface ServicePackageInfoRequest {
  id: string;

}

export interface ServicePackagesResponse extends ApiResponse{
  data: ServicePackage [];
}

export interface ServicePackageInfoResponse extends ApiResponse{
  data: ServicePackageInfo;
}

export interface CertInfoProfile {
  id: string;
  attributes: RaProfile [];
}

export interface CertInfoProfileRequest {
  servicePackageCode: string;
}

export interface CertInfoProfileResponse extends ApiResponse{
  data: CertInfoProfile;
}

export const typeArticleInfoFromUser = {
  FRONT_IDENTITY: 'CMND/ CCCD/ Hộ chiếu mặt trước',
  BACK_IDENTITY: 'CMND/ CCCD/ Hộ chiếu mặt sau'
}

export interface CertInfoArticle {
  id: string;
  nameField: string;
  valueType: number,
  valueText: string;
  description: string;
  required: boolean;
  mandatory: boolean;
  maxFileSize?: string;
  maxRequestSize?: string;
}

export interface CertInfoArticleRequest {
  servicePackageCode: string,
}

export interface CertInfoArticleResponse extends ApiResponse{
  data: CertInfoArticle [];
}

export interface CertificateArticle {
  id: string;
  bucketName: string;
  description: string;
  mandatory: boolean;
  nameField: string;
  objectName: string;
  valueText: string;
  valueType: number;
}

export interface ServicePackageRegisterCert {
  id: string;
  timeProfile: RaTime;
}

export interface CreateCertRequest {
  profile: RaProfile[];
  article: CertificateArticle[];
  description: string;
  commitment: boolean;
  servicePackage: ServicePackageRegisterCert;
  ca: CertCA;
}

export interface CreateCertResponse extends ApiResponse{
  data: any;
}

export interface DownloadCertRequest {
  id: string;
}

export interface DownloadCertResponse extends ApiResponse {
  data: string;
}
export interface CertCA {
  id: string;
  code: string;
  name: string;
}

export interface CertType {
  id: string;
  name: string;
}

export interface CertCaResponse extends ApiResponse {
  data: CertCA [];
}

export interface ServicePackagesRequest {
  code: string;
  type: number;
  certificateType: number;
  device: string;
}

export interface CreateCertRequest {
  profile: RaProfile[];
  article: CertificateArticle[];
  description: string;
  commitment: boolean;
  servicePackage: ServicePackageRegisterCert;
  ca: CertCA;
  keyInfor: KeyInfor;
}

export interface KeyInfor{
  alias: string,
  pinCode: string,
  csr: string,
  subjectDn: string,
  userEmail: string,
  adminEmail: string,
  certificateType: number
}

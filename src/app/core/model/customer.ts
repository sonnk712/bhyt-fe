import {ApiResponse} from "./common";
import {Country,  Provine} from "./place";
import {AccountInformation} from "./account";

export interface FileInfo {
  bucketName: string,
  fileName: string,
  objectName: string,
  url?: string
}

export interface FileUploadResponse extends ApiResponse{
  data: FileInfo
}

export interface RequestUpdateCusInfo {
  token: string,
  submittedOtp: string,
  id: string,
  identityNumber: string,
  name: string,
  birthday: string,
  gender: number,
  issuerBy: string,
  issuerDate: string,
  currentAddress: string,
  permanentAddress: string
  country: string
}

export interface CustomerUpdateResponse extends ApiResponse{
  data: AccountInformation
}

export interface ChangePasswordRequest {
  username: string;
  newPassword: string;
  oldPassword: string;
  confirmNewPassword: string;
}

export interface ChangePasswordResponse extends ApiResponse{
  data: boolean;
}

export interface SecuritySetting {
  id: string;
  authentication: boolean;
  authenticationMethod: string;
  username: string;
}

export interface SecuritySettingResponse extends ApiResponse{
  data: SecuritySetting
}

export interface UpdateSecurityRequest{
  id: string;
  authentication: boolean;
  authenticationMethod: string;
}

export interface UpdateSecurityResponse extends ApiResponse{
  data: boolean
}

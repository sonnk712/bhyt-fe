import {District, Province, Ward} from './place';

export interface AccountResponse {
  code: number,
  data: AccountInformation,
  message: string,
  transactionId: string
}

export interface AccountInformation {
  id?: string,
  identityNumber?: string,
  username?: string,
  password?: string,
  name?: string,
  email?: string,
  phoneNumber?: string,
  country?: string,
  gender?: number,
  status?: number,
  birthday?: Date,
  placeOfOrigin? : string,
  placeOfResidence: string,
  persionalIdentification: string,
  district: District,
  province: Province,
  ward: Ward,
  roles: Set<role>
}

export interface role {
  id: number;
  code: string,
}

export interface CurrentUserByEmailRequest {
  email: string;
}
export interface IdentityTypeResponse{
  code: number,
  message: string,
  transactionId: string,
  data: IdentityType
}

export interface IdentityType{
  identityType: string;
}
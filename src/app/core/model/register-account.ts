export interface RegisterAccountResponse {
  code: number,
  data: any,
  message: string,
  transactionId: string
}

export interface ValidateEmailRequest {
  email: string;
}

export interface ValidatePhoneRequest {
  phoneNumber: string;
}

export interface ValidateUserNameRequest {
  username: string;
}

export interface RegisterAccountRequest {
  confirmPassword: string;
  email: string;
  password: string;
  phoneNumber: string;
  username: string;
}

export interface ActiveAccountRequest {
  token: string;
}

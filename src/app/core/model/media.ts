import {ApiResponse} from './common';

export interface FileInfo {
  bucketName: string,
  fileName: string,
  objectName: string,
  url?: string
}

export interface FileUploadResponse extends ApiResponse {
  data: FileInfo
}

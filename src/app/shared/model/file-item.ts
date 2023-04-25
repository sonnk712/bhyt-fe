export interface FileItem {
  name: string;
  canView: boolean;
  canDownload: boolean;
  canRemove: boolean;
  downloadUrl: string;
  downloadTarget: '_blank' | '_self';
  objectName?: string;
  bucketName?: string;
  maxSize?: number
}

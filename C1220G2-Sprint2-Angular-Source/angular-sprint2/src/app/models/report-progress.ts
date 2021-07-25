export interface ReportProgress {
  id?: string;
  name: string;
  stage: number;
  fileReport: string;
  content: string;
  enable: boolean;
}

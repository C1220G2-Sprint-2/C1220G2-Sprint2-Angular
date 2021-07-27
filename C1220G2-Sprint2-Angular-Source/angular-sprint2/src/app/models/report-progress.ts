export interface ReportProgress {
  id?: number;
  name: string;
  stage: number;
  fileReport: string;
  content: string;
  dateCreate: string;
  // enable?: boolean;
}

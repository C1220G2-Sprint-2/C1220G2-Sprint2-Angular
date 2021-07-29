export interface ReportProgress {
  id?: number;
  name: string;
  stage: number;
  fileReport: string;
  content: string;
  dateCreate?: string;
  projectId?:any,
  // enable?: boolean;
  backgroundColor: string;
  userId?: any
}
